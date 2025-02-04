import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TeamDTO,TeamUpdateDTO } from '../dto/team';
import { TeamDao } from '../dao/teamDao';

@Provide()
export class TeamService {
    @Inject()
    ctx: Context;
    @Inject()
    teamDao: TeamDao;
    //验证队伍是否存在
    async findTeam(teamId: string) {
        return await this.teamDao.findTeam(teamId);
    }
    //验证是否已经报名
    async isRegister(studentId: string) {
        const result = await this.teamDao.isRegister(studentId);
        return result;
    }
    //比赛报名
    async registerTeam(name: TeamDTO['name'], model: TeamDTO['model'], direction: TeamDTO['direction'], players: TeamDTO['players']) {
        return await this.teamDao.registerTeam(name, model, direction, players);
    }
    //管理员获取队伍信息
    async getTeam(){
        return await this.teamDao.getTeam();
    }
    //管理员获取队伍成员信息
    async getTeamPlayers(teamId: string){
        return await this.teamDao.getTeamPlayers(teamId);
    }
    //管理员更改队伍信息
    async updateTeamInfo(teamUpdateDTO: TeamUpdateDTO){
        return await this.teamDao.updateTeamInfo(teamUpdateDTO)
    }
    //管理员删除队伍信息
    async delTeam(teamId: string){
        return await this.teamDao.delTeam(teamId);
    }
}
