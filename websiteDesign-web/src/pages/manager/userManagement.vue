<template>
    <div class="flex-1">
        <!-- 右侧内容区域 -->
        <div class="flex-1 p-4">
            <!-- 标题 -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-3xl text-[#5295CD]">用户管理</h2>
            </div>
            <!-- 历史记录表格 -->
            <div class="bg-white p-4 rounded-lg shadow-md mx-auto border-[1px] border-[#5295CD]">
                <var-tabs indicator-color="#5295CD" active-color="#5295CD" v-model:active="activeTab">
                    <var-tab>正常</var-tab>
                    <var-tab>封禁</var-tab>
                </var-tabs>
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">学号</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">姓名</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">队伍名称</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">学院</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">注册时间</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="listLoading">
                            <td colspan="6" class="px-6 py-1.4 text-center text-base text-gray-500">
                                <var-loading description="LOADING" color="#5295CD" />
                            </td>
                        </tr>
                        <tr v-if="total == 0 && listLoading == false">
                            <td colspan="6" class="px-6 py-1.4 text-center text-base text-gray-500">暂无数据</td>
                        </tr>
                        <tr v-for="(record, index) in list" :key="index" class="odd:bg-white even:bg-gray-50" v-hover="{ color: 'var(--color-on-primary)', background: '#F0F0F0' }">
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ record.studentId }}</td>
                            <td class="px-6 py-1 text-center text-base text-gray-900">{{ record.name }}</td>
                            <td class="px-6 py-1 text-center text-base text-gray-900">{{ record.teamName || '-' }}</td>
                            <td class="px-6 py-1 text-center text-base text-gray-900">{{ record.college }}</td>
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ formatDate(record.createdAt) }}</td>
                            <td class="px-6 py-1 text-base text-blue-500 hover:text-blue-800 flex justify-center items-center">
                                <var-space :size="[10, 10]">
                                    <var-button block color="#5295CD" text-color="white" @click="viewRecord(record)" class="w-35" style="border-radius: 8px">操 作</var-button>
                                </var-space>
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
        <var-dialog v-model:show="showConfirm" title="删除提示" confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" width="35vw" @before-close="deleteUser">
            <var-loading description="LOADING" color="red" :loading="deleteLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认删除此用户？请谨慎操作！</p>
                </div>
            </var-loading>
        </var-dialog>
        <!--恢复信息确认弹窗  -->
        <var-dialog v-model:show="showRecoverConfirm" title="恢复提示" confirm-button-text-color="green" persistent cancel-button-text-color="#5295CD" width="35vw" @before-close="recoverUser">
            <var-loading description="LOADING" color="green" :loading="recoverLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认恢复此用户？请谨慎操作！</p>
                </div>
            </var-loading>
        </var-dialog>

        <!-- 居中弹窗 -->
        <var-popup v-model:show="showCenterPopup">
            <var-loading description="LOADING" color="#5295CD" :loading="loading">
                <div class="p-9 w-[500px] h-[650px] bg-white rounded-lg shadow-lg">
                    <!-- 弹窗内容 -->
                    <h3 class="text-lg font-semibold mb-2">{{ updateUser.name }}的个人信息</h3>
                    <div class="grid grid-cols-5 gap-8">
                        <!--左边列-->
                    </div>
                    <!--姓名-->
                    <div class="mb-4">
                        <var-input label="姓名" focus-color="#5295CD" v-model="updateUser.name" placeholder="姓名" variant="outlined" :rules="nameRules" />
                    </div>
                    <!--归属科学院-->
                    <div class="mb-4">
                        <var-select label="学院" v-model="updateUser.college" focus-color="#5295CD" placeholder="学院" variant="outlined">
                            <var-option label="生物医学工程学院" value="SWYXGCXY" />
                            <var-option label="第二临床医学院" value="DELCYXY" />
                            <var-option label="药学院" value="YYXY" />
                            <var-option label="公共卫生学院" value="GGSWXY" />
                            <var-option label="护理学院" value="HLXY" />
                            <var-option label="医学技术学院" value="YXJSXY" />
                            <var-option label="人文与管理学院" value="RWYGLXY" />
                            <var-option label="基础医学院" value="JCYXY" />
                            <var-option label="外国语学院" value="WGYXY" />
                        </var-select>
                    </div>
                    <!-- 专业 -->
                    <div class="mb-4">
                        <var-input label="专业" v-model="updateUser.major" focus-color="#5295CD" placeholder="专业" variant="outlined" :rules="collegeRules" />
                    </div>
                    <!--联系方式-->
                    <div class="mb-4">
                        <var-input label="联系方式" v-model="updateUser.phone" focus-color="#5295CD" placeholder="电话号码" variant="outlined" :rules="numberRules" />
                    </div>
                    <!--右边-->
                    <div>
                        <!-- 邮箱 -->
                        <div class="mb-4">
                            <var-input label="邮箱" v-model="updateUser.email" focus-color="#5295CD" placeholder="邮箱" variant="outlined" :rules="emailRules" />
                        </div>
                        <!-- 队伍 -->
                        <div class="mb-4">
                            <var-input v-show="selectedRecord.teamName" label="队伍" readonly v-model="updateUser.teamName" focus-color="#5295CD" placeholder="所属队伍" variant="outlined" />
                            <var-input v-show="!selectedRecord.teamName" label="队伍" readonly focus-color="#5295CD" placeholder="还没有加入队伍" variant="outlined" />
                        </div>
                        <div class="mb-4 flex justify-center">
                            <var-button text-color="#5295CD" size="large" text outline type="primary" block @click="resetPassword">重置密码</var-button>
                        </div>
                    </div>
                    <!-- 按钮容器 -->
                    <div class="mt-auto w-full grid grid-cols-2 gap-4">
                        <var-button v-if="selectedRecord.validFlag === '1'" type="danger" @click="showConfirm = true">删除用户</var-button>
                        <var-button v-if="selectedRecord.validFlag === '0'" type="success" @click="showRecoverConfirm = true">恢复用户</var-button>
                        <var-button color="#5295CD" text-color="white" @click="adminUpdateUserInfo">保存修改</var-button>
                    </div>
                </div>
            </var-loading>
        </var-popup>
    </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'managerUser',
    data() {
        return {
            searchValue: '', // 搜索框的值
            list: [],
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示的记录数
            total: 0, // 总条数
            loading: false,
            listLoading: false,
            activeTab: 0,
            showCenterPopup: false,
            showConfirm: false,
            showRecoverConfirm: false, // 控制信息确认弹窗显示
            selectedRecord: {}, // 当前选中的记录
            updateUser: {}, // 用于临时存储修改后的用户信息
        };
    },
    mounted() {
        this.getAllUser(); //获取用户接口
    },
    watch: {
        activeTab(newVal, oldVal) {
            // 监听 activeTab 变化，当选项卡切换时重新获取数据
            if (newVal !== oldVal) {
                this.currentPage = 1;
                this.getAllUser();
            }
        }
    },
    computed: {
        // 过滤后的列表，根据搜索值进行过滤
        nameRules() {
            return [
                (v) => /^[\u4e00-\u9fa5]{2,}$/.test(v) || '姓名必须为至少两个汉字！' // 使用正则表达式检查是否为汉字
            ];
        },
        numberRules() {
            return [
                (v) => /^\d{11}$/.test(v) || '输入的电话号码无效！' // 使用正则表达式检查是否为11位数字
            ];
        },
        collegeRules() {
            return [
                (v) => /^[\u4e00-\u9fa5]{2,}$/.test(v) || '至少两个汉字！' // 使用正则表达式检查是否为汉字
            ];
        },
        emailRules() {
            return [(v) => !!v || '邮箱不能为空', (v) => /.+@.+\..+/.test(v) || '邮箱格式不正确'];
        }
    },
    methods: {
        //管理员获取用户信息
        async getAllUser() {
            this.listLoading = true;
            this.list = [];
            const typeMap = [1, 0];
            const type = typeMap[this.activeTab];
            const res = await this.$api.user.getAllUser({ pageNum: this.currentPage, pageSize: this.pageSize, type: type });
            if (res.success) {
                this.list = res.data.list; // 提取数组字段
                this.total = res.data.total || 0; // 更新总记录数
                this.listLoading = false;
            } else {
                this.list = [];
                this.total = 0;
                this.listLoading = false;
            }
        },
        //管理员保存用户信息
        async adminUpdateUserInfo() {
            const changes = {};
            for (const key in this.updateUser) {
                if (this.updateUser[key] !== this.selectedRecord[key]) {
                    changes[key] = this.updateUser[key];
                }
            }
            changes.userId = this.selectedRecord.userId;
            this.loading = true;
            const res = await this.$api.user.adminUpdateUserInfo(changes);
            this.loading = false;
            if (res.success) {
                this.$api.notify.success('用户信息更新成功');
                this.showCenterPopup = false;
                await this.getAllUser(); // 刷新用户列表
            } else {
                this.$api.notify.error('用户信息更新失败');
            }
        },
        async resetPassword() {
            this.loading = true;
            const resetData = {
                userId: this.selectedRecord.userId,
                remakePassword: true
            };
            const res = await this.$api.user.adminUpdateUserInfo(resetData);
            this.loading = false;
            if (res.success) {
                this.$api.notify.success('密码已重置');
                this.showCenterPopup = false;
            } else {
                this.$api.notify.error(res.error);
            }
        },
        //删除用户操作
        async deleteUser(action, done) {
            if (action === 'confirm') {
                this.deleteLoading = true;
                const res = await this.$api.user.adminUpdateUserInfo({
                    userId: this.selectedRecord.userId,
                    validFlag: 0
                });
                this.deleteLoading = false;
                if (res.success) {
                    this.$api.notify.success('此用户已删除');
                    this.showConfirm = false;
                    this.showCenterPopup = false;
                    await this.getAllUser();
                } else {
                    this.$api.notify.error('删除用户失败');
                }
            }
            done();
        },
        //恢复用户操作
        async recoverUser(action, done) {
            if (action === 'confirm') {
                const res = await this.$api.user.adminUpdateUserInfo({
                    userId: this.selectedRecord.userId,
                    validFlag: 1
                });
                if (res.success) {
                    this.$api.notify.success('此用户已恢复');
                    this.showRecoverConfirm = false;
                    this.showCenterPopup = false;
                    await this.getAllUser();
                } else {
                    this.$api.notify.error('恢复用户失败');
                }
            }
            done();
        },
        //日期变正常
        formatDate(date) {
            return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss');
        },
        // 查看记录
        viewRecord(record) {
            this.selectedRecord = record;
            this.updateUser = { ...record, departmentId: record.departmentId };
            this.showCenterPopup = true;
        },
        // 处理分页变化
        handlePageChange(page) {
            if (page === this.currentPage) {
                return;
            }
            this.currentPage = page;
            this.getAllUser();
        }
    }
};
</script>

<style scoped></style>
