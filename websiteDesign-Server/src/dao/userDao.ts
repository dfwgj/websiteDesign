import { Inject, Provide } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { UserDTO, UpdateUserDTO } from '../dto/user';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { CachingFactory, MidwayCache } from "@midwayjs/cache-manager";
import { InjectClient } from "@midwayjs/core";
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
        user_id AS userId,
        is_admin AS role,
        is_deleted AS deleted
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

  //删除用户
  async delUser(userId: UserDTO['userId']) {
    const sql = `
    UPDATE
        user
      SET
        is_deleted = 1
      WHERE
        user_id = ?
    `;
    const sqlParams = [userId];
    return await query(sql, sqlParams);
  }
  //更新用户信息
  @InjectClient(CachingFactory, 'redis')
  cache1: MidwayCache; //redis缓存
  async updateUserInfo(updateUserDto: UpdateUserDTO) {
    const userId = this.ctx.state.user.userId;
    const setClause = [];
    const sqlParams = [];
    for (const [key, value] of Object.entries(updateUserDto)) {
      setClause.push(`${key} = ?`);
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
}