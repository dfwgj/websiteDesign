import request from '../utils/request';

const moduleUrl = '/materials';

const materials = {
    //用户获取课程资料信息
    getMaterials(data) {
        return request.get(`${moduleUrl}/getMaterials`, data);
    }
};

export default materials;
