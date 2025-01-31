import { Inject, Provide } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { ContestDTO, ContestDateDTO, ContestAwardsDTO, ContestDirectionDTO } from '../dto/contest';
//import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { uuidv7 } from 'uuidv7';
import {pinyin} from 'pinyin-pro';
@Provide()
export class ContestDao {
    @Inject()
    ctx: Context;

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
}