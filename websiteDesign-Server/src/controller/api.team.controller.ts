import {
    Inject,
    Controller,
    Post,
    Body,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TeamService } from '../service/api.team.service';
import { TeamDTO } from '../dto/team';
//import { AuthGuard } from '../guard/auth.guard';

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
        const { name, model, direction, players } = teamdDto;
        if (model === 'WZKF') {
            const studentIds = players.map(player => player.studentId);
            const results = await Promise.all(studentIds.map(studentId => this.teamService.isRegister(studentId)));
            console.log(results.some(result => result));
            if (!results.every(result => result)) {
                throw new Error('有队员已报名，或者有队员未注册');
            }
        }else {
            const results = await this.teamService.isRegister(players[0].studentId);
            if (!results) {
                throw new Error('有队员已报名，或者有队员未注册');
            }
        } 
        return await this.teamService.registerTeam(name, model, direction, players);
    }
}