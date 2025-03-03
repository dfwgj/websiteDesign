import request from '../utils/request';

const moduleUrl = '/course';

const course = {
    //用户获取课程信息
    getCourse(data) {
        return request.get(`${moduleUrl}/getCourse`, data);
    },
    // 管理员新建课程
    createCourse(data) {
        return request.post(`${moduleUrl}/createCourse`, data);
    },
    // 管理员获取课程列表
    getAllCourseList(data) {
        return request.get(`${moduleUrl}/getAllCourseList`, data);
    },
    // 管理员更改课程信息
    updateCourse(data) {
        return request.put(`${moduleUrl}/updateCourse`, data);
    }
};

export default course;
