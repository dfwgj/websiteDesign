import {
  Inject,
  Controller,
  Post,
  Body,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthService } from '../service/api.auth.service';
import { UserService } from '../service/api.user.service';
import { UserDTO, LoginDTO } from '../dto/user';

@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  authService: AuthService;

  @Inject()
  userService: UserService;
  /**
   * @name register 用户注册
   * @description POST /api/user/register
   * @param {string} password - 密码
   * @returns {object} user - 用户信息
   * */
  @Post('/register')
  async register(@Body() userDto: UserDTO): Promise<object> {
    //是否存在该用户
    const { name, studentId, college, grade, major, phone, email, password } =
      userDto;
    const userStudentId = await this.userService.findAccount(
      'student_id',
      studentId
    );
    if (userStudentId) {
      throw new Error('该学号已经注册');
    }
    const userEmail = await this.userService.findAccount('email', email);
    if (userEmail) {
      throw new Error('该邮箱已经注册');
    }
    const userPhone = await this.userService.findAccount('phone', phone);
    if (userPhone) {
      throw new Error('该手机号已经注册');
    }
    const result = await this.authService.register(
      name,
      studentId,
      college,
      grade,
      major,
      phone,
      email,
      password
    );
    return result;
  }
  /**
   * @name login 用户登录
   * @description POST /auth/login
   * @param {string} account - 用户账号
   * @param {string} body - 用户密码
   * @returns {Object} token - 登录凭证
   */
  @Post('/login')
  async login(@Body() LoginDto: LoginDTO): Promise<string> {
    const { studentId, password } = LoginDto;
    return await this.authService.login(studentId, password);
  }
}
