<template>
    <div class="w-full h-full bg-white p-[2%]">
        <var-loading description="LOADING" :loading="loading" color="#5295CD">
            <h1 class="text-2xl font-bold text-[#5295CD]">您好! 管理员{{ user.name }}</h1>
            <div class="grid grid-cols-3 gap-[2vw] my-[2vh]">
                <var-card class="border-2 border-[#5295CD] p-[5%] bg-white">
                    <h2 class="text-xl font-semibold text-[#0B0808]">今日访问量</h2>
                    <p class="text-2xl text-[#0B0808]">{{ statisticsData[statisticsData.length - 1]?.pageViews }}</p>
                    <p class="text-[#0B0808]">总数：{{ totals.totalPageViews }}</p>
                </var-card>
                <var-card class="border-2 border-[#5295CD] p-[5%] bg-white">
                    <h2 class="text-xl font-semibold text-[#0B0808]">今日新增用户数</h2>
                    <p class="text-2xl text-[#0B0808]">{{ statisticsData[statisticsData.length - 1]?.newUsers }}</p>
                    <p class="text-[#0B0808]">总数：{{ totals.totalUsers }}</p>
                </var-card>
                <var-card class="border-2 border-[#5295CD] p-[5%] bg-white">
                    <h2 class="text-xl font-semibold text-[#0B0808]">今日新增队伍数</h2>
                    <p class="text-2xl text-[#0B0808]">{{ statisticsData[statisticsData.length - 1]?.newTeams }}</p>
                    <p class="text-[#0B0808]">总数：{{ totals.totalTeams }}</p>
                </var-card>
            </div>
            <!-- 图表组件 -->
            <EChartComponent :chart-data="statisticsData"></EChartComponent>
        </var-loading>
    </div>
</template>

<script>
import EChartComponent from '../../components/EChartComponent.vue';
import dayjs from 'dayjs';
export default {
    components: {
        EChartComponent
    },
    data() {
        return {
            statisticsData: [],
            loading: false,
            totals: {
                totalUsers: 0,
                totalTeams: 0,
                totalPageViews: 0
            },
            endDate: '',
            startDate: '',
            timer: null // 用于存储 setInterval 的句柄
        };
    },
    computed: {
        user() {
            return this.$store.user;
        }
    },
    mounted() {
        // 初始化日期
        const today = dayjs(); // 使用 dayjs 获取当前日期
        this.endDate = today.format('YYYY-MM-DD'); // 格式化为 YYYY-MM-DD
        this.startDate = today.subtract(6, 'day').format('YYYY-MM-DD'); // 获取一周前的日期
        // 首次获取数据
        this.getStatistics();
        // 开启 10 秒轮询
        this.timer = setInterval(() => {
            this.getStatistics(); // 每 10 秒调用一次
        }, 10000); // 10000 毫秒 = 10 秒
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        async getStatistics() {
            this.loading = true;
            const res = await this.$api.statistics.getStatistics({
                startDate: this.startDate,
                endDate: this.endDate
            });
            if (res.success) {
                this.statisticsData = res.data.data;
                this.totals = res.data.totals;
            } else {
                this.$notify.error(res.error);
            }
            this.loading = false;
        }
    }
};
</script>