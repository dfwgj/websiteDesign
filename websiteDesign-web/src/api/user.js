import request from '../utils/request';

const moduleUrl = '/user';

const user = {
    //修改用户信息
    updateUserInfo(data) {
        return request.put(`${moduleUrl}/updateUserInfo`, data);
    },
    //获取用户信息
    getUserInfo(data) {
        return request.get(`${moduleUrl}/getUserInfo`, data);
    },
    // 管理员获取所有用户信息
    getAllUser(data) {
        return request.get(`${moduleUrl}/getAllUser`, data);
    },
    // 管理员修改用户信息
    adminUpdateUserInfo(data) {
        return request.put(`${moduleUrl}/adminUpdateUserInfo`, data);
    }
};

export default user;
