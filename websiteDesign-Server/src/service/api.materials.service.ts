import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { MaterialsDTO, UpdateMaterialsDTO } from '../dto/materials';
import { MaterialsDao } from '../dao/materialsDao';
@Provide()
export class MaterialsService {
    @Inject()
    materialsDao: MaterialsDao;
    @Inject()
    ctx: Context;
    //验证资料是否存在
    async findMaterials(MaterialsId: string) {
        return await this.materialsDao.findMaterials(MaterialsId);
    }
    //管理员新增资料
    async createMaterials( materialsDTO: MaterialsDTO) {
        return await this.materialsDao.createMaterials(materialsDTO);
    }
    //管理员更新资料
    async updateMaterials( updateMaterialsDTO: UpdateMaterialsDTO) {
        return await this.materialsDao.updateMaterials(updateMaterialsDTO);
    }
    //管理员获取资料列表
    async getMaterialsList() {
        return await this.materialsDao.getMaterialsList();
    }
    //用户获取资料信息
    async getMaterials(){
        return await this.materialsDao.getMaterials();
    }
}