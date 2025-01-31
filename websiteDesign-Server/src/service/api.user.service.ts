import { Provide, Inject } from '@midwayjs/core';
import { UserDao } from '../dao/userDao';
import { UserDTO } from '../dto/user';
import { BigIntService } from './bigInt.service';
import { GetFileExtension } from './originelFileName.service'
import { OSSService } from '@midwayjs/oss';
@Provide()
export class UserService {
  @Inject()
  userDao: UserDao;
  @Inject()
  bigIntService: BigIntService;
  @Inject()
  getFileExtension: GetFileExtension;
  @Inject()
  ossService: OSSService;
  // 通过用户 ID 查找用户
  async findUserById(userId: UserDTO['userId']) {
    // 从数据库中查询用户信息
    const user = await this.userDao.findUserById(userId);
    return user;
  }
  // 通过学生 ID 查找用户
  async findStudentIdById(studentId: UserDTO['studentId']) {
    // 从数据库中查询用户信息
    const user = await this.userDao.findStudentIdById(studentId);
    return user;
  }
  // 通过账号邮箱密码查找用户
  async findAccount(field: string, value: string) {
    // 从数据库中查询用户信息
    const user = await this.userDao.findAccount(field, value);
    return user;
  }
  // 删除用户
  async deleteUser(userId: UserDTO['userId']) {
    // 从数据库中删除用户信息
    const result = await this.userDao.delUser(userId);
    return result;
  }
}