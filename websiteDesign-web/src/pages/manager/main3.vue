<template>
    <div class="ml-12 bg-white rounded-lg"> <!-- 添加左边距、边框、内边距、白色背景和圆角 -->
        <div class="h-8"></div>
        <h1 class="text-2xl font-bold text-[#5295CD]">比赛信息管理</h1>
        <div class="h-10"></div>
    </div>

    
    <div class="border-[2px] border-[#5295CD] rounded-lg ml-12 mr-20 h-[500px]">
        <div class="flex space-x-4"> <!-- 使用flex布局，并在子元素间添加间距 -->
            <!-- 第十四届网站设计大赛 -->
            <div class="p-4  bg-white rounded-lg border-[2px] border-[#5295CD] ml-3 mt-3">
                <div class="space-y-2">
                    <h1>第十四届网站设计大赛</h1>
                    <div :class="[
                        'inline-block px-3 py-1 rounded-full text-sm cursor-pointer',
                        status14th === '已启用' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
                    ]" @click="toggleStatus('14th')">
                        {{ status14th }}
                    </div>
                </div>
            </div>

            <!-- 第十三届网站设计大赛 -->
            <div class="p-4   bg-white rounded-lg border-[2px] border-[#5295CD] ml-3 mt-3">
                <div class="space-y-2">
                    <h2>第十三届网站设计大赛</h2>
                    <div :class="[
                        'inline-block px-3 py-1 rounded-full text-sm cursor-pointer',
                        status13th === '已启用' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
                    ]" @click="toggleStatus('13th')">
                        {{ status13th }}
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed bottom-20 right-20">
        <button class="bg-white  py-5 px-5 rounded-full border-[3px] border-[#5295CD] mr-3 "  @click="run('three2')">
        </button>
    </div>
    </div>
    </template>
<script>
export default {
    name: 'AdminDashboard',
    data() {
        return {
            status14th: '已启用', // 第十四届的初始状态
            status13th: '已禁用', // 第十三届的初始状态
        };
    },
    methods: {
        toggleStatus(contest) {
            if (contest === '14th') {
                this.status14th = this.status14th === '已启用' ? '已禁用' : '已启用';
            } else if (contest === '13th') {
                this.status13th = this.status13th === '已启用' ? '已禁用' : '已启用';
            }
        },
        run(page) {
            switch (page) {
                case 'three2':
                    this.$router.push({ name: 'three2' });
                    break;         
            }
        },
    },
};
</script>
<!-- css样式 -->
<style scoped></style>