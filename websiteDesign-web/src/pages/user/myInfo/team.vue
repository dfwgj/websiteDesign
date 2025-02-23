<template>
    <div class="w-full h-5/6 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70">
        <!-- 队伍名称栏 -->
        <div class="h-1/6 w-full border-b-2 border-[#5295CD] flex justify-center items-center ">
            <div class="w-1/2 h-full text-2xl lg:text-3xl flex items-center justify-center">
                {{ teamName }}
            </div>
            <div class="w-1/2 h-full text-xl lg:text-2xl text-[#5295CD] flex items-center justify-center">
                <div
                    class="w-2/3 h-1/2 border-2 border-[#5295CD] bg-[#E8F3FF] rounded-[10px] flex items-center justify-center">
                    {{ teamType }}
                </div>
            </div>
        </div>
        <!-- 队伍成员栏 -->
        <div class="w-full h-[70px] flex items-center text-lg lg:text-xl ml-4 lg:ml-8">队伍成员：</div>
        <div v-for="(team, index) in teamByType" :key="index" class="w-full flex justify-center items-center mb-2">
            <div
                class="w-full h-[60px] flex justify-center items-center border-2 border-[#5295CD] rounded-[10px] ml-2 mr-2 lg:ml-8 lg:mr-8">
                <div class="w-1/5 h-full flex justify-center items-center">
                    <span class="lg:text-lg" style="color: black">{{ team.name }}</span>
                </div>
                <div class="w-2/5 h-full flex justify-center items-center">
                    <span class="lg:text-lg" style="color: black">{{ team.studentId }}</span>
                </div>
                <div class="w-2/5 h-full flex justify-center items-center">
                    <span class="lg:text-lg" style="color: black">{{ team.college }}</span>
                </div>
            </div>
        </div>
        <!-- 队伍流程栏 -->
        <div class="w-full h-[70px] flex items-center text-lg lg:text-xl ml-4 lg:ml-8">队伍流程：</div>
        <div class="h-[160px] lg:h-[8%] flex justify-center items-center">
            <div class="w-[90%] h-full flex justify-center items-center relative">
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 0 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">信息审核中</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div> <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 1 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">报名成功</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div> <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 2 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">作品已提交</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div> <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 3 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">初赛</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div> <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 4 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">决赛</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() { // 定义组件的响应式数据
        return {
            teamName: 'Ave mujica队',
            teamType: '网站开发组',
            teamByType: [
                {
                    name: '后藤独',
                    studentId: '24209010028',
                    college: '生物医学工程学院',
                },
                {
                    name: '山田凉',
                    studentId: '24209010028',
                    college: '生物医学工程学院',
                },
                {
                    name: '丰川祥子',
                    studentId: '24209010028',
                    college: '生物医学工程学院',
                },
            ],
            teamState: null, // 当前进程状态
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {}, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>