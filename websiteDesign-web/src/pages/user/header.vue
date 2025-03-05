<template>
    <!-- html代码 -->
    <LoadingSpinner />
    <div class="h-full w-full bg-[#FFFFFF]">
        <div class="hidden lg:block">
            <div class="w-full h-[10dvh] py-4 flex items-center">
                <p class="flex w-[25%] justify-center text-2xl xl:text-3xl font-black text-[#71A9D7]">{{ contest.name }}</p>
                <div class="flex-grow"></div>
                <p v-if="user.userRole == 1" class="flex w-[15%] justify-center text-lg text-[#71A9D7] border-2 border-[#5295CD]" @click="goManager">进入管理员后台</p>
                <p class="flex w-[8%] justify-center text-lg text-[#71A9D7]" @click="goHome">首页</p>
                <p class="flex w-[8%] justify-center text-lg text-[#71A9D7]" @click="goDetail">大赛详细</p>
                <p class="flex w-[8%] justify-center text-lg text-[#71A9D7]" @click="goResource">课程资料</p>
                <p v-if="user.userId" class="flex w-[8%] justify-center text-lg text-[#71A9D7]" @click="goMyInfo">我的</p>
                <p v-else class="flex w-[8%] justify-center text-lg text-[#71A9D7]" @click="goSignup">报名</p>
            </div>
        </div>
        <div class="lg:hidden">
            <div class="w-full h-[10dvh] py-4 flex items-center">
                <p class="flex w-[60%] justify-center text-xl sm:text-2xl font-black text-[#71A9D7]">{{ contest.name }}</p>
                <div class="flex-grow"></div>
                <Icon type="caidan" extraclass="icon" size="25" color="#71A9D7" class="flex w-[15%] justify-center" @click="right = true"></Icon>
            </div>
            <var-popup position="right" v-model:show="right" style="width: 60vw">
                <div class="px-1 mt-2">
                    <var-button outline text block text-color="#71A9D7" size="large" class="mt-2 mb-2" @click="goHome">首页</var-button>
                    <var-button outline text block text-color="#71A9D7" size="large" class="mt-2 mb-2" @click="goDetail">大赛详细</var-button>
                    <var-button outline text block text-color="#71A9D7" size="large" class="mt-2 mb-2" @click="goResource">课程资料</var-button>
                    <var-button outline text block text-color="#71A9D7" size="large" class="mt-2 mb-2" v-if="user.userId" @click="goMyInfo">我的</var-button>
                    <var-button outline text block text-color="#71A9D7" size="large" class="mt-2 mb-2" v-else @click="goSignup">报名</var-button>
                </div>
            </var-popup>
        </div>
        <div class="w-full h-[90dvh] bg-[#FFFFFF] overflow-auto">
            <router-view></router-view>
            <var-popup v-model:show="LoginShow" class="w-3/4 lg:w-1/3 rounded-2xl border-2 border-[#5295CD] lg:block">
                <Login @go-register="handleRegisterShow" @login-success="handleLoginSuccess" />
            </var-popup>
            <var-popup v-model:show="RegisterShow" class="w-3/4 lg:w-1/3 rounded-2xl border-2 border-[#5295CD] lg:block">
                <Register @go-login="handleLoginShow" />
            </var-popup>
        </div>
    </div>
</template>
<script>
import LoadingSpinner from '../../components/loadingSpinner.vue';
import Login from '../../components/login.vue';
import Register from '../../components/register.vue';
export default {
    name: 'Header', // 组件的名称
    components: {
        LoadingSpinner,
        Login,
        Register
    }, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            right: false,
            LoginShow: false,
            RegisterShow: false
        };
    },
    computed: {
        user() {
            return this.$store.user;
        },
        contest() {
            return this.$store.contest;
        }
    },
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        goManager() {
            this.$router.push('/manager');
        },
        goHome() {
            this.right = false;
            this.$router.push('/home');
        },
        goDetail() {
            this.right = false;
            this.$router.push('/detail');
        },
        goResource() {
            this.right = false;
            this.$router.push('/resource');
        },
        goMyInfo() {
            this.right = false;
            this.$router.push('/myInfo');
        },
        goSignup() {
            this.right = false;
            this.LoginShow = true;
        },
        handleRegisterShow() {
            // 登录弹窗隐藏，注册弹窗显示
            this.LoginShow = false;
            this.RegisterShow = true;
        },
        handleLoginShow() {
            // 注册弹窗隐藏，登录弹窗显示
            this.RegisterShow = false;
            this.LoginShow = true;
        },
        handleLoginSuccess() {
            // 登录成功后，关闭弹窗
            this.LoginShow = false;
        }
    }
};
</script>
<!-- css样式 -->
<style scoped></style>
