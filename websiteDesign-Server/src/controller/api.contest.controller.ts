import {
    Inject,
    Controller,
    UseGuard,
    Post,
    Body,
    Get,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ContestService } from '../service/api.contest.service';
import { ContestDTO } from '../dto/contest';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/contest')
export class ContestController {
    @Inject()
    ctx: Context;
    @Inject()
    contestService: ContestService;
    /**
      * @name createContest 报名比赛
      * @description POST /contest/createContest
      * @param {object}  contestDto- 比赛信息
      * @returns {boolean}  是否成功
      */
    @UseGuard(AuthGuard)
    @Post('/createContest')
    async createContest(@Body() contestDto: ContestDTO): Promise<object> {
      return await this.contestService.createContest(contestDto);
    }
    /**
      * @name getContestList 获取比赛列表
      * @description GET /contest/getContestList
      * @returns {object}  比赛列表
      */
    @Get('/getContestList')
    async getContestList(): Promise<object> {
      return await this.contestService.getContestList();
    }
}