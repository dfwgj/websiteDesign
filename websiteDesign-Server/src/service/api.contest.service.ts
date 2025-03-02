import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ContestDTO, ContestDateDTO, ContestGroupDTO, ContestAwardsDTO, ContestDirectionDTO, ContestInfoDTO } from '../dto/contest';
import { ContestDao } from '../dao/contestDao';
import { StatisticsDao } from '../dao/statisticsDao';
import { UploadFileInfo } from '@midwayjs/busboy';
import { GetFileExtension } from './originelFileName.service';
import { OSSService } from '@midwayjs/oss';
import { uuidv7 } from 'uuidv7';
import { join } from 'path';
@Provide()
export class ContestService {
  @Inject()
  ctx: Context;
  @Inject()
  contestDao: ContestDao;
  @Inject()
  statisticsDao: StatisticsDao;
  @Inject()
  getFileExtension: GetFileExtension;
  @Inject()
  ossService: OSSService;
  //查找是否有该比赛
  async checkContest(field: string, value: string) {
    return await this.contestDao.checkContest(field, value);
  }
  //添加比赛信息
  async createContest(contestDto: ContestDTO) {
    const id = await this.contestDao.createContest(contestDto);
    const data = {
      createContest: '',
      createContestDate: '',
      createContestAwards: '',
      createContestDirection: '',
    };
    if (id) {
      data.createContest = '创建比赛成功';
      if (contestDto.date) {
        const date = await this.contestDao.createContestDate(
          id,
          contestDto.date
        );
        if (date) {
          data.createContestDate = '创建比赛流程成功';
        } else {
          data.createContestDate = '创建比赛流程失败';
        }
      }
      if (contestDto.awards) {
        const awards = await this.contestDao.createContestAwards(
          id,
          contestDto.awards
        );
        if (awards) {
          data.createContestAwards = '创建比赛奖项成功';
        } else {
          data.createContestAwards = '创建比赛奖项失败';
        }
      }
      if (contestDto.direction) {
        const direction = await this.contestDao.createContestDirection(
          id,
          contestDto.direction
        );
        if (direction) {
          data.createContestDirection = '创建比赛方向成功';
        } else {
          data.createContestDirection = '创建比赛方向失败';
        }
      }
      return data;
    } else {
      data.createContest = '创建比赛失败';
      return data;
    }
  }
  //用户获取比赛信息
  async getContest() {
    const data = await this.contestDao.getContest();
    if (data) {
      await this.statisticsDao.createStatistics();
    }
    return data;
  }
  //管理员获取比赛列表
  async getAllContest() {
    return await this.contestDao.getAllContest();
  }
  //管理员获取单一比赛信息
  async getContestInfo(id: string) {
    return await this.contestDao.getContestInfo(id);
  }
  //管理员启动该比赛
  async startContest(id: string) {
    return await this.contestDao.startContest(id);
  }
  //上传二维码图片
  async uploadQrLink(files: Array<UploadFileInfo>, id: string) {
    // 获取文件扩展名
    const originalFilename = this.getFileExtension.getFileExtension(files);
    // 使用 UUID 创建唯一文件名
    const filename = uuidv7() + '.' + originalFilename;
    // 构建上传文件的目标路径（根据需求可以更改路径）
    const targetPath = join('oss', filename);
    // 上传文件到 OSS
    const result = await this.ossService.put(targetPath, files[0].data); // 这里传递文件的路径
    if (result) {
      // 上传成功，保存文件的 URL 地址到数据库
      const fileUrl = result.url;
      return await this.contestDao.uploadQrLink(fileUrl, id); // 假设 userDao.uploadImg 保存 URL 到数据库
    } else {
      throw new Error('上传图片失败');
    }
  }
  //上传二维码图片
  async uploadUserLink(files: Array<UploadFileInfo>, id: string) {
    // 获取文件扩展名
    const originalFilename = this.getFileExtension.getFileExtension(files);
    // 使用 UUID 创建唯一文件名
    const filename = uuidv7() + '.' + originalFilename;
    // 构建上传文件的目标路径（根据需求可以更改路径）
    const targetPath = join('oss', filename);
    // 上传文件到 OSS
    const result = await this.ossService.put(targetPath, files[0].data); // 这里传递文件的路径
    if (result) {
      // 上传成功，保存文件的 URL 地址到数据库
      const fileUrl = result.url;
      return await this.contestDao.uploadUserLink(fileUrl, id); // 假设 userDao.uploadImg 保存 URL 到数据库
    } else {
      throw new Error('上传图片失败');
    }
  }
  //修改比赛主体详情
  async updateContestInfo(contestInfoDto: ContestInfoDTO) {
    return await this.contestDao.updateContestInfo(contestInfoDto);
  }
  async updateContestDate(ContestDateDto: ContestDateDTO): Promise<boolean> {
    // 分离成两个数组
    const updateItems = ContestDateDto.date.filter((item) => item.id !== undefined);
    const newItems = ContestDateDto.date.filter((item) => item.id === undefined);
    const id = ContestDateDto.id;
    let successUpdate = true;
    let successCreate = true;
    // 处理需要更新的项
    if (updateItems.length !== 0) {
      successUpdate = await this.contestDao.updateContestDate(updateItems);
    }
    // 处理需要创建的项
    if (newItems.length !== 0) {
      successCreate = await this.contestDao.createContestDate(id, newItems);
    }
    // 返回结果
    return successUpdate && successCreate;
  }
  //修改比赛奖项
  async updateAwardInfo(contestAwardsDto: ContestAwardsDTO) {
  // 分离成两个数组
  const updateItems = contestAwardsDto.award.filter((item) => item.id !== undefined);
  const newItems = contestAwardsDto.award.filter((item) => item.id === undefined);
  const id = contestAwardsDto.id;
  let successUpdate = true; 
  let successCreate = true;
  // 处理需要更新的项
  if (updateItems.length !== 0) {
    successUpdate = await this.contestDao.updateContestAwards(updateItems);
  }
  // 处理需要创建的项
  if (newItems.length !== 0) {
    successCreate = await this.contestDao.createContestAwards(id, newItems);
  }
  // 返回结果
  return successUpdate && successCreate;
  }
  //修改比赛方向
  async updateContestDirection(contestDirectionDto: ContestDirectionDTO) {
    const updateItems = contestDirectionDto.direction.filter((item) => item.id !== undefined);
    const newItems = contestDirectionDto.direction.filter((item) => item.id === undefined);
    const id = contestDirectionDto.id;
    let successUpdate = true;
    let successCreate = true;
    // 处理需要更新的项
    if (updateItems.length !== 0) {
      successUpdate = await this.contestDao.updateContestDirection(updateItems);
    }
    // 处理需要创建的项
    if (newItems.length !== 0) {
      successCreate = await this.contestDao.createContestDirection(id, newItems);
    }
    // 返回结果
    return successUpdate && successCreate;
  }
  //修改比赛组别
  async updateGroupRemark(contestGroupDto: ContestGroupDTO[]) {
    return await this.contestDao.updateGroupRemark(contestGroupDto);
  }
}