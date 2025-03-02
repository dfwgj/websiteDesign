import request from '../utils/request';

const moduleUrl = '/team';

const team = {
    // 队伍报名
    registerTeam(data) {
        return request.post(`${moduleUrl}/registerTeam`, data);
    },
    // 获取队伍信息
    getTeam(data) {
        return request.get(`${moduleUrl}/getTeam`, data);
    },
    // 获取队伍成员信息
    getTeamPlayers(data) {
        return request.get(`${moduleUrl}/getTeamPlayers`, data);
    },
    // 管理员更改队伍信息
    updateTeamInfo(data) {
        return request.put(`${moduleUrl}/updateTeamInfo`, data);
    },
    // 管理员删除队伍信息
    delTeam(data) {
        return request.put(`${moduleUrl}/delTeam`, data);
    },
    // 管理员设置队长
    setTeamLeader(data) {
        return request.put(`${moduleUrl}/setTeamLeader`, data);
    }
};

export default team;
