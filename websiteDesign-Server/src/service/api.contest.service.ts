import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ContestDTO } from '../dto/contest';
import { ContestDao } from '../dao/contestDao';
@Provide()
export class ContestService {
    @Inject()
    ctx: Context;
    @Inject()
    contestDao: ContestDao;
    //添加比赛信息
    async createContest(contestDto: ContestDTO) {
        const id = await this.contestDao.createContest(contestDto);
        const data = {
            createContest:'',
            createContestDate:'',
            createContestAwards:'',
            createContestDirection:''
        }
        if (id) {
            data.createContest = '创建比赛成功';
            if (contestDto.date) {
                const date = await this.contestDao.createContestDate(id, contestDto.date);
                if (date) {
                    data.createContestDate = '创建比赛流程成功';
                } else {
                    data.createContestDate = '创建比赛流程失败';
                }
            };
            if (contestDto.awards) {
                const awards = await this.contestDao.createContestAwards(id, contestDto.awards);
                if (awards) {
                    data.createContestAwards = '创建比赛奖项成功';
                } else {
                    data.createContestAwards = '创建比赛奖项失败';
                }
            };
            if (contestDto.direction) {
                const direction = await this.contestDao.createContestDirection(id, contestDto.direction);
                if (direction) {
                    data.createContestDirection = '创建比赛方向成功';
                } else {
                    data.createContestDirection = '创建比赛方向失败';
                }
            };
            return data;
        } else {
            data.createContest = '创建比赛失败';
            return data;
        }
    }
}