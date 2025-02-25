import { Inject, Provide } from '@midwayjs/core';
import { query, transaction } from '../dbConnPool/mariadb'; // 引入查询函数
//import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { StatisticsDTO } from '../dto/statistics';
@Provide()
export class StatisticsDao {
  @Inject()
  ctx: Context;
  //创建统计数据
  async createStatistics() {
    const sql = `
        INSERT INTO daily_statistics (date,page_views)
        VALUES (CURDATE(), 1)
        ON DUPLICATE KEY UPDATE page_views = page_views + 1;
        `;
    await query(sql, []);
  }
  // 获取统计数据
  async getStatistics(statisticsDTO: StatisticsDTO) {
    const { startDate, endDate } = statisticsDTO;
    return transaction(async conn => {
      const sql = `
        SELECT 
            date,
            new_users AS newUsers,
            new_teams AS newTeams,
            page_views AS pageViews
        FROM daily_statistics
        WHERE date >= ? AND date <= ?
    `;
      const result = await query(sql, [startDate, endDate], false, conn);
      const sql2 = `
        SELECT COUNT(*) FROM user WHERE valid_flag = 1;
        `;
      const totalUsers = await query(sql2, [], false, conn);
      const sql3 = `
        SELECT COUNT(*) FROM team WHERE valid_flag = 1;
        `;
      const totalTeams = await query(sql3, [], false, conn);
      const sql4 = `
        SELECT SUM(page_views) AS totalPageViews FROM daily_statistics;
        `;
      const totalPageViews = await query(sql4, [], false, conn);

      return {
        data: result,
        totals: {
          totalUsers: totalUsers[0]['COUNT(*)'],
          totalTeams: totalTeams[0]['COUNT(*)'],
          totalPageViews: totalPageViews[0]['totalPageViews'],
        },
      };
    });
  }
}
