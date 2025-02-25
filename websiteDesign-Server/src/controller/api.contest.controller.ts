import {
  Inject,
  Controller,
  UseGuard,
  Post,
  Body,
  Get,
  Put,
  Files,
  Fields,
  Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ContestService } from '../service/api.contest.service';
import { ContestDTO, startContestDTO, updateContestDTO } from '../dto/contest';
import { AuthGuard } from '../guard/auth.guard';
import { UploadMiddleware } from '@midwayjs/busboy';
import { UploadFileInfo } from '@midwayjs/busboy';

@Controller('/contest')
export class ContestController {
  @Inject()
  ctx: Context;
  @Inject()
  contestService: ContestService;
  /**
   * @name createContest 管理员创建比赛
   * @description POST /contest/createContest
   * @param {object}  contestDto- 比赛信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Post('/createContest')
  async createContest(@Body() contestDto: ContestDTO): Promise<object> {
    const result = await this.contestService.checkContest(
      'name',
      contestDto.name
    );
    if (result) {
      throw new Error('该比赛已存在');
    }
    return await this.contestService.createContest(contestDto);
  }
  /**
   * @name getAllContest 管理员获取比赛列表
   * @description GET /contest/getAllContest
   * @returns {object}  比赛列表
   */
  @UseGuard(AuthGuard)
  @Get('/getAllContest')
  async getAllContest(): Promise<object> {
    return await this.contestService.getAllContest();
  }
  /**
   * @name getContestInfo 管理员获取单一比赛信息
   * @description GET /contest/getContestInfo
   * @param {string}  id- 比赛id
   * @returns {object}  比赛信息
   */
  @UseGuard(AuthGuard)
  @Get('/contestInfo')
  async getContestInfo(@Query('id') id: string): Promise<object> {
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.getContestInfo(id);
  }
  /**
   * @name getContestList 用户获取比赛列表
   * @description GET /contest/getContestList
   * @returns {object}  比赛列表
   */
  @Get('/getContest')
  async getContest(): Promise<object> {
    return await this.contestService.getContest();
  }
  /**
   * @name initiateContest  管理员启动该比赛
   * @description PUT /contest/initiateContest
   * @param {string}  id- 比赛id
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Put('/startContest')
  async startContest(
    @Body() startContestDTO: startContestDTO
  ): Promise<boolean> {
    const { id } = startContestDTO;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.startContest(id);
  }
  /**
   * @name uploadImg 上传二维码图片
   * @description Put /contest/uploadImg
   * @param {File} files - 上传的图片文件
   * @param {string} id - 比赛id
   * @returns {string} - 上传的图片url
   */
  @UseGuard(AuthGuard)
  @Put('/uploadImg', { middleware: [UploadMiddleware] })
  async uploadImg(
    @Files('files') files: Array<UploadFileInfo>,
    @Fields() startContestDTO: startContestDTO
  ): Promise<string> {
    const { id } = startContestDTO;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.uploadImg(files, id);
  }
  /**
   * @name updateContestInfo 修改比赛详情
   * @description PUT /contest/ updateContestInfo
   * @param {string} id - 比赛id
   * @param {object} - 更改详情
   * @returns {object} - 修改成功的信息
   */
  @UseGuard(AuthGuard)
  @Put('/updateContestInfo')
  async updateContestInfo(
    @Body() updateContestDto: updateContestDTO
  ): Promise<object> {
    const result = await this.contestService.checkContest(
      'id',
      updateContestDto.id
    );
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.updateContestInfo(updateContestDto);
  }
}
