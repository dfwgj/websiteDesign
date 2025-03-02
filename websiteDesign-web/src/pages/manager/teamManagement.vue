<template>
    <div class="bg-gray-100 flex-1">
        <!-- 右侧内容区域 -->
        <div class="flex-1 p-4">
            <!-- 标题 -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-3xl text-[#5295CD]">队伍管理</h2>
            </div>
            <!-- 历史记录表格 -->
            <div class="bg-white p-4 rounded-lg shadow-md mx-auto">
                <var-tabs indicator-color="#5295CD" active-color="#5295CD" v-model:active="activeTab">
                    <!-- 点击切换显示正常和禁用的队伍，正常为1，禁用为0 -->
                    <var-tab @click="toggleTab(1)">正常</var-tab>
                    <var-tab @click="toggleTab(0)">禁用</var-tab>
                </var-tabs>
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">队伍名称</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">队长</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">大赛分组</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">比赛进程</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">注册时间</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">查看队伍成员</th>
                            <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="teamListByValid.length === 0">
                            <td colspan="6" class="px-6 py-1.4 text-center text-base text-gray-500">暂无数据</td>
                        </tr>
                        <tr v-for="(record, index) in teamListByValid" :key="index" class="odd:bg-white even:bg-gray-50"
                            v-hover="{ color: 'var(--color-on-primary)', background: '#F0F0F0' }">
                            <!-- 队伍名称 -->
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ record.teamName }}</td>
                            <!-- 队长 -->
                            <td class="px-6 py-1 text-center text-base text-gray-900">{{ record.userName }}</td>
                            <!-- 大赛分组 -->
                            <td class="px-6 py-1 text-center text-base text-gray-900">
                                <span v-if="record.model === '网站开发组'" class="text-blue-500">网站开发组</span>
                                <span v-if="record.model === '网页设计组'" class="text-orange-500">网页设计组</span>
                            </td>
                            <!-- 比赛进程 -->
                            <td class="px-6 py-1 text-center text-base text-gray-900">
                                <span v-if="record.teamState === '0'" class="text-red-500">信息审核中</span>
                                <span v-if="record.teamState === '1'" class="text-green-500">报名成功</span>
                                <span v-if="record.teamState === '2'" class="text-[#5D9CD0]">作品已提交</span>
                                <span v-if="record.teamState === '3'" class="text-[#5295CD]">初赛</span>
                                <span v-if="record.teamState === '4'" class="text-blue-500">决赛</span>
                            </td>
                            <!-- 注册时间 -->
                            <td class="px-6 py-1 text-center text-base text-gray-500">{{ formatDate(record.teamCreated)
                            }}</td>
                            <!-- 查看队伍成员 -->
                            <!-- text-center 使表格内容在单元格中居中显示 -->
                            <td class="px-6 py-1 text-center text-base text-blue-500 hover:text-blue-800">
                                <!-- inline-block 将块元素 var-button 转换为行内块元素，可以使其在同一行显示 -->
                                <var-button class="inline-block w-35" color="#5295CD" text-color="white"
                                    @click="viewMembers(record)" style="border-radius: 8px">查 看</var-button>
                            </td>
                            <!-- 操作 -->
                            <td class="px-6 py-1 text-center text-base text-blue-500 hover:text-blue-800">
                                <var-button class="inline-block w-35" color="#5295CD" text-color="white"
                                    @click="viewRecord(record)" style="border-radius: 8px">操 作</var-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页组件 -->
                <div class="flex justify-center mt-6">
                    <var-pagination :current="currentPage" :total="total" :size-option="[10]" :simple="true"
                        @change="handlePageChange" style="color: #5295cd" />
                </div>
            </div>
        </div>
        <!-- 删除信息确认弹窗 -->
        <var-dialog v-model:show="showConfirm" title="删除提示" confirm-button-text-color="red" persistent
            cancel-button-text-color="#5295CD" width="35vw" @before-close="deleteUser">
            <var-loading description="LOADING" color="red" :loading="deleteLoading">
                <div class="p-4">
                    <p class="text-lg text-gray-900">确认删除此队伍？请谨慎操作！</p>
                </div>
            </var-loading>
        </var-dialog>
        <!-- 操作面板弹窗 -->
        <var-popup v-model:show="showCenterPopup">
            <var-loading description="LOADING" color="#5295CD" :loading="loading">
                <div class="p-10 w-[500px] h-[550px] bg-white shadow-lg">
                    <!-- 弹窗内容 -->
                    <h3 class="text-xl mt-1 mb-10">{{ TeamInfo.teamName }}的队伍信息</h3>
                    <div class="grid grid-cols-5 gap-8">
                        <!--左边列-->
                    </div>
                    <!--队伍名称-->
                    <div class="mb-5">
                        <var-input label="队伍名称" focus-color="#5295CD" v-model="TeamInfo.teamName" placeholder="队伍名称"
                            variant="outlined" />
                    </div>
                    <!--作品名称-->
                    <div class="mb-5">
                        <var-input label="作品名称" v-model="TeamInfo.opusName" focus-color="#5295CD" placeholder="作品名称"
                            variant="outlined" />
                    </div>
                    <!--右边-->
                    <div>
                        <!-- 主题方向 -->
                        <div class="mb-5">
                            <var-space direction="column" size="large" class="w-full rounded-xl">
                                <var-select v-model="TeamInfo.direction" variant="outlined" placeholder="主题方向"
                                    size="large" focus-color="#5295CD"
                                    class="w-full text-center bg-white text-black rounded-xl">
                                    <var-option label="红色文化" value="HSWH" />
                                    <var-option label="校园风采" value="XYFC" />
                                    <var-option label="人工智能" value="RGZN" />
                                    <var-option label="健康医疗" value="JKYL" />
                                </var-select>
                            </var-space>
                        </div>
                        <!-- 比赛进程 -->
                        <div class="mb-14">
                            <var-space direction="column" size="large" class="w-full rounded-xl">
                                <var-select v-model="TeamInfo.teamState" variant="outlined" placeholder="比赛进程"
                                    size="large" focus-color="#5295CD"
                                    class="w-full text-center bg-white text-black rounded-xl">
                                    <var-option label="信息审核中" value="0" />
                                    <var-option label="报名成功" value="1" />
                                    <var-option label="作品已提交" value="2" />
                                    <var-option label="初赛" value="3" />
                                    <var-option label="决赛" value="4" />
                                </var-select>
                            </var-space>
                        </div>
                    </div>
                    <!-- 按钮容器 -->
                    <div class="mt-auto flex justify-center">
                        <var-space :size="[10, 30]">
                            <var-button v-if="selectedRecord.teamVaild === '1'" type="danger"
                                @click="showConfirm = true">删除队伍</var-button>
                            <var-button block color="#5295CD" text-color="white"
                                @click="updateTeamInfo">保存修改</var-button>
                        </var-space>
                    </div>
                </div>
            </var-loading>
        </var-popup>
        <!-- 队伍成员弹窗 -->
        <var-popup v-model:show="showMemberPopup">
            <var-loading description="LOADING" color="#5295CD" :loading="loading">
                <div class="p-10 w-[700px] h-[370px] bg-white shadow-lg">
                    <!-- 弹窗内容 -->
                    <h3 class="text-xl mb-5">{{ TeamInfo.teamName }} 的队伍成员</h3>
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">成员姓名</th>
                                <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">成员学号</th>
                                <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">学院</th>
                                <th class="px-6 py-2 bg-gray-50 text-center text-xl text-[#5295CD]">设为队长</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(member, index) in members" :key="index">
                                <td class="px-6 py-1 text-center text-base text-gray-900">{{ member.name }}</td>
                                <td class="px-6 py-1 text-center text-base text-gray-500">{{ member.studentId }}</td>
                                <td class="px-6 py-1 text-center text-base text-gray-500">{{ member.college }}</td>
                                <td class="px-6 py-1 text-center text-base text-gray-500"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </var-loading>
        </var-popup>
        <var-snackbar v-model:show="showMessage" :type="messageType">{{ messageContent }}</var-snackbar>
    </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'managerUser',
    data() {
        return {
            teamList: [], // 原始队伍列表
            teamListByValid: [], // 根据 teamValid 分组后的队伍列表
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示的记录数
            total: 0, // 总条数
            loading: false,
            activeTab: 0, // 当前显示的 tab 状态
            // (1 显示正常，0 显示禁用,但是逻辑出现错误，两者互换，此处为了默认情况显示正常队伍，只能出此下策)
            showCenterPopup: false, // 操作弹窗
            showConfirm: false,
            showMemberPopup: false, // 查看队伍成员弹窗
            showRecoverConfirm: false, // 控制信息确认弹窗显示
            selectedRecord: {}, // 当前选中的记录
            TeamInfo: {}, // 用于临时存储修改后的队伍信息
            showMessage: false,
            members: [], // 队伍成员列表
        };
    },
    async mounted() {
        await this.getTeam();
        this.toggleTab(1); // 默认显示正常队伍
    },
    computed: {},
    methods: {
        // 切换显示正常和禁用的队伍
        toggleTab(tab) {
            // 方法 toggleTab 接收一个参数 tab，用于切换正常和禁用队伍
            // 根据 teamValid 字段筛选队伍
            // filter() 方法遍历原数组 teamList，筛选并分类出目标数据，存入 tab 中，并返回到新数组 teamListByValid
            // tab 为 1 显示为正常，tab 为 0 显示为禁用
            this.teamListByValid = this.teamList.filter((team) => team.teamVaild == tab);
            this.tab = tab; // 更新当前 tab 状态
        },
        // 管理员获取队伍信息
        async getTeam() {
            const res = await this.$api.team.getTeam();
            if (res.success) {
                this.teamList = res.data; // 提取数组字段
                this.total = res.data.length; // 更新总记录数
                this.toggleTab(this.tab); // 默认显示正常队伍
            } else {
                this.teamList = [];
                this.total = 0;
            }
        },
        // 管理员获取队伍成员信息
        async getTeamPlayers() {
            const res = await this.$api.team.getTeamPlayers({ teamId: this.selectedRecord.id });
            if (res.success) {
                this.members = res.data; // 提取数组字段
            } else {
                this.members = [];
            }
        },
        // 管理员保存队伍信息
        async updateTeamInfo() {
            const changes = {};
            for (const key in this.TeamInfo) {
                if (this.TeamInfo[key] !== this.selectedRecord[key]) {
                    let updatedKey = key === 'teamName' ? 'name' : key;
                    if (key === 'teamState') {
                        updatedKey = 'stateFlag';
                    }
                    changes[updatedKey] = this.TeamInfo[key];
                }
            }
            changes.teamId = this.selectedRecord.id;
            this.loading = true;
            const res = await this.$api.team.updateTeamInfo(changes);
            this.loading = false;
            if (res.success) {
                this.message('success', '已保存');
                this.showCenterPopup = false;
                this.getTeam(); // 刷新队伍列表
                this.getTeamPlayers(); // 刷新队伍成员列表
            } else {
                this.message('error', res.error || '队伍信息更新失败');
            }
        },
        // 删除队伍操作
        async deleteUser(action, done) {
            if (action === 'confirm') {
                this.deleteLoading = true;
                const res = await this.$api.team.delTeam({
                    teamId: this.selectedRecord.id
                });
                this.deleteLoading = false;
                if (res.success) {
                    this.message('success', '此队伍删除成功');
                    this.showConfirm = false;
                    this.showCenterPopup = false;
                    await this.getTeam();
                } else {
                    this.message('error', res.error || '删除队伍失败');
                }
            }
            done();
        },
        // 日期变正常
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        },
        message(type, content) {
            this.messageType = type;
            this.messageContent = content;
            this.showMessage = true;
        },
        // 查看队伍信息
        viewRecord(record) {
            this.selectedRecord = record;
            this.TeamInfo = { ...record };
            this.showCenterPopup = true;
        },
        // 查看队伍成员
        viewMembers(record) {
            this.selectedRecord = record;
            this.showMemberPopup = true; // 显示弹窗
            this.TeamInfo = { ...record }; // 显示当前队伍信息(目的为同步队伍名称)
            this.getTeamPlayers(); // 当点击查看队伍成员时，请求队伍成员信息
        },
        // 处理分页变化
        handlePageChange(page) {
            if (page === this.currentPage) {
                return;
            }
            this.currentPage = page;
            this.getTeam();
        }
    }
};
</script>

<style scoped></style>
