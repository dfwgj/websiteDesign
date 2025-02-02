import { Inject, Provide } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { ContestDTO, ContestDateDTO, ContestAwardsDTO, ContestDirectionDTO, ContestInfoDTO } from '../dto/contest';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { uuidv7 } from 'uuidv7';
import { pinyin } from 'pinyin-pro';
import { CachingFactory, MidwayCache } from "@midwayjs/cache-manager";
import { InjectClient } from "@midwayjs/core";
@Provide()
export class ContestDao {
    @Inject()
    ctx: Context;
    //查找是否有比赛
    async checkContest(field: string, value: string) {
        const sql = `
        SELECT COUNT(*) AS count FROM contest_information WHERE  ${field} = ?
        `;
        const sqlParams = [value];
        const result = await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
        return result[0].count;
    }
    //添加比赛信息
    async createContest(contestDto: ContestDTO) {
        const { name, topic, introduce, doubleKnots, organizers, contractors, year } = contestDto;
        const id = uuidv7();
        const userId = this.ctx.state.user.userId;
        const sql = `
        INSERT INTO contest_information (id, user_id, name,topic,introduce,double_knots,organizers,contractors,year,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,NOW())
        `;
        const sqlParams = [id, userId, name, topic, introduce, doubleKnots, organizers, contractors, year];
        await query(sql, sqlParams);
        return id;
    }
    //添加比赛时间
    async createContestDate(contestId: string, contestDateDto: ContestDateDTO) {
        const { spotDate, spotPlace, submissionDate, submissionPlace, preliminaryDate, preliminaryPlace, finalDate, finalPlace } = contestDateDto;
        const userId = this.ctx.state.user.userId;
        const sql = `
        REPLACE INTO
        contest_process(contest_id,user_id,spot_date,spot_place,submission_date,submission_place,preliminary_date,preliminary_place,final_date,final_place,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,NOW())
        `;
        const sqlParams = [contestId, userId, spotDate, spotPlace, submissionDate, submissionPlace, preliminaryDate, preliminaryPlace, finalDate, finalPlace];
        await query(sql, sqlParams);
        return true;
    }
    //添加比赛奖项
    async createContestAwards(contestId: string, contestAwardsDto: ContestAwardsDTO[]) {
        const userId = this.ctx.state.user.userId;
        const values = contestAwardsDto.map(dto => [
            uuidv7(),
            contestId,
            userId,
            dto.name,
            dto.prize,
            dto.amount,
            dto.model,
            new Date()
        ]);
        const valuesPlaceholders = values.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
        const sql = `
        INSERT INTO
        contest_awards(id,contest_id,user_id,name,prize,amount,model,created_at)
        VALUES ${valuesPlaceholders}
        `;
        const sqlParams = [].concat(...values);
        await query(sql, sqlParams);
        return true;
    }
    //添加比赛方向
    async createContestDirection(contestId: string, contestDirectionDto: ContestDirectionDTO[]) {
        const userId = this.ctx.state.user.userId;
        const values = contestDirectionDto.map(dto => [
            uuidv7(),
            contestId,
            userId,
            dto.name,
            dto.txt,
            new Date()
        ]);
        const valuesPlaceholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
        const sql = `
        INSERT INTO
        contest_direction(id,contest_id,user_id,name,txt,created_at)
        VALUES ${valuesPlaceholders}
        `;
        const sqlParams = [].concat(...values);
        await query(sql, sqlParams);
        let sort = 1;
        const values2 = contestDirectionDto.map(dto => {
            // 提取 name 字段的每个字的拼音首字母并大写
            const initials = dto.name
                .split('') // 将字符串分割成字符数组
                .map(char => {
                    // 提取每个字的拼音首字母并大写
                    const initial = pinyin(char, { pattern: 'first', toneType: 'none' });
                    return initial.toUpperCase();
                })
                .join(''); // 将首字母拼接成字符串
            return [
                'DIRECTION',
                initials,
                dto.name,
                sort++,
                userId,
                new Date()
            ];
        });
        const valuesPlaceholders2 = values2.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
        const sql2 = `
        REPLACE INTO
        sys_dict_item(dict_code,item_code,item_label,item_sort,user_id,created_at)
        VALUES ${valuesPlaceholders2}
        `;
        const sqlParams2 = [].concat(...values2);
        await query(sql2, sqlParams2);
        return true;
    }
    //用户获取比赛信息
    @Caching('redis', 'contestList')
    async getContest() {
        const sql = `
    SELECT id, name, topic, introduce, double_knots, qr_link AS qrLink, organizers, contractors, year, created_at
    FROM contest_information
    WHERE valid_flag = 1
    `;
        const sqlParams = [];
        const contests = await query(sql, sqlParams, false);
        // 为每个比赛补充 date、awards 和 direction 信息
        if (!contests) {
            return [];
        } else {
            const contestPromises = contests.map(async (contest) => {
                const contestId = contest.id;
                // 获取比赛时间
                const dateSql = `
        SELECT spot_date, spot_place, submission_date, submission_place, preliminary_date, preliminary_place, final_date, final_place
        FROM contest_process
        WHERE contest_id = ? AND valid_flag = 1
        `;
                const dateSqlParams = [contestId];
                const [dateData] = await query(dateSql, dateSqlParams, false);
                if (!dateData) {
                    contest.date = {};
                } else {
                    contest.date = {
                        spotDate: dateData.spot_date,
                        spotPlace: dateData.spot_place,
                        submissionDate: dateData.submission_date,
                        submissionPlace: dateData.submission_place,
                        preliminaryDate: dateData.preliminary_date,
                        preliminaryPlace: dateData.preliminary_place,
                        finalDate: dateData.final_date,
                        finalPlace: dateData.final_place
                    };
                }
                // 获取比赛奖项
                const awardsSql = `
        SELECT 
            c.id,
            c.name,
            c.prize,
            c.amount,
            c.model,
            m.item_label AS modelValue
        FROM 
            contest_awards c
        LEFT JOIN
        sys_dict_item m ON c.model = m.item_code AND m.dict_code = 'MODEL'
        WHERE 
            c.contest_id = ? AND c.valid_flag = 1
        `;
                const awardsSqlParams = [contestId];
                const awardsData = await query(awardsSql, awardsSqlParams, false);
                if (!awardsData) {
                    contest.awards = [];
                } else {
                    contest.awards = awardsData.map(award => ({
                        id: award.id,
                        name: award.name,
                        prize: award.prize,
                        amount: award.amount,
                        model: award.model,
                        modelValue: award.modelValue
                    }));
                }
                // 获取比赛方向
                const directionSql = `
        SELECT 
            id,
            name,
            txt,
            item_code AS directionCode      
        FROM 
            contest_direction
        LEFT JOIN
        sys_dict_item d ON name = d.item_label AND d.dict_code = 'DIRECTION'
        WHERE 
            contest_id = ? AND valid_flag = 1
        `;
                const directionSqlParams = [contestId];
                const directionData = await query(directionSql, directionSqlParams, false);
                if (!directionData) {
                    contest.direction = [];
                } else {
                    contest.direction = directionData.map(direction => ({
                        id: direction.id,
                        name: direction.name,
                        txt: direction.txt,
                        directionCode: direction.directionCode
                    }));
                }
                return contest;
            });
            // 等待所有比赛数据加载完成
            return await Promise.all(contestPromises);
        }
    }
    //管理员获取比赛列表
    async getAllContest() {
        const sql = `
        SELECT 
        id, 
        name, 
        valid_flag AS status, 
        created_at AS createdAt
        FROM contest_information
        `;
        const sqlParams = [];
        return await query(sql, sqlParams);
    }
    //管理员获取单一比赛信息
    async getContestInfo(id: string) {
        const sql = `
        SELECT id, name, topic, introduce, double_knots, qr_link AS qrLink, organizers, contractors, year, created_at
        FROM contest_information
        WHERE id = ?
        `;
        const sqlParams = [id];
        const contest = await query(sql, sqlParams, false);
        // 为每个比赛补充 date、awards 和 direction 信息
        if (!contest) {
            return [];
        } else {
            const contestPromises = contest.map(async (contest) => {
                const contestId = contest.id;
                // 获取比赛时间
                const dateSql = `
            SELECT spot_date, spot_place, submission_date, submission_place, preliminary_date, preliminary_place, final_date, final_place
            FROM contest_process
            WHERE contest_id = ? AND valid_flag = 1
            `;
                const dateSqlParams = [contestId];
                const [dateData] = await query(dateSql, dateSqlParams, false);
                if (!dateData) {
                    contest.date = {};
                } else {
                    contest.date = {
                        spotDate: dateData.spot_date,
                        spotPlace: dateData.spot_place,
                        submissionDate: dateData.submission_date,
                        submissionPlace: dateData.submission_place,
                        preliminaryDate: dateData.preliminary_date,
                        preliminaryPlace: dateData.preliminary_place,
                        finalDate: dateData.final_date,
                        finalPlace: dateData.final_place
                    };
                }
                // 获取比赛奖项
                const awardsSql = `
            SELECT 
                c.id,
                c.name,
                c.prize,
                c.amount,
                c.model,
                m.item_label AS modelValue
            FROM 
                contest_awards c
            LEFT JOIN
            sys_dict_item m ON c.model = m.item_code AND m.dict_code = 'MODEL'
            WHERE 
                c.contest_id = ? AND c.valid_flag = 1
            `;
                const awardsSqlParams = [contestId];
                const awardsData = await query(awardsSql, awardsSqlParams, false);
                if (!awardsData) {
                    contest.awards = [];
                } else {
                    contest.awards = awardsData.map(award => ({
                        id: award.id,
                        name: award.name,
                        prize: award.prize,
                        amount: award.amount,
                        model: award.model,
                        modelValue: award.modelValue
                    }));
                }
                // 获取比赛方向
                const directionSql = `
            SELECT 
                id,
                name,
                txt,
                item_code AS directionCode      
            FROM 
                contest_direction
            LEFT JOIN
            sys_dict_item d ON name = d.item_label AND d.dict_code = 'DIRECTION'
            WHERE 
                contest_id = ? AND valid_flag = 1
            `;
                const directionSqlParams = [contestId];
                const directionData = await query(directionSql, directionSqlParams, false);
                if (!directionData) {
                    contest.direction = [];
                } else {
                    contest.direction = directionData.map(direction => ({
                        id: direction.id,
                        name: direction.name,
                        txt: direction.txt,
                        directionCode: direction.directionCode
                    }));
                }
                return contest;
            });
            // 等待所有比赛数据加载完成
            return await Promise.all(contestPromises);
        }
    }
    //管理员启动该比赛
    @InjectClient(CachingFactory, 'redis')
    cache: MidwayCache; //redis缓存
    async startContest(id: string) {
        // 更新所有记录的 valid_flag 为 0
        const sql1 = `
        UPDATE contest_information SET valid_flag = 0
        `;
        await query(sql1, []);
        // 更新指定记录的 valid_flag 为 1
        const sql2 = `
        UPDATE contest_information SET valid_flag = 1 WHERE id = ?
        `;
        const sqlParams = [id];
        await query(sql2, sqlParams);
        await this.cache.del('contestList');
        return true;
    }
    //上传图片
    async uploadImg(url: string, id: string) {
        const sql = `
    UPDATE
        contest_information
    SET
        qr_link = ?
    WHERE
        id = ?
    `;
        const sqlParams = [url, id];
        await query(sql, sqlParams);
        return url;
    }
    //修改比赛主体信息
    async updateContestInfo(id: string, contestInfoDto: ContestInfoDTO) {
        const setClause = [];
        const sqlParams = [];
        for (const [key, value] of Object.entries(contestInfoDto)) {
            setClause.push(`${key} = ?`);
            sqlParams.push(value);
        }
        sqlParams.push(id);
        const sql = `
        UPDATE
        contest_information
        SET ${setClause.join(', ')}
        WHERE id = ?
        `;
        await query(sql, sqlParams);
        return true;
    }
    //修改比赛时间信息
    async updateContestDate(contestId: string, contestDateDto: ContestDateDTO) {
        const setClause = [];
        const sqlParams = [];
        for (const [key, value] of Object.entries(contestDateDto)) {
            const snakeKey = this.camelToSnake(key);
            setClause.push(`${snakeKey} = ?`);
            sqlParams.push(value);
        }
        sqlParams.push(contestId);
        const sql = `
        UPDATE
        contest_process
        SET ${setClause.join(', ')}
        WHERE contest_id = ?
        `;
        await query(sql, sqlParams);
        return true;
    }
    // 修改比赛奖项信息（支持部分字段更新）
    async updateContestAwards(contestId: string, contestAwardsDto: ContestAwardsDTO[]) {
        const allowedFields = ['name', 'prize', 'amount', 'model']; // 允许修改的字段白名单
        for (const dto of contestAwardsDto) {
            // 过滤有效字段
            const validUpdates = Object.entries(dto).filter(
                ([key, value]) => allowedFields.includes(key) && value !== undefined
            );
            // 检查是否有有效更新字段
            if (validUpdates.length === 0) {
                throw new Error(`奖项ID ${dto.id} 未提供有效修改字段`);
            }
            // 构建动态SET语句
            const setClause = validUpdates
                .map(([key]) => `${key} = ?`)
                .join(', ');
            // 提取参数值（按字段顺序）
            const params = validUpdates.map(([_, value]) => value);
            // 添加用户ID和WHERE条件参数
            params.push(dto.id, contestId);
            const sql = `
            UPDATE contest_awards
            SET 
                ${setClause}
            WHERE 
                id = ? 
                AND contest_id = ?
                AND valid_flag = 1`;
            await query(sql, params);
        }
        return true;
    }
    // 修改比赛方向描述信息（支持部分字段更新）
    async updateContestDirection(contestId: string, contestDirectionDto: ContestDirectionDTO[]) {
        const allowedFields = ['txt']; // 允许修改的字段白名单
        const updatePromises = [];
        for (const dto of contestDirectionDto) {
            // 过滤有效字段
            const validUpdates = Object.entries(dto).filter(
                ([key, value]) => allowedFields.includes(key) && value !== undefined
            );
            // 检查是否有有效更新字段
            if (validUpdates.length === 0) {
                throw new Error(`方向ID ${dto.id} 未提供有效修改字段`);
            }
            // 构建动态SET语句
            const setClause = validUpdates
                .map(([key]) => `${key} = ?`)
                .join(', ');
            // 提取参数值（按字段顺序）
            const params = validUpdates.map(([_, value]) => value);
            // 添加用户ID和WHERE条件参数
            params.push(dto.id, contestId);
            const sql = `
        UPDATE contest_direction
        SET 
            ${setClause}
        WHERE 
            id = ? 
            AND contest_id = ?
            AND valid_flag = 1`;
            updatePromises.push(query(sql, params));
        }
        // 等待所有更新操作完成
        await Promise.all(updatePromises);
        return true;
}
    // 工具函数：驼峰命名转下划线命名
    camelToSnake(str: string): string {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    }
} 