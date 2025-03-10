<template>
    <div id="chart" style="width: 100%; height: 60vh"></div>
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
                    text: '统计数据'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
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
                        name: '',
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
            // 动态设置图表标题和系列名称
            const seriesName = Object.keys(data[0]).find((key) => key !== 'date');
            this.option.title.text = seriesName ? `最近一周 ${seriesName}` : '统计数据';
            this.option.legend.data = seriesName ? [seriesName] : [];

            // 更新数据
            this.option.xAxis.data = data.map((item) => new Date(item.date).toLocaleDateString());
            this.option.series[0].data = data.map((item) => item[seriesName]);

            this.myChart.setOption(this.option);
        }
    }
};
</script>
