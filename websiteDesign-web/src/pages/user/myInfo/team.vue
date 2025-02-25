<template>
    <div v-if="!team.teamName" class="w-full h-5/6 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70 flex items-center justify-center">
        <p class="hidden lg:block text-center mx-auto text-3xl text-[#5295CD]">还没报名比赛，请先报名比赛</p>
        <p class="lg:hidden text-center mx-auto text-2xl text-[#5295CD]">还没报名比赛<br />请先报名比赛</p>

    </div>
    <div v-else class="w-full h-5/6 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70">
        <!-- 队伍名称栏 -->
        <div class="h-1/6 w-full border-b-2 border-[#5295CD] flex justify-center items-center">
            <div class="w-1/2 h-full text-2xl lg:text-3xl flex items-center justify-center">
                {{ team.teamName }}
            </div>
            <div class="w-1/2 h-full text-xl lg:text-2xl text-[#5295CD] flex items-center justify-center">
                <div class="w-2/3 h-1/2 border-2 border-[#5295CD] bg-[#E8F3FF] rounded-[10px] flex items-center justify-center">
                    {{ team.model }}
                </div>
            </div>
        </div>
        <!-- 队伍成员栏 -->
        <div class="w-full h-[70px] flex items-center text-lg lg:text-xl ml-4 lg:ml-8">队伍成员：</div>
        <div v-for="(player, index) in team.players" :key="index" class="w-full flex justify-center items-center mb-2">
            <div class="w-full h-[8vh] flex justify-center items-center border-2 border-[#5295CD] rounded-[10px] mx-1 lg:mx-8">
                <div class="w-1/12 h-full flex justify-center items-center">
                    <img v-if="player.captain == '1'" class="pl-[5%]" :src="teamImg" />
                </div>
                <div class="w-3/12 h-full flex justify-center items-center">
                    <span class="text-sm lg:text-lg" style="color: black">{{ player.name }}</span>
                </div>
                <div class="w-3/12 h-full flex justify-center items-center">
                    <span class="text-sm lg:text-lg" style="color: black">{{ player.studentId }}</span>
                </div>
                <div class="w-5/12 h-full flex justify-center items-center">
                    <span class="text-sm lg:text-lg" style="color: black">{{ player.college }}</span>
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
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div>
                <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 1 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">报名成功</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div>
                <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 2 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">作品已提交</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div>
                <!-- 进程条 -->
                <div class="w-[80px] lg:w-full h-full text-xl border-2 border-[#5295CD] rounded-full lg:rounded-[10px] flex items-center justify-center">
                    <div class="process-step flex items-center relative" :class="{ 'opacity-50': teamState < 3 }">
                        <div class="w-[10px] lg:w-full h-full flex justify-center items-center">初赛</div>
                    </div>
                </div>
                <div class="w-[7%] border-t-2 border-[#5D9CD0] top-[50%] right-[10%]"></div>
                <!-- 进程条 -->
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
import teamImg from '@/assets/队伍.svg';
export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            team: [],
            teamImg: teamImg,
            teamState: null // 当前进程状态
        };
    },
    computed: {
        user() {
            return this.$store.user;
        }
    },
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {
        this.team = this.user.team;
        console.log(this.team);
    }, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {} // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
