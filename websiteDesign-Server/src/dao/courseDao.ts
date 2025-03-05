import { Inject, Provide } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { CourseDTO, UpdateCourseDTO } from '../dto/course';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { uuidv7 } from 'uuidv7';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import { InjectClient } from '@midwayjs/core';
@Provide()
export class CourseDao {
  @Inject()
  ctx: Context;
  //验证课程是否存在
  async findCourse(courseId: string) {
    const sql = `
        SELECT
            COUNT(*) AS count
        FROM 
            course
        WHERE
            id = ?
        `;
    const sqlParams = [courseId];
    const result = await query(sql, sqlParams);
    return result[0].count;
  }
  @InjectClient(CachingFactory, 'redis')
  cache: MidwayCache; //redis缓存
  //管理员新增课程
  async createCourse(courseDTO: CourseDTO) {
    const courseId = uuidv7();
    const userId = this.ctx.state.user.userId;
    const sql = `
        INSERT INTO 
        course (id, user_id, name, link, description, type, created_at )
        VALUES (?,?,?,?,?,?,NOW())`;
    const sqlParams = [
      courseId,
      userId,
      courseDTO.name,
      courseDTO.link,
      courseDTO.description,
      courseDTO.type,
    ];
    await query(sql, sqlParams);
    await this.cache.del('courseList');
    return true;
  }
  //管理员更新课程
  async updateCourse(updateCourseDTO: UpdateCourseDTO) {
    const courseId = updateCourseDTO.courseId;
    const setClause = [];
    const sqlParams = [];
    for (const [key, value] of Object.entries(updateCourseDTO)) {
      if (key === 'courseId') {
        continue;
      }
      const snakeKey = this.camelToSnake(key);
      setClause.push(`${snakeKey} = ?`);
      sqlParams.push(value);
    }
    sqlParams.push(courseId);
    const sql = `
        UPDATE course
        SET ${setClause.join(', ')}
        WHERE id = ?
        `;
    await query(sql, sqlParams);
    await this.cache.del('courseList');
    return true;
  }
  //管理员获取课程列表
  async getCourseList() {
    const sql = `
        SELECT
        course.id,
        user.name AS userName,
        course.name AS courseName, 
        course.link,
        course.description,
        t.item_label AS type,
        course.created_at AS createdAt,
        course.valid_flag AS validFlag
    FROM
        course
    LEFT JOIN
        user ON course.user_id = user.user_id
    LEFT JOIN
        sys_dict_item t ON course.type = t.item_code AND t.dict_code = 'TYPE'
        ORDER BY
        course.id DESC
        `;
    const sqlParams = [];
    return await query(sql, sqlParams);
  }
  @Caching('redis', 'courseList')
  //用户获取课程信息
  async getCourse() {
    const sql = `
    SELECT
        course.id AS courseId,
        user.name AS userName,
        course.name AS courseName, 
        course.link,
        course.description,
        t.item_label AS type,
        course.created_at AS createdAt
        FROM
        course
    LEFT JOIN
        user ON course.user_id = user.user_id
    LEFT JOIN
        sys_dict_item t ON course.type = t.item_code AND t.dict_code = 'TYPE'
    WHERE
        course.valid_flag = 1
        `;
    const sqlParams = [];
    return await query(sql, sqlParams);
  }
  // 工具函数：驼峰命名转下划线命名
  camelToSnake(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }
}
