import {
  Inject,
  Controller,
  Post,
  Body,
  UseGuard,
  Get,
  Put,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CourseService } from '../service/api.course.service';
import { CourseDTO, UpdateCourseDTO } from '../dto/course';
import { AuthGuard } from '../guard/auth.guard';
@Controller('/course')
export class CourseController {
  @Inject()
  ctx: Context;
  @Inject()
  courseService: CourseService;
  /**
   * @name createCourse 管理员新增课程
   * @description POST /course/creatCourse
   * @param {CourseDTO} courseDTO - 课程信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Post('/createCourse')
  async createCourse(@Body() courseDTO: CourseDTO): Promise<boolean> {
    return await this.courseService.createCourse(courseDTO);
  }
  /**
   * @name updateCourse 管理员更改课程信息
   * @description PUT /course/updateCourse
   * @param {UpdateCourseDTO} updateCourseDTO - 课程信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Put('/updateCourse')
  async updateCourse(
    @Body() updateCourseDTO: UpdateCourseDTO
  ): Promise<boolean> {
    const filteredData = Object.entries(updateCourseDTO).reduce(
      (acc, [key, value]) => {
        if (value != null) {
          // 同时过滤掉 null 和 undefined
          acc[key] = value;
        }
        return acc;
      },
      {} as UpdateCourseDTO
    );
    if (
      Object.keys(filteredData).length === 0 ||
      Object.keys(filteredData).length === 1
    ) {
      throw new Error('更新数据为空');
    }
    const result = await this.courseService.findCourse(
      updateCourseDTO.courseId
    );
    if (!result) {
      throw new Error('课程不存在');
    }
    return await this.courseService.updateCourse(filteredData);
  }
  /**
   * @name getAllCourseList 管理员获取所有课程列表
   * @description GET /course/getAllCourseList
   * returns {object}  课程列表
   */
  @UseGuard(AuthGuard)
  @Get('/getAllCourseList')
  async getAllCourseList(): Promise<object> {
    return await this.courseService.getCourseList();
  }
  /**
   * @name getCourse 用户获取课程信息
   * @description GET /course/getCourse
   * * returns {object}  课程列表
   */
  @Get('/getCourse')
  async getCourse(): Promise<object> {
    return await this.courseService.getCourse();
  }
}
