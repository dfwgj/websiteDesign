import { Provide, Inject, Config } from '@midwayjs/core';
import { UserDao } from '../dao/userDao';
import { UserDTO, UpdateUserDTO, allUserDTO } from '../dto/user';
import { BigIntService } from './bigInt.service';
import { GetFileExtension } from './originelFileName.service';
import { OSSService } from '@midwayjs/oss';
import * as bcrypt from 'bcryptjs';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { TeamDao } from '../dao/teamDao';
@Provide()
export class UserService {
  @Inject()
  userDao: UserDao;
  @Inject()
  bigIntService: BigIntService;
  @Inject()
  jwtService: JwtService;
  @Inject()
  getFileExtension: GetFileExtension;
  @Inject()
  ossService: OSSService;
  @Inject()
  teamDao: TeamDao;
  @Inject()
  ctx: Context;
  @Config('jwtConfig') // 动态注入配置
  jwtConfig: { secret: string; expiresIn: string | number };
  // 通过用户 ID 查找用户
  async findUserById(userId: UserDTO['userId']) {
    // 从数据库中查询用户信息
    return await this.userDao.findUserById(userId);
  }
  // 通过学生 ID 查找用户
  async findStudentIdById(studentId: UserDTO['studentId']) {
    // 从数据库中查询用户信息
    return await this.userDao.findStudentIdById(studentId);
  }
  //修改用户信息
  async updateUserInfo(
    userId: UserDTO['userId'],
    updateUserDto: UpdateUserDTO
  ) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return await this.userDao.updateUserInfo(userId, updateUserDto);
  }
  // 通过账号邮箱密码查找用户
  async findAccount(field: string, value: string) {
    // 从数据库中查询用户信息
    return await this.userDao.findAccount(field, value);
  }
  //获取用户信息
  async getUserInfo() {
    const user = await this.userDao.findUserById(this.ctx.state.user.userId);
    if (!user || user.length === 0) {
      // 用户不存在
      throw new Error('账户不存在或者账号被封禁');
    }
    const team = await this.teamDao.findTeamInfo(user.teamId);
    return await this.jwtService.sign(
      {
        userId: user.userId,
        studentId: user.studentId,
        name: user.name,
        college: user.college,
        grade: user.grade,
        major: user.major,
        phone: user.phone,
        email: user.email,
        userRole: user.role,
        team: {
          teamId: team.teamId,
          teamName: team.teamName,
          teamState: team.teamState,
          model: team.model,
          direction: team.direction,
          players: team.players,
        },
      },
      this.jwtConfig.secret,
      {
        expiresIn: this.jwtConfig.expiresIn,
      }
    );
  }
  //管理员获取所有用户信息
  async getAllUser(allUserDto: allUserDTO) {
    return await this.userDao.getAllUser(allUserDto);
  }
}
