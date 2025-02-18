<template>
    <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="w-2/3 max-w-sm lg:max-w-md border-[#5295CD] border-2 flex flex-col items-center justify-center mx-auto p-6 rounded-2xl shadow-lg mb-16">
            <h2 class="text-2xl font-bold mb-4 text-[#5295CD]">登录</h2>

            <form @submit.prevent="handleLogin" class="w-full">
                <div class="mb-4">
                    <input ref="myInput" type="text" id="studentId" v-model="studentId" placeholder="请输入学号" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <div class="mb-4">
                    <input type="password" id="password" v-model="password" placeholder="请输入密码" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <button type="submit" class="w-full py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-lg bg-[#E8F3FF]">登录</button>
            </form>
            <div class="mt-4 text-center cursor-pointer hover:underline text-[#8FBBDF]" @click="goRegister">暂无账号?请先注册</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            studentId: '', // 学号
            password: '' // 密码
        };
    },
    computed: {}, // 定义计算属性
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        async handleLogin() {
            // 登录
            const res = await this.$api.auth.login({ // 调用登录接口
                // 传递学号和密码给后端
                studentId: this.studentId,
                password: this.password
            });
            // 如果登录成功（同时返回token），跳转到课程资源页面
            if (res) {
                this.$router.push('/');
            }
        },
        // 跳转到注册页面
        goRegister() {
            this.$router.push('/register');
        }
    } // 定义组件的方法
};
</script>

<style scoped></style>
