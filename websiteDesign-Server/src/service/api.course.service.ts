import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CourseDTO, UpdateCourseDTO } from '../dto/course';
import { CourseDao } from '../dao/courseDao';
@Provide()
export class CourseService {
  @Inject()
  courseDao: CourseDao;
  @Inject()
  ctx: Context;
  //验证课程是否存在
  async findCourse(courseId: string) {
    return await this.courseDao.findCourse(courseId);
  }
  //管理员新增课程
  async createCourse(courseDTO: CourseDTO) {
    return await this.courseDao.createCourse(courseDTO);
  }
  //管理员更新课程
  async updateCourse(updateCourseDTO: UpdateCourseDTO) {
    return await this.courseDao.updateCourse(updateCourseDTO);
  }
  //管理员获取课程列表
  async getCourseList() {
    return await this.courseDao.getCourseList();
  }
  //用户获取课程信息
  async getCourse() {
    return await this.courseDao.getCourse();
  }
}
