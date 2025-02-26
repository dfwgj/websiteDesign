import request from '../utils/request';

const moduleUrl = '/team';

const team = {
    //队伍报名
    registerTeam(data) {
        return request.post(`${moduleUrl}/registerTeam`, data);
    },
};

export default team;
