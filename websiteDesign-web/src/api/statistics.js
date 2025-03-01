import request from '../utils/request';

const moduleUrl = '/statistics';

const statistics = {
    // 管理员获取系统数据
    getStatistics(data) {
        return request.get(`${moduleUrl}/getStatistics`, data);
    }
};

export default statistics;
