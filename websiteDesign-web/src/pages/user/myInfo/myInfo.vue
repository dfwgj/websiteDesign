<template>
    <div class="w-full h-full mx-auto py-6 lg:flex">
        <!-- 图标部分 -->
        <div class="lg:w-1/4 lg:max-h-[400px] lg:max-w-[256px]  mx-[5vw] lg:mt-5 lg:ml-16 lg:mr-2 flex lg:flex-col justify-center items-center">
            <div v-for="(icon, index) in icons" :key="index" class="w-full h-[8vh] border-2 border-[#5295CD] lg:p-2 lg:m-2 rounded-[10px] mx-[1vw] lg:rounded-[20px]" :class="{ 'bg-[#E8F3FF]': selectedType === icon.type }" @click="handleIconClick(icon.type)">
                <div class="w-full h-full flex flex-col lg:flex-row items-center justify-center">
                    <div class="flex items-center justify-center h-[60%] lg:h-[80%] lg:w-2/5 ">
                        <img :title="icon.type" :alt="icon.type" :src="icon.iconLink" class="w-[6vw] lg:w-2/5" />
                    </div>
                    <div class="h-[60%] lg:w-3/5 flex items-center justify-center">
                        <div class="text-[#5295CD] lg:text-[1.4rem] text-sm ">{{ icon.type }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页面部分 -->
        <div class="lg:w-3/4 h-full mx-[5%] mt-4 lg:mr-16 flex-col overflow-auto">
            <router-view></router-view>
        </div>
        <var-dialog title="确定要退出登录吗？" class="w-[80vw] lg:w-[40vw] rounded-[10px]" v-model:show="show"confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" @before-close="handleBeforeClose"  />
    </div>
</template>

<script>
import revise from '@/assets/revise.svg';
import team from '@/assets/team.svg';
import signup from '@/assets/signup.svg';
import leave from '@/assets/leave.svg';

export default {
    name: 'myInfo', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            icons: [
                {
                    type: '我的队伍',
                    iconLink: team,
                    route: '/myInfo/team'
                },
                {
                    type: '信息修改',
                    iconLink: revise,
                    route: '/myInfo/revise'
                },
                {
                    type: '比赛报名',
                    iconLink: signup,
                    route: '/myInfo/signup'
                },
                {
                    type: '退出登录',
                    iconLink: leave
                }
            ],
            selectedType: null,
            show: false
        };
    },
    computed: {}, // 定义计算属性
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {
        this.handleIconClick('我的队伍'); // 默认打开信息修改页面
    }, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        handleIconClick(type) {
            //点击图标切换页面
            this.selectedType = type;
            if (type === '退出登录') {
                this.show = true;
                return;
            }
            this.$router.push(this.icons.find((icon) => icon.type === type).route);
        },
        handleBeforeClose(action, done) {
            if (action === 'confirm') {
                localStorage.removeItem('token');
                this.$store.user.clearUserInfo();
                this.$router.push('/home');
            } else {
                this.selectedType ='我的队伍',
                this.$router.push(this.icons.find((icon) => icon.type === '我的队伍').route);
                done();
            }
        }
    } // 定义组件的方法
};
</script>

<style scoped></style>
