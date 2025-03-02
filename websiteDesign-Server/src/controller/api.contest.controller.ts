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
import { ContestDTO, startContestDTO, ContestDateDTO, ContestGroupDTO, ContestAwardsDTO, ContestDirectionDTO, ContestInfoDTO } from '../dto/contest';
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
   * @name uploadQrLink 上传咨询群二维码图片
   * @description Put /contest/uploadQrLink
   * @param {File} files - 上传的图片文件
   * @param {string} id - 比赛id
   * @returns {string} - 上传的图片url
   */
  @UseGuard(AuthGuard)
  @Put('/uploadQrLink', { middleware: [UploadMiddleware] })
  async uploadQrLink(
    @Files('files') files: Array<UploadFileInfo>,
    @Fields() startContestDTO: startContestDTO
  ): Promise<string> {
    const { id } = startContestDTO;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.uploadQrLink(files, id);
  }
  /**
   * @name uploadUserLink 上传管理员二维码图片
   * @description Put /contest/uploadUserLink
   * @param {File} files - 上传的图片文件
   * @param {string} id - 比赛id
   * @returns {string} - 上传的图片url
   */
  @UseGuard(AuthGuard)
  @Put('/uploadUserLink', { middleware: [UploadMiddleware] })
  async uploadUserLink(
    @Files('files') files: Array<UploadFileInfo>,
    @Fields() startContestDTO: startContestDTO
  ): Promise<string> {
    const { id } = startContestDTO;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.uploadUserLink(files, id);
  }
  /**
   * @name updateContestInfo 修改比赛主体详情
   * @description PUT /contest/ updateContestInfo
   * @param {string} id - 比赛id
   * @param {object} - 更改详情
   * @returns {boolean} - 修改成功的信息
   */
  @UseGuard(AuthGuard)
  @Put('/updateContestInfo')
  async updateContestInfo(
    @Body() ContestInfoDto: ContestInfoDTO
  ): Promise<boolean> {
    const { id } = ContestInfoDto;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.updateContestInfo(ContestInfoDto);
  }
  /**
  * @name updateContestDate 管理员修改比赛流程
  * @description PUT /contest/updateContestDate
  * @param {string} id - 比赛id
  * @param {object} - 更改日期信息
  * @returns {boolean} - 修改成功的信息
  */
  @UseGuard(AuthGuard)
  @Put('/updateContestDate')
  async updateContestDate(
    @Body() ContestDateDto: ContestDateDTO
  ): Promise<boolean> {
    const { id } = ContestDateDto;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.updateContestDate(ContestDateDto);
  }
  /**
   * @name updateAwardInfo 管理员修改获奖信息
   * @description PUT /contest/updateAwardInfo
   * @param {string} id - 比赛id
   * @param {object} - 更改获奖信息
   * @returns {boolean} - 修改成功的信息
   */
  @UseGuard(AuthGuard)
  @Put('/updateAwardInfo')
  async updateAwardInfo(
    @Body() ContestAwardsDto: ContestAwardsDTO
  ): Promise<boolean> {
    const { id } = ContestAwardsDto;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.updateAwardInfo(ContestAwardsDto);
  }
  /**
   * @name updateContestDirection 管理员修改比赛方向
   * @description PUT /contest/updateContestDirection
   * @param {string} id - 比赛id
   * @param {object} - 更改方向信息
   * @returns {boolean} - 修改成功的信息
   */
  @UseGuard(AuthGuard)
  @Put('/updateContestDirection')
  async updateContestDirection(
    @Body() ContestDirectionDto: ContestDirectionDTO
  ): Promise<boolean> {
    const { id } = ContestDirectionDto;
    const result = await this.contestService.checkContest('id', id);
    if (!result) {
      throw new Error('该比赛不存在');
    }
    return await this.contestService.updateContestDirection(
      ContestDirectionDto
    );
  }
  /**
   * @name updateGroupRemark 管理员修改组别信息
   * @description PUT /contest/updateGroupRemark
   * @param {object} - 更改组别信息
   * @returns {boolean} - 修改成功的信息
   */
  @UseGuard(AuthGuard)
  @Put('/updateGroupRemark')
  async updateGroupRemark(
    @Body() ContestGroupDto: ContestGroupDTO[]
  ): Promise<boolean> {
    console.log(ContestGroupDto);
    return await this.contestService.updateGroupRemark(ContestGroupDto);
  }
}
