import request from '../utils/request';

const moduleUrl = '/course';

const course = {
    //用户获取课程信息
    getCourse(data) {
        return request.get(`${moduleUrl}/getCourse`, data);
    }
};

export default course;
