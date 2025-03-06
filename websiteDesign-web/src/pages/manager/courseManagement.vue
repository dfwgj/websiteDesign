<template>
    <div class="flex-1">
        <!-- 右侧内容区域 -->
        <div class="flex-1 p-4">
            <!-- 标题 -->
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-3xl text-[#5295CD]">课程管理</h2>
            </div>
            <!-- 历史记录表格 -->
            <div class="bg-white p-4 rounded-lg shadow-md mx-auto border-[1px] border-[#5295CD]">
                <var-tabs indicator-color="#5295CD" active-color="#5295CD" v-model:active="activeTab">
                    <!-- 点击切换显示正常和禁用的队伍，正常为1，禁用为0 -->
                    <var-tab>正常</var-tab>
                    <var-tab>禁用</var-tab>
                </var-tabs>
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">课程名称</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">课程分类</th>
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
                        <tr v-if="courseListByValid.length === 0 && listLoading === false">
                            <td colspan="6" class="px-6 py-1.4 text-center text-base text-gray-500">暂无数据</td>
                        </tr>
                        <tr v-for="(record, index) in pagedCourse" :key="index" class="odd:bg-white even:bg-gray-50" v-hover="{ color: 'var(--color-on-primary)', background: '#F0F0F0' }">
                            <!-- 队伍名称 -->
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ record.courseName }}</td>
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
        <var-dialog v-model:show="showConfirm" title="删除提示" confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" width="35vw" @before-close="deleteCourse">
            <var-loading description="LOADING" color="red" :loading="deleteLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认删除此课程？</p>
                </div>
            </var-loading>
        </var-dialog>
        <!-- 恢复信息确认弹窗 -->
        <var-dialog v-model:show="showRecoverConfirm" title="恢复提示" confirm-button-text-color="green" persistent cancel-button-text-color="#5295CD" width="35vw" @before-close="recoverCourse">
            <var-loading description="LOADING" color="green" :loading="recoverLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认恢复此课程？</p>
                </div>
            </var-loading>
        </var-dialog>
        <!-- 操作面板弹窗 -->
        <var-popup v-model:show="showCenterPopup">
            <var-loading description="LOADING" color="#5295CD" :loading="loading">
                <div class="p-10 w-[500px] h-[550px] bg-white">
                    <!-- 弹窗内容 -->
                    <h3 class="text-xl mt-1 mb-10">{{ courseInfo.courseName }}</h3>
                    <div class="grid grid-cols-5 gap-8">
                        <!--左边列-->
                    </div>
                    <!--队伍名称-->
                    <div class="mb-5">
                        <var-input label="课程名称" focus-color="#5295CD" v-model="courseInfo.courseName" placeholder="课程名称" variant="outlined" />
                    </div>
                    <div class="mb-5">
                        <var-space direction="column" size="large" class="w-full rounded-xl">
                            <var-select v-model="courseInfo.type" variant="outlined" placeholder="课程分类" size="large" focus-color="#5295CD" class="w-full text-center bg-white text-black rounded-xl">
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
                        <var-input label="课程描述" v-model="courseInfo.description" focus-color="#5295CD" placeholder="课程描述" variant="outlined" />
                    </div>
                    <div class="mb-5">
                        <var-input label="课程链接" v-model="courseInfo.link" textarea rows="4" focus-color="#5295CD" placeholder="课程链接" variant="outlined" />
                    </div>
                    <!-- 按钮容器 -->
                    <div class="mt-auto flex justify-center">
                        <var-space :size="[10, 30]">
                            <var-button v-if="selectedRecord.validFlag === '1'" type="danger" @click="showConfirm = true">删除课程</var-button>
                            <var-button v-if="selectedRecord.validFlag === '0'" type="success" @click="showRecoverConfirm = true">恢复课程</var-button>
                            <var-button block color="#5295CD" text-color="white" @click="updateCourseInfo">保存修改</var-button>
                        </var-space>
                    </div>
                </div>
            </var-loading>
        </var-popup>
        <!-- 新增课程弹窗 -->
        <var-popup v-model:show="showCreateCourse">
            <var-loading description="LOADING" color="#5295CD" :loading="createLoading">
                <var-form ref="form" scroll-to-error="start">
                    <div class="p-10 w-[500px] h-[550px] bg-white">
                        <p class="text-lg text-gray-900 mb-5">新增课程</p>
                        <div class="mb-5">
                            <var-input v-model="newCourse.name" focus-color="#5295CD" placeholder="课程名称" variant="outlined" :rules="(v) => !!v || '课程名称不能为空'" />
                        </div>
                        <div class="mb-5">
                            <var-space direction="column" size="large" class="w-full rounded-xl">
                                <var-select v-model="newCourse.type" variant="outlined" placeholder="课程分类" size="large" focus-color="#5295CD" class="w-full text-center bg-white text-black rounded-xl" :rules="(v) => !!v || '课程分类不能为空'">
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
                            <var-input v-model="newCourse.description" focus-color="#5295CD" placeholder="课程描述" variant="outlined" :rules="(v) => !!v || '课程描述不能为空'" />
                        </div>
                        <div class="mb-5">
                            <var-input v-model="newCourse.link" textarea rows="4" focus-color="#5295CD" placeholder="课程链接" variant="outlined" :rules="(v) => !!v || '课程链接不能为空'" />
                        </div>
                        <div class="mt-auto px-[5vw] flex justify-center">
                            <var-button block outline text text-color="#5295CD" @click="createCourse">创建课程</var-button>
                        </div>
                    </div>
                </var-form>
            </var-loading>
        </var-popup>
    </div>
    <img src="@/assets/添加.svg" @click="showCreateCourse = true" class="fixed bottom-[2vw] right-[2vw] z-50 rounded-full" />
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'managerUser',
    data() {
        return {
            deleteLoading: false, // 删除课程加载状态
            recoverLoading: false, // 恢复课程加载状态
            listLoading: false, // 列表加载状态
            courseList: [], // 原始course: [],
            courseListByValid: [], // 根据 CourseValid 分组后的队伍列表
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示的记录数
            total: 0, // 总条数
            loading: false,
            createLoading: false, // 新增课程加载状态
            activeTab: 0, // 当前显示的 tab 状态
            showCenterPopup: false, // 操作弹窗
            showCreateCourse: false,
            showConfirm: false,
            newCourse: {
                name: '',
                type: '',
                description: '',
                link: ''
            },
            showRecoverConfirm: false, // 控制信息确认弹窗显示
            selectedRecord: {}, // 当前选中的记录
            courseInfo: {} // 用于临时存储修改后的队伍信息
        };
    },
    watch: {
        activeTab(newVal) {
            this.toggleTab(newVal);
        }
    },
    async mounted() {
        await this.getCourse();
    },
    computed: {
        pagedCourse() {
            // 计算当前页显示的课程
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.currentPage * this.pageSize;
            return this.courseListByValid.slice(startIndex, endIndex);
        }
    },
    methods: {
        // 切换显示正常和禁用的队伍
        toggleTab(tab) {
            const typeMap = [1, 0];
            const type = typeMap[tab];
            const courseListByValid = this.courseList.filter((course) => course.validFlag == type);
            this.courseListByValid = courseListByValid;
            this.total = courseListByValid.length; // 更新总条数
            this.currentPage = 1; // 切换tab时重置页码到第一页
        },
        // 管理员获取队伍信息
        async getCourse() {
            this.listLoading = true;
            const res = await this.$api.course.getAllCourseList();
            if (res.success) {
                this.courseList = res.data; // 提取数组字段
                this.toggleTab(this.activeTab); // 默认显示正常队伍
                this.listLoading = false;
            } else {
                this.courseList = [];
                this.total = 0;
                this.listLoading = false;
            }
        },
        // 管理员保存队伍信息
        async updateCourseInfo() {
            const changes = {};
            for (const key in this.courseInfo) {
                if (this.courseInfo[key] !== this.selectedRecord[key]) {
                    let updatedKey = key === 'courseName' ? 'name' : key;
                    changes[updatedKey] = this.courseInfo[key];
                }
            }
            changes.courseId = this.selectedRecord.id;
            this.loading = true;
            const res = await this.$api.course.updateCourse(changes);
            this.loading = false;
            if (res.success) {
                this.$api.notify.success('课程信息更新成功');
                this.showCenterPopup = false;
                this.getCourse(); // 刷新列表
            } else {
                this.$api.notify.error(res.error || '课程信息更新失败');
            }
        },
        // 删除课程操作
        async deleteCourse(action, done) {
            if (action === 'confirm') {
                this.deleteLoading = true;
                const res = await this.$api.course.updateCourse({
                    courseId: this.selectedRecord.id,
                    validFlag: 0
                });
                this.deleteLoading = false;
                if (res.success) {
                    this.$api.notify.success('删除课程成功');
                    this.showConfirm = false;
                    this.showCenterPopup = false;
                    this.getCourse();
                } else {
                    this.$api.notify.error(res.error || '删除课程失败');
                }
            }
            done();
        },
        // 恢复课程操作
        async recoverCourse(action, done) {
            if (action === 'confirm') {
                this.recoverLoading = true;
                const res = await this.$api.course.updateCourse({
                    courseId: this.selectedRecord.id,
                    validFlag: 1
                });
                this.recoverLoading = false;
                if (res.success) {
                    this.$api.notify.success('恢复课程成功');
                    this.showRecoverConfirm = false;
                    this.showCenterPopup = false;
                    this.getCourse();
                } else {
                    this.$api.notify.error(res.error || '恢复课程失败');
                }
            }
            done();
        },
        // 新增课程
        async createCourse() {
            const valid = await this.$refs.form.validate();
            if (valid) {
                this.createLoading = true;
                const res = await this.$api.course.createCourse(this.newCourse);
                this.createLoading = false;
                if (res.success) {
                    this.getCourse();
                    this.$api.notify.success('新增课程成功');
                    this.showCreateCourse = false;
                    this.newCourse = {
                        name: '',
                        type: '',
                        description: '',
                        link: ''
                    };
                } else {
                    this.$api.notify.error(res.error || '新增课程失败');
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
        // 查看课课程信息
        viewRecord(record) {
            this.selectedRecord = record;
            this.courseInfo = { ...record };
            this.showCenterPopup = true;
        },
        handlePageChange(page) {
            this.currentPage = page; // 更新当前页码
        }
    }
};
</script>

<style scoped></style>
