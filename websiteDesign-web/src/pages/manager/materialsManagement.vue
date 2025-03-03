<template>
    <div class="flex-1">
        <!-- 右侧内容区域 -->
        <div class="flex-1 p-4">
            <!-- 标题 -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-3xl text-[#5295CD]">资料管理</h2>
            </div>
            <!-- 历史记录表格 -->
            <div class="bg-white p-4 rounded-lg shadow-md mx-auto border-[1px] border-[#5295CD]">
                <var-tabs indicator-color="#5295CD" active-color="#5295CD" v-model:active="activeTab">
                    <!-- 点击切换显示正常和禁用的队伍，正常为1，禁用为0 -->
                    <var-tab @click="toggleTab(1)">正常</var-tab>
                    <var-tab @click="toggleTab(0)">禁用</var-tab>
                </var-tabs>
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">资料名称</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">资料分类</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">创建者</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">创建时间</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="listLoading">
                            <td colspan="6" class="px-6 py-1.4 text-center text-base text-gray-500">
                                <var-loading description="LOADING" color="#5295CD" />
                            </td>
                        </tr>
                        <tr v-if="materialsListByValid.length === 0 && listLoading === false">
                            <td colspan="6" class="px-6 py-1.4 text-center text-base text-gray-500">暂无数据</td>
                        </tr>
                        <tr v-for="(record, index) in pagedMaterials" :key="index" class="odd:bg-white even:bg-gray-50" v-hover="{ color: 'var(--color-on-primary)', background: '#F0F0F0' }">
                            <!-- 队伍名称 -->
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ record.materialsName }}</td>
                            <!-- 队长 -->
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ record.type }}</td>
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ record.userName }}</td>
                            <!-- 时间 -->
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ formatDate(record.createdAt) }}</td>
                            <!-- 操作 -->
                            <td class="px-6 py-1 text-center text-base text-blue-500 hover:text-blue-800">
                                <var-button class="inline-block w-35" color="#5295CD" text-color="white" @click="viewRecord(record)" style="border-radius: 8px">修 改</var-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页组件 -->
                <div class="flex justify-center mt-6">
                    <var-pagination :current="currentPage" :total="total" :size-option="[10]" :simple="true" @change="handlePageChange" style="color: #5295cd" />
                </div>
            </div>
        </div>
        <!-- 删除信息确认弹窗 -->
        <var-dialog v-model:show="showConfirm" title="删除提示" confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" width="35vw" @before-close="deleteMaterials">
            <var-loading description="LOADING" color="red" :loading="deleteLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认删除此资料？</p>
                </div>
            </var-loading>
        </var-dialog>
        <!-- 恢复信息确认弹窗 -->
        <var-dialog v-model:show="showRecoverConfirm" title="恢复提示" confirm-button-text-color="green" persistent cancel-button-text-color="#5295CD" width="35vw" @before-close="recoverMaterials">
            <var-loading description="LOADING" color="green" :loading="recoverLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认恢复此资料？</p>
                </div>
            </var-loading>
        </var-dialog>
        <!-- 操作面板弹窗 -->
        <var-popup v-model:show="showCenterPopup">
            <var-loading description="LOADING" color="#5295CD" :loading="loading">
                <div class="p-10 w-[500px] h-[550px] bg-white">
                    <!-- 弹窗内容 -->
                    <h3 class="text-xl mt-1 mb-10">{{ materialsInfo.materialsName }}</h3>
                    <div class="grid grid-cols-5 gap-8">
                        <!--左边列-->
                    </div>
                    <!--队伍名称-->
                    <div class="mb-5">
                        <var-input label="资料名称" focus-color="#5295CD" v-model="materialsInfo.materialsName" placeholder="资料名称" variant="outlined" />
                    </div>
                    <div class="mb-5">
                        <var-space direction="column" size="large" class="w-full rounded-xl">
                            <var-select v-model="materialsInfo.type" variant="outlined" placeholder="资料分类" size="large" focus-color="#5295CD" class="w-full text-center bg-white text-black rounded-xl">
                                <var-option label="服务器部署" value="FWQ" />
                                <var-option label="后端开发" value="HDKF" />
                                <var-option label="前端开发" value="QDKF" />
                                <var-option label="数据库设计" value="SJK" />
                                <var-option label="UI设计" value="UISJ" />
                                <var-option label="网站设计大赛宣传网站" value="WZSJDSXCWZ" />
                                <var-option label="其他" value="QT" />
                            </var-select>
                        </var-space>
                    </div>
                    <!--作品名称-->
                    <div class="mb-5">
                        <var-input label="资料描述" v-model="materialsInfo.description" focus-color="#5295CD" placeholder="资料描述" variant="outlined" />
                    </div>
                    <div class="mb-5">
                        <var-input label="资料链接" v-model="materialsInfo.link" textarea rows="4" focus-color="#5295CD" placeholder="资料链接" variant="outlined" />
                    </div>
                    <!-- 按钮容器 -->
                    <div class="mt-auto flex justify-center">
                        <var-space :size="[10, 30]">
                            <var-button v-if="selectedRecord.validFlag === '1'" type="danger" @click="showConfirm = true">删除资料</var-button>
                            <var-button v-if="selectedRecord.validFlag === '0'" type="success" @click="showRecoverConfirm = true">恢复资料</var-button>
                            <var-button block color="#5295CD" text-color="white" @click="updateMaterialsInfo">保存修改</var-button>
                        </var-space>
                    </div>
                </div>
            </var-loading>
        </var-popup>
        <!-- 新增资料弹窗 -->
        <var-popup v-model:show="showCreateMaterials">
            <var-loading description="LOADING" color="#5295CD" :loading="createLoading">
                <var-form ref="form" scroll-to-error="start">
                    <div class="p-10 w-[500px] h-[550px] bg-white ">
                        <p class="text-lg text-gray-900 mb-5">新增资料</p>
                        <div class="mb-5">
                            <var-input v-model="newMaterials.name" focus-color="#5295CD" placeholder="资料名称" variant="outlined" :rules="(v) => !!v || '资料名称不能为空'" />
                        </div>
                        <div class="mb-5">
                            <var-space direction="column" size="large" class="w-full rounded-xl">
                                <var-select v-model="newMaterials.type" variant="outlined" placeholder="资料分类" size="large" focus-color="#5295CD" class="w-full text-center bg-white text-black rounded-xl" :rules="(v) => !!v || '资料分类不能为空'">
                                    <var-option label="服务器部署" value="FWQ" />
                                    <var-option label="后端开发" value="HDKF" />
                                    <var-option label="前端开发" value="QDKF" />
                                    <var-option label="数据库设计" value="SJK" />
                                    <var-option label="UI设计" value="UISJ" />
                                    <var-option label="网站设计大赛宣传网站" value="WZSJDSXCWZ" />
                                    <var-option label="其他" value="QT" />
                                </var-select>
                            </var-space>
                        </div>
                        <div class="mb-5">
                            <var-input v-model="newMaterials.description" focus-color="#5295CD" placeholder="资料描述" variant="outlined" :rules="(v) => !!v || '资料描述不能为空'" />
                        </div>
                        <div class="mb-5">
                            <var-input v-model="newMaterials.link" textarea rows="4" focus-color="#5295CD" placeholder="资料链接" variant="outlined" :rules="(v) => !!v || '资料链接不能为空'" />
                        </div>
                        <div class="mt-auto px-[5vw] flex justify-center">
                            <var-button block outline text text-color="#5295CD" @click="createMaterials">创建资料</var-button>
                        </div>
                    </div>
                </var-form>
            </var-loading>
        </var-popup>
    </div>
    <img src="@/assets/添加.svg" @click="showCreateMaterials = true" class="fixed bottom-[2vw] right-[2vw] z-50 rounded-full" />
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'managerUser',
    data() {
        return {
            deleteLoading: false, // 删除资料加载状态
            recoverLoading: false, // 恢复资料加载状态
            listLoading: false, // 列表加载状态
            materialsList: [], // 原始队伍列表
            materialsListByValid: [], // 根据 materialsValid 分组后的队伍列表
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示的记录数
            total: 0, // 总条数
            loading: false,
            createLoading: false, // 新增资料加载状态
            activeTab: 0, // 当前显示的 tab 状态
            showCenterPopup: false, // 操作弹窗
            showCreateMaterials: false,
            showConfirm: false,
            newMaterials: {
                name: '',
                type: '',
                description: '',
                link: ''
            },
            showRecoverConfirm: false, // 控制信息确认弹窗显示
            selectedRecord: {}, // 当前选中的记录
            materialsInfo: {} // 用于临时存储修改后的队伍信息
        };
    },
    async mounted() {
        await this.getMaterials();
        this.toggleTab(1); // 默认显示正常队伍
    },
    computed: {
        pagedMaterials() {
            // 计算当前页显示的资料
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.currentPage * this.pageSize;
            return this.materialsListByValid.slice(startIndex, endIndex);
        }
    },
    methods: {
        // 切换显示正常和禁用的队伍
        toggleTab(tab) {
            // 方法 toggleTab 接收一个参数 tab，用于切换正常和禁用队伍
            // 根据 materialsValid 字段筛选队伍
            // filter() 方法遍历原数组 materialsList，筛选并分类出目标数据，存入 tab 中，并返回到新数组 materialsListByValid
            // tab 为 1 显示为正常，tab 为 0 显示为禁用
            this.materialsListByValid = this.materialsList.filter((materials) => materials.validFlag == tab);
            this.tab = tab; // 更新当前 tab 状态
        },
        // 管理员获取队伍信息
        async getMaterials() {
            this.listLoading = true;
            const res = await this.$api.materials.getAllMaterialsList();
            if (res.success) {
                this.materialsList = res.data; // 提取数组字段
                this.total = res.data.length; // 更新总记录数
                this.toggleTab(this.tab); // 默认显示正常队伍
                this.listLoading = false;
            } else {
                this.materialsList = [];
                this.total = 0;
                this.listLoading = false;
            }
        },
        // 管理员保存队伍信息
        async updateMaterialsInfo() {
            const changes = {};
            for (const key in this.materialsInfo) {
                if (this.materialsInfo[key] !== this.selectedRecord[key]) {
                    let updatedKey = key === 'materialsName' ? 'name' : key;
                    changes[updatedKey] = this.materialsInfo[key];
                }
            }
            changes.materialsId = this.selectedRecord.id;
            this.loading = true;
            const res = await this.$api.materials.updateMaterials(changes);
            this.loading = false;
            if (res.success) {
                this.$api.notify.success('资料信息更新成功');
                this.showCenterPopup = false;
                this.getMaterials(); // 刷新列表
            } else {
                this.$api.notify.error(res.error || '资料信息更新失败');
            }
        },
        // 删除资料操作
        async deleteMaterials(action, done) {
            if (action === 'confirm') {
                this.deleteLoading = true;
                const res = await this.$api.materials.updateMaterials({
                    materialsId: this.selectedRecord.id,
                    validFlag: 0
                });
                this.deleteLoading = false;
                if (res.success) {
                    this.$api.notify.success('删除资料成功');
                    this.showConfirm = false;
                    this.showCenterPopup = false;
                    this.getMaterials();
                } else {
                    this.$api.notify.error(res.error || '删除资料失败');
                }
            }
            done();
        },
        // 恢复资料操作
        async recoverMaterials(action, done) {
            if (action === 'confirm') {
                this.recoverLoading = true;
                const res = await this.$api.materials.updateMaterials({
                    materialsId: this.selectedRecord.id,
                    validFlag: 1
                });
                this.recoverLoading = false;
                if (res.success) {
                    this.$api.notify.success('恢复资料成功');
                    this.showRecoverConfirm = false;
                    this.showCenterPopup = false;
                    this.getMaterials();
                } else {
                    this.$api.notify.error(res.error || '恢复资料失败');
                }
            }
            done();
        },
        // 新增资料
        async createMaterials() {
            const valid = await this.$refs.form.validate();
            if (valid) {
                this.createLoading = true;
                const res = await this.$api.materials.createMaterials(this.newMaterials);
                this.createLoading = false;
                if (res.success) {
                    this.getMaterials();
                    this.$api.notify.success('新增资料成功');
                    this.showCreateMaterials = false;
                    this.newMaterials = {
                        name: '',
                        type: '',
                        description: '',
                        link: ''
                    };
                } else {
                    this.$api.notify.error(res.error || '新增资料失败');
                }
            } else {
                // 表单验证失败
                this.$api.notify.error('表单验证失败，请检查输入');
            }
        },
        // 日期变正常
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        },
        // 查看课资料信息
        viewRecord(record) {
            this.selectedRecord = record;
            this.materialsInfo = { ...record };
            this.showCenterPopup = true;
        },
        handlePageChange(page) {
            this.currentPage = page; // 更新当前页码
        }
    }
};
</script>

<style scoped></style>
