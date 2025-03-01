import request from '../utils/request';

const moduleUrl = '/statistics';

const statistics = {
    //用户获取统计信息
    getStatistics(data) {
        return request.get(`${moduleUrl}/getStatistics`, data);
    }
};
export default statistics;
