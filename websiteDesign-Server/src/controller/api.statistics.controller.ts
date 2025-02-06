import { Inject, Controller, UseGuard, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { StatisticsService } from '../service/api.statistics.service';
import { StatisticsDTO } from '../dto/statistics';
import { AuthGuard } from '../guard/auth.guard';
@Controller('/statistics')
export class StatisticsController {
  @Inject()
  ctx: Context;
  @Inject()
  statisticsService: StatisticsService;
  /**
   * @name getStatistics
   * @description 获取统计数据
   * @param {StatisticsDTO} statisticsDTO 统计DTO
   * @returns {object} 返回统计数据
   */

  @Get('/getStatistics')
  @UseGuard(AuthGuard)
  async getStatistics(@Query() statisticsDTO: StatisticsDTO) {
    return await this.statisticsService.getStatistics(statisticsDTO);
  }
}
