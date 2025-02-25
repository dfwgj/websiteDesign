import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { BigIntService } from './bigInt.service';
import { StatisticsDTO } from '../dto/statistics';
import { StatisticsDao } from '../dao/statisticsDao';

@Provide()
export class StatisticsService {
  @Inject()
  ctx: Context;
  @Inject()
  statisticsDao: StatisticsDao;
  @Inject()
  bigIntService: BigIntService;
  //获取系统统计信息
  async getStatistics(statisticsDTO: StatisticsDTO) {
    const result = await this.statisticsDao.getStatistics(statisticsDTO);
    return this.bigIntService.bigInt(result);
  }
}
