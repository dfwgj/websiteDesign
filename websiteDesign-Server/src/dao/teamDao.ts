import { Inject, Provide } from '@midwayjs/core';
import { query, transaction } from '../dbConnPool/mariadb'; // 引入查询函数
import { TeamDTO, TeamUpdateDTO } from '../dto/team';
//import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { uuidv7 } from 'uuidv7';

@Provide()
export class TeamDao {
    @Inject()
    ctx: Context;
    //验证队伍是否存在
    async findTeam(teamId: string) {
        const sql = `
        SELECT
            COUNT(*) AS count
        FROM 
            team
        WHERE 
            id = ?;
        `;
        const sqlParams = [teamId];
        const result = await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
        return result[0].count;
    }
    //是否已经报名
    async isRegister(studentId: string) {
        const sql = `
    SELECT
        COUNT(*) AS count
    FROM 
        user
    WHERE 
        student_id = ? AND team_id IS null;
    `;
        const sqlParams = [studentId];
        const result = await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
        return result[0].count;
    }
    async registerTeam(name: TeamDTO['name'], model: TeamDTO['model'], direction: TeamDTO['direction'], players: TeamDTO['players']) {
        const id = uuidv7();
        const userId = this.ctx.state.user.userId;

        return transaction(async (conn) => {
                // 插入团队信息
                const sql = `
            INSERT INTO team (id, user_id, name, model, direction, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
            `;
                const sqlParams = [id, userId, name, model, direction];
                await query(sql, sqlParams, true, conn);
                // 更新用户团队信息
                const studentIds = players.map(player => player.studentId);
                const sql2 = `
            UPDATE user
            SET team_id = ?
            WHERE student_id IN (?)
            `;
                const sqlParams2 = [id, studentIds];
                await query(sql2, sqlParams2, true, conn);
                // 设置队长标志
                const sql3 = `
            UPDATE user
            SET captain_flag = ?
            WHERE user_id = ?
            `;
                const sqlParams3 = [1, userId];
                await query(sql3, sqlParams3, true, conn);
                // 更新每日统计数据
                const sql4 = `
                INSERT INTO daily_statistics (date, new_teams)
                VALUES (CURDATE(), 1)
                ON DUPLICATE KEY UPDATE new_teams = new_teams + 1;
            `;
                await query(sql4, [], true, conn);
                return true;
        });
    }
    //获取队伍信息
    async findTeamInfo(teamId: string) {
        const sql = `
        SELECT
            t.id,
            t.user_id,
            t.name AS teamName,
            m.item_label AS model,
            t.state_flag AS teamState,
            d.item_label AS direction
        FROM
            team t
        LEFT JOIN
            sys_dict_item m ON t.model = m.item_code AND m.dict_code = 'MODEL'
        LEFT JOIN
            sys_dict_item d ON t.direction = d.item_code AND d.dict_code = 'DIRECTION'
        WHERE
            t.id = ? AND t.valid_flag = 1
        `;
        const sqlParams = [teamId];
        const result = await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
        if (!result || result.length === 0) {
            return {
                teamName: null,
                teamState: null,
                model: null,
                direction: null,
                players: [],
            }; // 没有找到队伍
        }
        const team = result[0];
        const sql2 = `
        SELECT
            u.student_id,
            u.name,
            c.item_label AS college,
            u.captain_flag AS captain
        FROM
            user u
            LEFT JOIN
        sys_dict_item c ON u.college = c.item_code AND c.dict_code = 'COLLEGE'
        WHERE
            u.team_id = ? AND u.valid_flag = 1
        `;
        const sqlParams2 = [teamId];
        const players = await query(sql2, sqlParams2);
        team.players = players;
        return team;
    }
    //管理员获取队伍信息
    async getTeam() {
        const sql = `
        SELECT
            t.id,
            u.name AS userName,
            t.name AS teamName,
            m.item_label AS model,
            d.item_label AS direction,
            t.state_flag AS teamState,
            t.valid_flag AS teamVaild,
            t.created_at AS teamCreated
        FROM
            team t
        LEFT JOIN
            sys_dict_item m ON t.model = m.item_code AND m.dict_code = 'MODEL'
        LEFT JOIN
            sys_dict_item d ON t.direction = d.item_code AND d.dict_code = 'DIRECTION'
        LEFT JOIN
        user u ON t.user_id = u.user_id
        `;
        const result = await query(sql, [], false);
        return result;
    }
    //管理员获取队伍成员信息
    async getTeamPlayers(teamId: string) {
        const sql = `
        SELECT
            u.user_id,
            u.student_id,
            u.name,
            c.item_label AS college,
            u.valid_flag AS userVaild,
            u.captain_flag AS captain
        FROM
            user u
        LEFT JOIN
        sys_dict_item c ON u.college = c.item_code AND c.dict_code = 'COLLEGE'
        WHERE
            u.team_id = ? 
        `;
        const sqlParams = [teamId];
        return await query(sql, sqlParams);
    }
    //管理员更新队伍信息
    async updateTeamInfo(teamUpdateDTO: TeamUpdateDTO) {
        const teamId = teamUpdateDTO.teamId;
        const setClause = [];
        const sqlParams = [];
        for (const [key, value] of Object.entries(teamUpdateDTO)) {
            if (key === 'teamId') {
                continue;
            }
            const snakeKey = this.camelToSnake(key);
            setClause.push(`${snakeKey} = ?`);
            sqlParams.push(value);
        }
        sqlParams.push(teamId);
        const sql = `
        UPDATE team
        SET ${setClause.join(', ')}
        WHERE id = ?
        `;
        await query(sql, sqlParams);
        return true;
    }
    //管理员删除队伍信息
    async delTeam(teamId: string) {
        const sql = `
        UPDATE team
        LEFT JOIN user ON team.id = user.team_id
        SET 
            team.valid_flag = 0,
            user.team_id = NULL,
            user.captain_flag = 0
        WHERE 
            team.id = ? AND team.valid_flag = 1
        `;
        const sqlParams = [teamId];
        await query(sql, sqlParams);
        return true;
    }
    // 工具函数：驼峰命名转下划线命名
    camelToSnake(str: string): string {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    }
}