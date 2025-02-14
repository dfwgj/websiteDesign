<template>
    <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="w-2/3 max-w-sm border-[#5295CD] border-2 flex flex-col items-center justify-center mx-auto p-6 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold mb-4 text-[#5295CD]">{{ isLogin ? '登录' : '注册' }}</h2>

            <div v-if="isLogin">
                <form @submit.prevent="handleLogin" class="w-full">
                    <div class="mb-4">
                        <input ref="myInput" type="text" id="userId" v-model="userId" placeholder="请输入学号" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <div class="mb-4">
                        <input type="password" id="password" v-model="password" placeholder="请输入密码" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <button type="submit"
                        class="w-full py-2 rounded-full font-bold border-[#5295CD] border-2 text-[#5295CD] text-lg bg-[#E8F3FF]">登录</button>
                </form>
                <div class="mt-4 text-center cursor-pointer hover:underline text-[#8FBBDF]" @click="changeForm">暂无账号?请先注册</div>
            </div>

            <div v-else>
                <form @submit.prevent="handleRegister" class="w-full">
                    <div class="mb-4">
                        <input type="text" id="userId" v-model="userId" placeholder="请输入学号" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <div class="mb-4">
                        <input ref="myInput" type="text" id="username" v-model="username" placeholder="请输入真实姓名" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <div class="mb-4">
                        <input type="password" id="password" v-model="password" placeholder="请输入密码" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <div class="mb-4">
                        <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="请确认密码"
                            required class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <!-- 选择学院 -->
                    <var-space direction="column" size="large" class="pb-4">
                        <var-select placeholder="请输入学院" v-model="college" required class="w-full p-2 pb-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white">
                            <var-option label="生物医学工程学院" />
                            <var-option label="第一临床医学院" />
                        </var-select>
                    </var-space>

                    <div class="mb-4">
                        <input ref="myInput" type="text" id="major" v-model="major" placeholder="请输入专业" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <div class="mb-4">
                        <input ref="myInput" type="text" id="phone" v-model="phone" placeholder="请输入手机号" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>
                    <div class="mb-4">
                        <input ref="myInput" type="text" id="email" v-model="email" placeholder="请输入邮箱" required
                            class="w-full p-2 rounded-xl text-center border-[#8FBBDF] border-2 bg-white" />
                    </div>

                    <button type="submit"
                        class="w-full py-2 rounded-full font-bold border-[#5295CD] border-2 text-[#5295CD] text-lg bg-[#E8F3FF]">注册</button>
                </form>
                <div class="mt-4 text-center cursor-pointer hover:underline text-[#8FBBDF]" @click="changeForm">已有账号?请登录</div>
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
            isLogin: true, // 控制登录和注册表单的显示
            userId: '', // 学号
            username: '', // 真实姓名
            password: '', // 密码
            confirmPassword: '', // 确认密码
            major: '', // 专业
            phone: '', // 手机号
            email: '', // 邮箱
            college: '', // 选择学院
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {
        changeForm() { // 切换登录和注册表单的显示
            this.isLogin = !this.isLogin;
        },
        handleLogin() { // 登录
            alert('登陆成功！');
        },
        handleRegister() { // 注册
            if (this.password !== this.confirmPassword) {
                alert('密码不一致！');
                return;
            }
            alert('注册成功！');
            this.isLogin = true;
        },
    }, // 定义组件的方法
};
</script>

<style scoped></style>