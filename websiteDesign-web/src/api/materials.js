import request from '../utils/request';

const moduleUrl = '/materials';

const materials = {
    //用户获取课程资料信息
    getMaterials(data) {
        return request.get(`${moduleUrl}/getMaterials`, data);
    },
    // 管理员新建资料
    createMaterials(data) {
        return request.post(`${moduleUrl}/createMaterials`, data);
    },
    // 管理员获取资料列表
    getMaterialsList(data) {
        return request.get(`${moduleUrl}/getMaterialsList`, data);
    },
    // 管理员更改资料信息
    updateMaterials(data) {
        return request.put(`${moduleUrl}/updateMaterials`, data);
    }
};

export default materials;
