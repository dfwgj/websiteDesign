import request from '../utils/request';

const moduleUrl = '/contest';

const contest = {
    // 用户获取比赛信息
    getContest(data) {
        return request.get(`${moduleUrl}/getContest`, data);
    },
    // 管理员获取比赛列表
    getAllContest(data) {
        return request.get(`${moduleUrl}/getAllContest`, data);
    },
    // 管理员创建比赛信息
    createContest(data) {
        return request.post(`${moduleUrl}/createContest`, data);
    },
    // 管理员启动该比赛
    startContest(data) {
        return request.put(`${moduleUrl}/startContest`, data);
    },
    // 管理员上传比赛群二维码图片
    uploadQrLink(data) {
        return request.upload(`${moduleUrl}/uploadQrLink`, data);
    },
    // 管理员上传比赛负责人二维码图片
    uploadUserLink(data) {
        return request.upload(`${moduleUrl}/uploadUserLink`, data);
    },
    // 管理员获取单个比赛信息
    contestInfo(data) {
        return request.get(`${moduleUrl}/contestInfo`, data);
    },
    // 管理员修改比赛主体信息
    updateContestInfo(data) {
        return request.put(`${moduleUrl}/updateContestInfo`, data);
    },
    // 管理员修改组别信息
    updateGroupRemark(data) {
        return request.put(`${moduleUrl}/updateGroupRemark`, data);
    },
    // 管理员修改比赛日期
    updateContestDate(data) {
        return request.put(`${moduleUrl}/updateContestDate`, data);
    },
    // 管理员修改比赛方向
    updateContestDirection(data) {
        return request.put(`${moduleUrl}/updateContestDirection`, data);
    },
    // 管理员修改比赛状态
    updateAwardInfo(data) {
        return request.put(`${moduleUrl}/updateAwardInfo`, data);
    }
};

export default contest;
