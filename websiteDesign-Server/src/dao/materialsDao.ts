import { Inject, Provide } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { MaterialsDTO, UpdateMaterialsDTO } from '../dto/materials';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
import { uuidv7 } from 'uuidv7';
import { CachingFactory, MidwayCache } from "@midwayjs/cache-manager";
import { InjectClient } from "@midwayjs/core";
@Provide()
export class MaterialsDao {
    @Inject()
    ctx: Context;
    //验证课程是否存在
    async findMaterials(materialsId: string) {
        const sql = `
        SELECT
            COUNT(*) AS count
        FROM 
            materials
        WHERE
            id = ?
        `;
        const sqlParams = [materialsId];
        const result = await query(sql, sqlParams);
        return result[0].count;
    }
    @InjectClient(CachingFactory, 'redis')
    cache: MidwayCache; //redis缓存
    //管理员新增课程
    async createMaterials(materialsDTO: MaterialsDTO) {
        const materialsId = uuidv7();
        const userId = this.ctx.state.user.userId;
        const sql = `
        INSERT INTO 
        materials (id, user_id, name, link, description, type, created_at )
        VALUES (?,?,?,?,?,?,NOW())`;
        const sqlParams = [materialsId, userId, materialsDTO.name, materialsDTO.link, materialsDTO.description, materialsDTO.type];
        await query(sql, sqlParams);
        await this.cache.del('materialsList');
        return true;
    }
    //管理员更新课程
    async updateMaterials(updateMaterialsDTO: UpdateMaterialsDTO) {
        const materialsId = updateMaterialsDTO.materialsId;
        const setClause = [];
        const sqlParams = [];
        for (const [key, value] of Object.entries(updateMaterialsDTO)) {
            if (key === 'materialsId') {
                continue;
            }
            const snakeKey = this.camelToSnake(key);
            setClause.push(`${snakeKey} = ?`);
            sqlParams.push(value);
        }
        sqlParams.push(materialsId);
        const sql = `
        UPDATE materials
        SET ${setClause.join(', ')}
        WHERE id = ?
        `;
        await query(sql, sqlParams);
        await this.cache.del('materialsList');
        return true;
    }
    //管理员获取课程列表
    async getMaterialsList() {
        const sql = `
        SELECT
        materials.id AS materialsId,
        user.name AS userName,
        materials.name AS materialsName, 
        materials.link,
        materials.description,
        t.item_label AS type,
        materials.created_at AS createdAt,
        materials.valid_flag AS validFlag
    FROM
        materials
    LEFT JOIN
        user ON materials.user_id = user.user_id
    LEFT JOIN
        sys_dict_item t ON materials.type = t.item_code AND t.dict_code = 'TYPE'
        `;
        const sqlParams = [];
        return await query(sql, sqlParams);
    }
    @Caching('redis','materialsList')
    //用户获取课程信息
    async getMaterials() {
        const sql = `
    SELECT
        materials.id AS materialsId,
        user.name AS userName,
        materials.name AS materialsName, 
        materials.link,
        materials.description,
        t.item_label AS type,
        materials.created_at AS createdAt
        FROM
        materials
    LEFT JOIN
        user ON materials.user_id = user.user_id
    LEFT JOIN
        sys_dict_item t ON materials.type = t.item_code AND t.dict_code = 'TYPE'
    WHERE
        materials.valid_flag = 1
        `;
        const sqlParams = [];
        return await query(sql, sqlParams);
    }
    // 工具函数：驼峰命名转下划线命名
    camelToSnake(str: string): string {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    }
}