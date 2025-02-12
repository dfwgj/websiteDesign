import request from '../utils/request';

const moduleUrl = '/contest';

const contest = {
    //获取比赛列表
    getContest() {
        return request.get(`${moduleUrl}/getContest`);
    }
};

export default contest;
