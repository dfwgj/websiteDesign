import { Inject, Provide } from '@midwayjs/core';
import { query, transaction } from '../dbConnPool/mariadb'; // 引入查询函数
import { UserDTO, UpdateUserDTO, allUserDTO } from '../dto/user';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import { InjectClient } from '@midwayjs/core';
@Provide()
export class UserDao {
  @Inject()
  ctx: Context;
  //通过id查找用户
  @Caching('redis', ctx => {
    if (ctx.methodArgs.length > 0) {
      return `userId:${ctx.methodArgs[0]}`;
    }
    return null;
  })
  async findUserById(userId: UserDTO['userId']) {
    const sql = `
      SELECT
        u.user_id AS userId,
        u.student_id AS studentId,
        u.team_id AS teamId,
        u.is_admin AS role,
        u.password AS passwordHash,
        u.name,
        c.item_label AS college,
        u.grade,
        u.major,
        u.phone,
        u.email
    FROM
        user u
    LEFT JOIN
        sys_dict_item c ON u.college = c.item_code AND c.dict_code = 'COLLEGE'
    WHERE
        u.user_id = ?AND u.valid_flag = 1
    `;
    const sqlParams = [userId];
    return (await query(sql, sqlParams))[0];
  }

  //通过学号查找用户
  async findStudentIdById(studentId: UserDTO['studentId']) {
    const sql = `
      SELECT  
        COUNT(*) AS count
      FROM 
        user
      WHERE 
        student_id = ? 
    `;
    const sqlParams = [studentId];
    return await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
  }

  //通过账号邮箱密码查找用户
  async findAccount(field: string, value: string) {
    const sql = `
      SELECT
        COUNT(*) AS count
      FROM 
        user
      WHERE 
        ${field} = ?
    `;
    const sqlParams = [value];
    const result = await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
    return result[0].count;
  }

  //更新用户信息
  @InjectClient(CachingFactory, 'redis')
  cache1: MidwayCache; //redis缓存
  async updateUserInfo(
    userId: UserDTO['userId'],
    updateUserDto: UpdateUserDTO
  ) {
    const setClause = [];
    const sqlParams = [];
    for (const [key, value] of Object.entries(updateUserDto)) {
      if (key === 'userId' || key === 'remakePassword') {
        continue;
      }
      const snakeKey = this.camelToSnake(key);
      setClause.push(`${snakeKey} = ?`);
      sqlParams.push(value);
    }
    sqlParams.push(userId);
    const sql = `
    UPDATE
      user
    SET
      ${setClause.join(', ')}
      WHERE
      user_id = ?
  `;
    await query(sql, sqlParams);
    await this.cache1.del(`userId:${userId}`);
    return true;
  }
  //管理员获取所有用户信息
  async getAllUser(allUserDto: allUserDTO) {
    const { pageNum, pageSize, type } = allUserDto;
    return transaction(async conn => {
      const sql = `
      SELECT
        u.user_id AS userId,
        u.student_id AS studentId,
        u.name,
        c.item_label AS college,
        u.grade,
        u.major,
        u.phone,
        u.email,
        t.name AS teamName,
        u.captain_flag AS captainFlag,
        u.is_admin AS role,
        u.created_at AS createdAt,
        u.valid_flag AS validFlag
      FROM
        user u
      LEFT JOIN
        sys_dict_item c ON u.college = c.item_code AND c.dict_code = 'COLLEGE'
      LEFT JOIN
        team t ON u.team_id = t.id
      WHERE
        u.valid_flag = ?
      ORDER BY
        u.user_id
      LIMIT
        ?,?
    `;
      const sqlParams = [type, (pageNum - 1) * pageSize, pageSize];
      const list = await query(sql, sqlParams, false, conn);
      const totalCountSql = `
      SELECT
        COUNT(*) AS totalCount
      FROM
        user
      WHERE
        valid_flag = ?
    `;
      const totalCountParams = [type];
      const total = (await query(totalCountSql, totalCountParams, false, conn))[0]
        .totalCount;
      return {total,list };
    })}
  // 工具函数：驼峰命名转下划线命名
  camelToSnake(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }
}
