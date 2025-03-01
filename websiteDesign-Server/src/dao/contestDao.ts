import { Inject, Provide } from '@midwayjs/core';
import { query, transaction } from '../dbConnPool/mariadb'; // 引入查询函数
import {
  ContestDTO,
  ContestDateDTO,
  ContestAwardsDTO,
  ContestDirectionDTO,
  ContestInfoDTO,
} from '../dto/contest';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { uuidv7 } from 'uuidv7';
import { pinyin } from 'pinyin-pro';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import { InjectClient } from '@midwayjs/core';
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
    const {
      name,
      topic,
      introduce,
      doubleKnots,
      organizers,
      contractors,
      year,
    } = contestDto;
    const id = uuidv7();
    const userId = this.ctx.state.user.userId;
    const sql = `
        INSERT INTO contest_information (id, user_id, name,topic,introduce,double_knots,organizers,contractors,year,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,NOW())
        `;
    const sqlParams = [
      id,
      userId,
      name,
      topic,
      introduce,
      doubleKnots,
      organizers,
      contractors,
      year,
    ];
    await query(sql, sqlParams);
    return id;
  }
  //添加比赛时间
  async createContestDate(contestId: string, contestDateDto: ContestDateDTO[]) {
    const userId = this.ctx.state.user.userId;
    const values = contestDateDto.map(dto => [
      uuidv7(),
      contestId,
      userId,
      dto.name,
      dto.date,
      dto.place,
      dto.txt,
      new Date(),
    ]);
    const valuesPlaceholders = values
      .map(() => '(?,?, ?, ?, ?, ?, ?, ?)')
      .join(', ');
    const sql = `
        INSERT INTO
        contest_process(id,contest_id,user_id,name,date,place,txt,created_at)
        VALUES ${valuesPlaceholders}
        `;
    const sqlParams = [].concat(...values);
    await query(sql, sqlParams);
    return true;
  }
  //添加比赛奖项
  async createContestAwards(
    contestId: string,
    contestAwardsDto: ContestAwardsDTO[]
  ) {
    const userId = this.ctx.state.user.userId;
    const values = contestAwardsDto.map(dto => [
      uuidv7(),
      contestId,
      userId,
      dto.name,
      dto.prize,
      dto.amount,
      dto.quantity,
      dto.type,
      new Date(),
    ]);
    const valuesPlaceholders = values
      .map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .join(', ');
    const sql = `
        INSERT INTO
        contest_awards(id,contest_id,user_id,name,prize,amount,quantity,type,created_at)
        VALUES ${valuesPlaceholders}
        `;
    const sqlParams = [].concat(...values);
    await query(sql, sqlParams);
    return true;
  }
  //添加比赛方向
  async createContestDirection(
    contestId: string,
    contestDirectionDto: ContestDirectionDTO[]
  ) {
    const userId = this.ctx.state.user.userId;
    const values = contestDirectionDto.map(dto => [
      uuidv7(),
      contestId,
      userId,
      dto.name,
      dto.txt,
      new Date(),
    ]);
    const valuesPlaceholders = values
      .map(() => '(?, ?, ?, ?, ?, ?)')
      .join(', ');
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
      return ['DIRECTION', initials, dto.name, sort++, userId, new Date()];
    });
    const valuesPlaceholders2 = values2
      .map(() => '(?, ?, ?, ?, ?, ?)')
      .join(', ');
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
    return transaction(async conn => {
      const sql = `
    SELECT id, name, topic, introduce, double_knots AS doubleKnots,user_link AS userLink, qr_link AS qrLink, organizers, contractors, year, created_at AS createdAt
    FROM contest_information
    WHERE valid_flag = 1
    `;
      const sqlParams = [];
      const contests = await query(sql, sqlParams, false, conn);
      // 为每个比赛补充 date、awards 和 direction 信息
      if (!contests) {
        return [];
      } else {
        const contestPromises = contests.map(async contest => {
          const contestId = contest.id;
          // 获取比赛时间
          const dateSql = `
        SELECT 
            id,
            name,
            date,
            place,
            txt
        FROM 
            contest_process
        WHERE 
        contest_id = ? AND valid_flag = 1
        `;
          const dateSqlParams = [contestId];
          const dateData = await query(dateSql, dateSqlParams, false, conn);
          if (!dateData) {
            contest.date = [];
          } else {
            contest.date = dateData.map(dateData => ({
              id: dateData.id,
              name: dateData.name,
              date: dateData.date,
              place: dateData.place,
              txt: dateData.txt,
            }));
          }
          // 获取比赛组别
          const groupSql = `
          SELECT 
              item_code AS groupCode,
            item_label AS groupName,
              remark AS groupRemark
          FROM
          sys_dict_item
          WHERE
          dict_code = 'MODEL'
            `;
          const groupSqlParams = [];
          const groupData = await query(
            groupSql,
            groupSqlParams,
            false,
            conn
          );
          if (!groupData) {
            contest.direction = [];
          } else {
            contest.group = groupData.map(direction => ({
              groupCode: direction.groupCode,
              groupName: direction.groupName,
              groupRemark: direction.groupRemark,
            }));
          }
          // 获取比赛奖项
          const awardsSql = `
          SELECT
            id,
            name,
            prize,
            amount,
            type,
            quantity
          FROM
          contest_awards
          WHERE
          contest_id = ? AND valid_flag = 1
            `;
          const awardsSqlParams = [contestId];
          const awardsData = await query(
            awardsSql,
            awardsSqlParams,
            false,
            conn
          );
          if (!awardsData) {
            contest.awards = [];
          } else {
            contest.awards = awardsData.map(award => ({
              id: award.id,
              name: award.name,
              prize: award.prize,
              amount: award.amount,
              type: award.type,
              quantity: award.quantity
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
          const directionData = await query(
            directionSql,
            directionSqlParams,
            false,
            conn
          );
          if (!directionData) {
            contest.direction = [];
          } else {
            contest.direction = directionData.map(direction => ({
              id: direction.id,
              name: direction.name,
              txt: direction.txt,
              directionCode: direction.directionCode,
            }));
          }
          return contest;
        });
        // 等待所有比赛数据加载完成
        return await Promise.all(contestPromises);
      }
    });
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
    return transaction(async conn => {
      const sql = `
        SELECT id, name, topic, introduce, double_knots, qr_link AS qrLink, organizers, contractors, year, created_at
        FROM contest_information
        WHERE id = ?
            `;
      const sqlParams = [id];
      const contests = await query(sql, sqlParams, false, conn);
      // 为每个比赛补充 date、awards 和 direction 信息
      if (!contests) {
        return [];
      } else {
        const contestPromises = contests.map(async contest => {
          const contestId = contest.id;
          // 获取比赛时间
          const dateSql = `
      SELECT 
          id,
          name,
          date,
          place,
          txt
      FROM 
          contest_process
      WHERE 
      contest_id = ? AND valid_flag = 1
      `;
          const dateSqlParams = [contestId];
          const dateData = await query(dateSql, dateSqlParams, false, conn);
          if (!dateData) {
            contest.date = [];
          } else {
            contest.date = dateData.map(dateData => ({
              id: dateData.id,
              name: dateData.name,
              date: dateData.date,
              place: dateData.place,
              txt: dateData.txt,
            }));
          }
          // 获取比赛奖项
          const awardsSql = `
          SELECT
          id,
            name,
            prize,
            amount,
            type,
            quantity
          FROM
          contest_awards
          WHERE
          contest_id = ? AND c.valid_flag = 1
            `;
          const awardsSqlParams = [contestId];
          const awardsData = await query(awardsSql, awardsSqlParams, false, conn);
          if (!awardsData) {
            contest.awards = [];
          } else {
            contest.awards = awardsData.map(award => ({
              id: award.id,
              name: award.name,
              prize: award.prize,
              amount: award.amount,
              type: award.type,
              quantity: award.quantity
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
          const directionData = await query(
            directionSql,
            directionSqlParams,
            false,
            conn
          );
          if (!directionData) {
            contest.direction = [];
          } else {
            contest.direction = directionData.map(direction => ({
              id: direction.id,
              name: direction.name,
              txt: direction.txt,
              directionCode: direction.directionCode,
            }));
          }
          return contest;
        });
        // 等待所有比赛数据加载完成
        return await Promise.all(contestPromises);
      }
    });
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
  async updateContestDate(contestId: string, contestDateDto: ContestDateDTO[]) {
    const allowedFields = ['name', 'date', 'place', 'txt']; // 允许修改的字段白名单
    for (const dto of contestDateDto) {
      // 过滤有效字段
      const validUpdates = Object.entries(dto).filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined
      );
      // 检查是否有有效更新字段
      if (validUpdates.length === 0) {
        throw new Error(`时间ID ${dto.id} 未提供有效修改字段`);
      }
      // 构建动态SET语句
      const setClause = validUpdates.map(([key]) => `${key} = ?`).join(', ');
      // 提取参数值（按字段顺序）
      const params = validUpdates.map(([, value]) => value);
      // 添加用户ID和WHERE条件参数
      params.push(dto.id, contestId);
      const sql = `
            UPDATE contest_process
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

  // 修改比赛奖项信息（支持部分字段更新）
  async updateContestAwards(
    contestId: string,
    contestAwardsDto: ContestAwardsDTO[]
  ) {
    const allowedFields = ['name', 'prize', 'amount', 'quantity', 'type']; // 允许修改的字段白名单
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
      const setClause = validUpdates.map(([key]) => `${key} = ?`).join(', ');
      // 提取参数值（按字段顺序）
      const params = validUpdates.map(([, value]) => value);
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
  async updateContestDirection(
    contestId: string,
    contestDirectionDto: ContestDirectionDTO[]
  ) {
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
      const setClause = validUpdates.map(([key]) => `${key} = ?`).join(', ');
      // 提取参数值（按字段顺序）
      const params = validUpdates.map(([, value]) => value);
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
    await this.cache.del('contestList');
    return true;
  }
  // 工具函数：驼峰命名转下划线命名
  camelToSnake(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }
}
