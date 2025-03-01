<template>
    <div class="h-full w-full p-[2%]">
        <h1 class="text-2xl font-bold text-[#5295CD]">比赛信息管理</h1>
        <div class="border-2 border-[#5295CD] h-[90%] mt-[3vh] w-full rounded-2xl overflow-auto">
            <div class="grid grid-cols-4 gap-[2vw] p-[2%] ">
                <!-- 使用 grid 布局，每行四列 -->
                <div v-for="(contest, index) in contestList" :key="index" class="bg-white rounded-xl p-[2%]">
                    <div class="flex flex-col items-center justify-center h-[20vh]">
                        <div class="border-2 border-[#5295CD] rounded-xl flex flex-col items-center justify-center p-[5%] w-full h-[80%]">
                            <p class="text-xl font-bold text-[#5295CD]">{{ contest.name }}</p>
                            <p class="text-sm">创建时间：{{ formatDate(contest.createdAt) }}</p>
                        </div>
                        <var-button class="mt-[1vh]" v-if="contest.status == '0'" text outline type="success" @click="startContest(contest)">启动该比赛</var-button>
                        <var-button class="mt-[1vh]" v-if="contest.status == '1'" loading text outline loading-type="wave" type="info">该比赛进行中</var-button>
                    </div>
                </div>
            </div>
        </div>
        <var-dialog v-model:show="show" confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" width="25vw" @before-close="handleBeforeClose">
            <var-loading description="LOADING" :loading="loading" color="#5295CD">
                <template #title>确定要启动{{ this.selectContest.name }}吗？</template>
                <template #default>
                    <p>启动后，进行中的比赛将禁用</p>
                </template>
            </var-loading>
        </var-dialog>
        <img :src="plus" @click="showForm = true" class="fixed bottom-[4vw] right-[3vw] z-50 rounded-full" />
        <var-popup v-model:show="showForm" class="w-[60vw] h-[95vh] rounded-2xl flex flex-col items-center overflow-auto">
            <var-loading description="比赛创建中" :loading="contestLoading" color="#5295CD">
                <div class="flex flex-col  items-center w-full">
                    <p class="text-2xl mt-[2vh] font-bold text-[#5295CD]">创建比赛</p>
                    <div class="flex flex-col w-full p-[2%] h-[85vh]">
                        <p class="ml-[1vw] text-2xl font-bold">比赛基本信息</p>
                        <div class="grid grid-cols-2 gap-[2vw] p-[2%] w-full h-[100%]">
                            <var-input v-model="newContest.name" clearable focus-color="#5295CD" placeholder="请输入比赛名称" :rules="(v) => !!v || '比赛名称不能为空'" />
                            <var-input v-model="newContest.topic" clearable focus-color="#5295CD" placeholder="请输入比赛主题" :rules="(v) => !!v || '比赛主题不能为空'" />
                            <!-- 年份选择 -->
                            <var-select placeholder="请选择一个年份" v-model="newContest.year" focus-color="#5295CD">
                                <var-option v-for="(year, index) in years" :label="year" :value="year">
                                    {{ year }}
                                </var-option>
                            </var-select>
                            <var-input v-model="newContest.doubleKnots" focus-color="#5295CD" clearable placeholder="请输入双节全称" :rules="(v) => !!v || '双节全称不能为空'" />
                            <var-input v-model="newContest.organizers" focus-color="#5295CD" clearable placeholder="请输入主办方" :rules="(v) => !!v || '主办方不能为空'" />
                            <var-input v-model="newContest.contractors" focus-color="#5295CD" clearable placeholder="请输入承办方" :rules="(v) => !!v || '承办方不能为空'" />
                            <var-input variant="outlined" v-model="newContest.introduce" focus-color="#5295CD" clearable rows="8" textarea placeholder="请输入比赛简介" :rules="(v) => !!v || '比赛简介不能为空'" />
                            <div class="flex flex-col items-center w-full">
                                <p class="mt-[5vh] text-xl w-[80%]">创建完基础信息后，会自动跳转到比赛详情页，请补充完整比赛信息！</p>
                                <div class="mt-[10vh] grid grid-cols-2 w-full">
                                    <var-button class="mt-[1vh] mx-[1vw]" text outline text-color="#5295CD" @click="showForm = false">取消</var-button>
                                    <var-button class="mt-[1vh] mx-[1vw]" type="success" @click="createContest">创建比赛</var-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </var-loading>
        </var-popup>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import plus from '@/assets/添加.svg';
export default {
    data() {
        return {
            plus: plus,
            loading: false,
            contestLoading: false,
            contestList: [],
            selectContest: null,
            showForm: false,
            show: false,
            newContest: {
                name: '',
                topic: '',
                introduce: '',
                doubleKnots: '',
                organizers: '',
                contractors: '',
                year: ''
            },
            years: [] // 用于存储年份范围
        };
    },
    created() {
        // 动态生成年份范围（2025 到 2050）
        this.years = Array.from({ length: 26 }, (_, i) => String(2025 + i));
    },
    mounted() {
        this.getAllContest();
    },
    methods: {
        startContest(contest) {
            this.selectContest = contest;
            this.show = true;
        },
        formatDate(date) {
            return dayjs(date).format('YYYY年MM月DD日');
        },
        async createContest() {
            const keys = Object.keys(this.newContest);
            const errors = keys.map((key) => {
                if (!this.newContest[key]) {
                    return `${key} 不能为空`;
                }
                return null;
            });
            const filteredErrors = errors.filter((error) => error !== null);
            if (filteredErrors.length > 0) {
                this.$api.notify.error(filteredErrors.join('；'));
                return;
            }
            this.contestLoading = true;
            const res = await this.$api.contest.createContest(this.newContest);
            this.contestLoading = false;
            if (res.success) {
                this.$api.notify.success('比赛创建成功');
                this.showForm = false;
                this.getAllContest();   
            } else {
                this.$api.notify.error(res.error);
            }
        },
        async handleBeforeClose(action, done) {
            if (action === 'confirm') {
                this.loading = true;
                const res = await this.$api.contest.startContest({ id: this.selectContest.id });
                if (res.success) {
                    await this.getAllContest();
                    this.$api.notify.success('启动成功');
                    this.loading = false;
                    this.show = false;
                } else {
                    this.$api.notify.error(res.error);
                    this.loading = false;
                }
            }
            done();
        },
        async getAllContest() {
            const res = await this.$api.contest.getAllContest();
            if (res.success) {
                this.contestList = res.data;
            } else {
                this.$api.notify.error(res.error);
            }
        }
    }
};
</script>

<style scoped>
/* 自定义样式 */
</style>
