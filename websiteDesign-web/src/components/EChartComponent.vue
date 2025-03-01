<template>
    <div id="chart" style="width: 100%; height: 60vh;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    props: {
        chartData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            myChart: null,
            option: {
                title: {
                    text: '最近一周统计数据'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['访问量', '新增用户数', '新增队伍数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '访问量',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '新增用户数',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '新增队伍数',
                        type: 'line',
                        data: []
                    }
                ]
            }
        };
    },
    watch: {
        chartData: {
            handler(newData) {
                this.updateChart(newData);
            },
            immediate: true
        }
    },
    mounted() {
        this.myChart = echarts.init(this.$el);
        this.updateChart(this.chartData);
    },
    methods: {
        updateChart(data) {
            if (!this.myChart || !data.length) return;
            this.option.xAxis.data = data.map((item) => new Date(item.date).toLocaleDateString());
            this.option.series[0].data = data.map((item) => item.pageViews);
            this.option.series[1].data = data.map((item) => item.newUsers);
            this.option.series[2].data = data.map((item) => item.newTeams);
            this.myChart.setOption(this.option);
        }
    }
};
</script>
