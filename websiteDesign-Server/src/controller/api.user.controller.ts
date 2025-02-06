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
import { UpdateUserDTO, allUserDTO } from '../dto/user';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/user')
//使用@Controller 装饰器定义了一个控制器，路由前缀为 /api/user。这意味着所有与用户相关的请求都将以这个路径开头。
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  /**
   * @name getAllUser 管理员获取所有用户信息
   * @description GET /api/user/getAllUser
   * @returns {object} user - 用户信息
   */
  @UseGuard(AuthGuard)
  @Get('/getAllUser')
  async getAllUser(@Query() allUserDto: allUserDTO): Promise<object> {
    return await this.userService.getAllUser(allUserDto);
  }
  /**
   * @name updateUserInfo 修改用户信息
   * @description PUT /api/user/updateUserInfo
   * @param {UpdateUserDTO} updateUserDto - 用户信息
   * @returns {boolean}  - 更新成功
   */
  @Put('/updateUserInfo')
  async updateUserInfo(@Body() updateUserDto: UpdateUserDTO): Promise<boolean> {
    const filteredData = Object.entries(updateUserDto).reduce(
      (acc, [key, value]) => {
        if (value != null) {
          // 同时过滤掉 null 和 undefined
          acc[key] = value;
        }
        return acc;
      },
      {} as UpdateUserDTO
    );
    if (Object.keys(filteredData).length === 0) {
      throw new Error('更新数据为空');
    }
    const userId = this.ctx.state.user.userId;
    return await this.userService.updateUserInfo(userId, filteredData);
  }
  /**
   * @name getUserInfo 更新用户信息
   * @description get /api/user/getUserInfo
   * @returns {string} token - 用户凭证
   */
  @Get('/getUserInfo')
  async getUserInfo(): Promise<string> {
    return await this.userService.getUserInfo();
  }
  /**
   * @name   adminUpdateUserInfo 管理员修改用户信息
   * @description PUT /api/user/adminUpdateUserInfo
   * @param {UpdateUserDTO} updateUserDto - 用户信息
   * @returns {boolean}  - 更新成功
   */
  @UseGuard(AuthGuard)
  @Put('/adminUpdateUserInfo')
  async adminUpdateUserInfo(
    @Body() updateUserDto: UpdateUserDTO
  ): Promise<boolean> {
    if (!updateUserDto.userId) {
      throw new Error('不能为空用户');
    }
    const userId = updateUserDto.userId;
    const user = await this.userService.userDao.findAccount('user_id', userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    if (updateUserDto.remakePassword === true) {
      updateUserDto.password = '888888';
    }
    const filteredData = Object.entries(updateUserDto).reduce(
      (acc, [key, value]) => {
        if (value != null) {
          // 同时过滤掉 null 和 undefined
          acc[key] = value;
        }
        return acc;
      },
      {} as UpdateUserDTO
    );
    if (Object.keys(filteredData).length === 1) {
      throw new Error('更新数据为空');
    }
    return await this.userService.updateUserInfo(userId, filteredData);
  }
}
