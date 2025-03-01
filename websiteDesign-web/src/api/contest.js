import request from '../utils/request';

const moduleUrl = '/contest';

const contest = {
    //获取比赛列表
    getContest() {
        return request.get(`${moduleUrl}/getContest`);
    },
    //管理员获取比赛列表
    getAllContest() {
        return request.get(`${moduleUrl}/getAllContest`);
    },
    //管理员启动比赛
    startContest(data){
        return request.put(`${moduleUrl}/startContest`, data);
    },
    //管理员创建比赛
    createContest(data){
        return request.post(`${moduleUrl}/createContest`, data);
    },
};

export default contest;
