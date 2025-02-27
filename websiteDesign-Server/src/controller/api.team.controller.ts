import {
  Inject,
  Controller,
  Post,
  Body,
  UseGuard,
  Get,
  Query,
  Put,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TeamService } from '../service/api.team.service';
import { TeamDTO, TeamUpdateDTO } from '../dto/team';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/team')
export class TeamController {
  @Inject()
  ctx: Context;
  @Inject()
  teamService: TeamService;
  /**
   * @name registerTeam 报名比赛
   * @description POST /team/registerTeam
   * @param {object} teamDTO - 队伍信息
   * @returns {boolean}  是否成功
   */
  @Post('/registerTeam')
  async registerTeam(@Body() teamdDto: TeamDTO): Promise<boolean> {
    const { name, model, direction, opusName, players } = teamdDto;
    if (model !== 'WZKF' && model !== 'WYSJ') {
      throw new Error('队伍类型错误');
    }
    if (model === 'WZKF') {
      const validPlayers = players.filter(player => player.name !== undefined && player.studentId !== '');
      const studentIds = validPlayers.map(player => player.studentId);
      const names = validPlayers.map(player => player.name);
      if (studentIds.length !== 3 || names.length !== 3) {
        throw new Error('网站开发组的队员数量必须为三个');
      }
      const results = await Promise.all(
        studentIds.map((studentId, index) =>
          this.teamService.isRegister(studentId, names[index])
        )
      );
      if (!results.every(result => result)) {
        throw new Error('有队员已报名，或者有队员未注册,或者信息有误');
      }
    } else {
      const studentId = players[0].studentId;
      const name = players[0].name;
      if (studentId === '' || name === '') {
        throw new Error('信息不能为空');
      }
      const results = await this.teamService.isRegister(studentId, name);
      if (!results) {
        throw new Error('你已经报名,或者信息有误');
      }
    }
    return await this.teamService.registerTeam(name, model, direction, opusName, players);
  }
  /**
   * @name getTeam 管理员获取队伍信息
   * @description GET /team/getTeam
   * @returns {object}  队伍信息
   */
  @UseGuard(AuthGuard)
  @Get('/getTeam')
  async getTeam(): Promise<object> {
    return await this.teamService.getTeam();
  }
  /**
   * @name getTeamPlayers 管理员获取队伍成员信息
   * @description GET /team/getTeamPlayers
   * @returns {object}  队伍信息
   */
  @UseGuard(AuthGuard)
  @Get('/getTeamPlayers')
  async getTeamPlayers(@Query('teamId') teamId: string): Promise<object> {
    const result = await this.teamService.findTeam(teamId);
    if (!result) {
      throw new Error('队伍不存在');
    }
    return await this.teamService.getTeamPlayers(teamId);
  }
  /**
   * @name updateTeamInfo 管理员更改队伍信息
   * @description PUT /team/updateTeamInfo
   * @param {object} teamUpdateDTO - 队伍信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Put('/updateTeamInfo')
  async updateTeamInfo(@Body() teamUpdateDTO: TeamUpdateDTO): Promise<boolean> {
    const filteredData = Object.entries(teamUpdateDTO).reduce(
      (acc, [key, value]) => {
        if (value != null) {
          // 同时过滤掉 null 和 undefined
          acc[key] = value;
        }
        return acc;
      },
      {} as TeamUpdateDTO
    );
    if (
      Object.keys(filteredData).length === 0 ||
      Object.keys(filteredData).length === 1
    ) {
      throw new Error('更新数据为空');
    }
    const result = await this.teamService.findTeam(teamUpdateDTO.teamId);
    if (!result) {
      throw new Error('队伍不存在');
    }
    return await this.teamService.updateTeamInfo(filteredData);
  }
  /**
   * @name delTeam 管理员删除队伍信息
   * @description PUT /team/delTeam
   * @param {string} teamId - 队伍信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Put('/delTeam')
  async delTeam(@Body() teamUpdateDTO: TeamUpdateDTO): Promise<boolean> {
    const { teamId } = teamUpdateDTO;
    const result = await this.teamService.findTeam(teamId);
    if (!result) {
      throw new Error('队伍不存在');
    }
    return await this.teamService.delTeam(teamId);
  }
}
