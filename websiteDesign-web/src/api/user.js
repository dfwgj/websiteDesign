import request from '../utils/request';

const moduleUrl = '/user';

const user = {
    //用户图片上传
    uploadImg(formData) {
        return request.upload(`${moduleUrl}/uploadImg`, formData);
    },
    //修改用户信息
    updateUserInfo(data) {
        return request.put(`${moduleUrl}/updateUserInfo`, data);
    },
     //获取用户信息
    getUserInfo(){
        return request.get(`${moduleUrl}/getUserInfo`);
    },
};

export default user;
