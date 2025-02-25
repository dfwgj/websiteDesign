<template>
    <var-loading description="LOADING" :loading="loading" color="#5295CD">
        <div class="flex flex-col items-center justify-center w-full h-full max-w-sm lg:max-w-md border-[#5295CD] mx-auto p-6 rounded-2xl">
            <h2 class="text-2xl font-bold mb-4 text-[#5295CD]">登录</h2>
            <div class="mb-4 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="studentId" clearable placeholder="请输入学号":rules="[(v) => !!v || '学号不能为空', (v) => /^\d{11}$/.test(v.trim()) || '学号格式不正确']" />
            </div>
            <div class="mb-4 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" type="password" v-model="password" clearable placeholder="请输入密码" :rules="[(v) => !!v || '密码不能为空', (v) => /^[A-Za-z0-9]{6,16}$/.test(v) || '密码只能为6到16位的数字、字母组成']" />
            </div>
            <button class="w-full py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-lg bg-[#E8F3FF] "@click="handleLogin">登录</button>
            <div class="mt-4 text-center cursor-pointer hover:underline text-[#8FBBDF]" @click="goRegister">暂无账号?请先注册</div>
        </div>
    </var-loading>
</template>
<script>
export default {
    name: 'Login', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            studentId: '', // 学号
            password: '', // 密码
            loading: false // 控制loading的显示
        };
    },
    computed: {}, // 定义计算属性
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        async handleLogin() {
            // 登录
            if (!this.studentId || !this.password) {
                this.$api.notify.error('学号或密码不能为空');
                return;
            }
            if (!this.validate(this.studentId, /^\d{11}$/) || !this.validate(this.password, /^[A-Za-z0-9]{6,16}$/)) {
                this.$api.notify.error('学号或密码格式不正确');
                return;
            }
            this.loading = true;
            const res = await this.$api.auth.login({
                studentId: this.studentId,
                password: this.password
            });
            this.loading = false;
            if (res.success) {
                localStorage.setItem('token', res.data); // 保存token到本地存储
                this.$store.user.clearUserInfo();
                this.$store.user.decodeToken();
                this.$emit('login-success');
                this.$api.notify.success('登录成功');
            } else {
                this.$api.notify.error(res.error); // 修正错误信息的访问路径
            }
        },
        // 跳转到注册页面
        goRegister() {
            // 触发自定义事件
            this.$emit('go-register');
        },
        validate(value, regex) {
            return typeof value === 'string' && new RegExp(regex).test(value.trim());
        }
    } // 定义组件的方法
};
</script>

<style scoped></style>
