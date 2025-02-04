import {
  Inject,
  Controller,
  Get,
  Query,
  UseGuard,
  Put,
  Body,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/api.user.service';
import { UserDTO,UpdateUserDTO } from '../dto/user';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/user')
//使用@Controller 装饰器定义了一个控制器，路由前缀为 /api/user。这意味着所有与用户相关的请求都将以这个路径开头。
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  /**
   * @name getUser 获取用户信息
   * @description GET /api/user/getUser?userId=xxx
   * @param {string} studentId - 学生ID
   * @returns {object} user - 用户信息
   */
  @UseGuard(AuthGuard)
  @Get('/getUser')
  async getUser(@Query('studentId') studentId: UserDTO['studentId']): Promise<object> {
    // 检查 uid 是否存在
    return await this.userService.findStudentIdById(studentId);
  }
  /**
   * @name updateUserInfo 更新用户信息
   * PUT /api/user/updateUserInfo
   * @param {UpdateUserDTO} updateUserDto - 用户信息
   * @returns {boolean}  - 更新成功
   */
  @Put('/updateUserInfo')
  async updateUserInfo(@Body() updateUserDto: UpdateUserDTO): Promise<boolean> {
    const filteredData = Object.entries(updateUserDto).reduce((acc, [key, value]) => {
      if (value != null) { // 同时过滤掉 null 和 undefined
        acc[key] = value;
      }
      return acc;
    }, {} as UpdateUserDTO);
    if (Object.keys(filteredData).length === 0) {
      throw new Error('更新数据为空');
    }
    return await this.userService.updateUserInfo(filteredData);
  }
    /**
   * @name getUserInfo 获取用户信息
   * @description get /api/user/getUserInfo
   * @returns {string} token - 用户凭证
   */
    @Get('/getUserInfo')
    async getUserInfo(): Promise<string> {
      return await this.userService.getUserInfo();
    }
}