import {
  Inject,
  Controller,
  Post,
  Body,
  UseGuard,
  Get,
  Put,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { MaterialsService } from '../service/api.materials.service';
import { MaterialsDTO, UpdateMaterialsDTO } from '../dto/materials';
import { AuthGuard } from '../guard/auth.guard';
@Controller('/materials')
export class MaterialsController {
  @Inject()
  ctx: Context;
  @Inject()
  materialsService: MaterialsService;
  /**
   * @name createMaterials 管理员新增资料
   * @description POST /Materials/creatMaterials
   * @param {MaterialsDTO} materialsDTO - 资料信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Post('/createMaterials')
  async createMaterials(@Body() materialsDTO: MaterialsDTO): Promise<boolean> {
    return await this.materialsService.createMaterials(materialsDTO);
  }
  /**
   * @name updateMaterials 管理员更改资料信息
   * @description PUT /materials/updateMaterials
   * @param {UpdateMaterialsDTO} updateMaterialsDTO - 资料信息
   * @returns {boolean}  是否成功
   */
  @UseGuard(AuthGuard)
  @Put('/updateMaterials')
  async updateMaterials(
    @Body() updateMaterialsDTO: UpdateMaterialsDTO
  ): Promise<boolean> {
    const filteredData = Object.entries(updateMaterialsDTO).reduce(
      (acc, [key, value]) => {
        if (value != null) {
          // 同时过滤掉 null 和 undefined
          acc[key] = value;
        }
        return acc;
      },
      {} as UpdateMaterialsDTO
    );
    if (
      Object.keys(filteredData).length === 0 ||
      Object.keys(filteredData).length === 1
    ) {
      throw new Error('更新数据为空');
    }
    const result = await this.materialsService.findMaterials(
      updateMaterialsDTO.materialsId
    );
    if (!result) {
      throw new Error('课程不存在');
    }
    return await this.materialsService.updateMaterials(filteredData);
  }
  /**
   * @name getMaterialsList 管理员获取资料列表
   * @description GET /materials/getMaterialsList
   * returns {object}  资料列表
   */
  @UseGuard(AuthGuard)
  @Get('/getMaterialsList')
  async getMaterialsList(): Promise<object> {
    return await this.materialsService.getMaterialsList();
  }
  /**
   * @name getMaterials 用户获取资料信息
   * @description GET /materials/getMaterials
   * * returns {object}  资料列表
   */
  @Get('/getMaterials')
  async getMaterials(): Promise<object> {
    return await this.materialsService.getMaterials();
  }
}
