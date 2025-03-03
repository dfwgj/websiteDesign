<template>
    <div class="h-full w-full p-[2%]">
        <h1 class="text-2xl font-bold text-[#5295CD]">比赛信息管理</h1>
        <div class="border-2 border-[#5295CD] h-[90%] mt-[3vh] w-full rounded-2xl overflow-auto">
            <div class="grid grid-cols-4 gap-[2vw] p-[2%]">
                <!-- 使用 grid 布局，每行四列 -->
                <div v-for="(contest, index) in contestList" :key="index" class="bg-white rounded-xl p-[2%]">
                    <div class="flex flex-col items-center justify-center h-[20vh]">
                        <div class="border-2 border-[#5295CD] rounded-xl flex flex-col items-center justify-center p-[5%] w-full h-[80%]" @click="contestDetail(contest.id)">
                            <p class="text-xl font-bold text-[#5295CD]">{{ contest.name }}</p>
                            <p class="text-sm">创建时间：{{ formatDate(contest.createdAt) }}</p>
                        </div>
                        <var-button class="mt-[1vh]" v-if="contest.status == '0'" text outline type="success" @click="startContest(contest)">启动该比赛</var-button>
                        <div class="flex flex-row items-center justify-center mt-[1vh]">
                            <var-button class="w-[60%] mx-[10%]" v-if="contest.status == '1'" loading text outline loading-type="wave" type="info">该比赛进行中</var-button>
                            <img class="w-[20%] h-full" v-if="contest.status == '1'" src="@/assets/重新上传.svg" @click="startContest(contest)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <var-dialog v-model:show="show" confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" width="25vw" @before-close="handleBeforeClose">
            <var-loading description="LOADING" :loading="loading" color="#5295CD">
                <template #title>确定要启动{{ this.selectContest.name }}吗？</template>
                <template #default>
                    <p v-if="this.selectContest.status == '0' ">启动后，进行中的比赛将禁用</p>
                    <p v-if="this.selectContest.status == '1' ">重新启动该比赛</p>
                </template>
            </var-loading>
        </var-dialog>
        <var-dialog v-model:show="showCreateContest" confirm-button-text-color="green" persistent cancel-button-text-color="#5295CD" width="25vw" @confirm="createContest">
            <template #title>即将跳转到创建比赛页面</template>
        </var-dialog>
        <img :src="plus" @click="showCreateContest = true" class="fixed bottom-[4vw] right-[3vw] z-50 rounded-full" />
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
            showCreateContest: false,
            show: false
        };
    },
    created() {},
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
        createContest() {
            this.$router.push('/manager/createContest');
        },
        contestDetail(id) {
            this.$router.push({ name: 'contestDetail', query: { id: id } });
        },
        async handleBeforeClose(action, done) {
            if (action === 'confirm') {
                this.loading = true;
                const res = await this.$api.contest.startContest({ id: this.selectContest.id });
                if (res.success) {
                    await this.getAllContest();
                    await this.$store.contest.getContest();
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
