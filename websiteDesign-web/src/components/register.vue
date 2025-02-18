<template>
    <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="w-2/3 max-w-sm lg:max-w-md border-[#5295CD] border-2 flex flex-col items-center justify-center mx-auto p-6 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold mb-4 text-[#5295CD]">注册</h2>

            <form @submit.prevent="handleRegister" class="w-full">
                <div class="mb-4">
                    <input type="text" id="studentId" v-model="studentId" placeholder="请输入学号" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" @input="calculateGrade" />
                </div>
                <div class="mb-4">
                    <input type="text" id="grade" v-model="grade" placeholder="请输入年级" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <div class="mb-4">
                    <input ref="myInput" type="text" id="name" v-model="name" placeholder="请输入真实姓名" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <div class="mb-4">
                    <input type="password" id="password" v-model="password" placeholder="请输入密码" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <!-- 选择学院 -->
                <var-space direction="column" size="large" class="pb-4 rounded-xl">
                    <var-select v-model="college" clearable variant="outlined" size="small" focus-color="#8FBBDF" blur-color="#8FBBDF" class="w-full text-center bg-white text-black rounded-xl">
                        <var-option label="生物医学工程学院" />
                        <var-option label="第一临床医学院" />
                    </var-select>
                </var-space>

                <div class="mb-4">
                    <input ref="myInput" type="text" id="major" v-model="major" placeholder="请输入专业" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <div class="mb-4">
                    <input ref="myInput" type="text" id="phone" v-model="phone" placeholder="请输入手机号" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>
                <div class="mb-4">
                    <input ref="myInput" type="text" id="email" v-model="email" placeholder="请输入邮箱" required class="w-full p-2 rounded-md text-center border-[#8FBBDF] border bg-white text-black" />
                </div>

                <button type="submit" class="w-full py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-lg bg-[#E8F3FF]">注册</button>
            </form>
            <div class="mt-4 text-center cursor-pointer hover:underline text-[#8FBBDF]" @click="goLogin">已有账号?请登录</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            studentId: '', // 学号
            grade: '', // 年级
            name: '', // 真实姓名
            password: '', // 密码
            major: '', // 专业
            phone: '', // 手机号
            email: '', // 邮箱
            college: '' // 选择学院
        };
    },
    computed: {}, // 定义计算属性
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        // 通过学号计算年级
        calculateGrade() {
            const prefix = this.studentId.substring(0, 2); // 获取学号的前两位
            this.grade = '20' + prefix;
        },
        async handleRegister() {
            // 注册
            const res = await this.$api.auth.register({ // 调用注册接口
                // 传递注册信息给后端
                studentId: this.studentId,
                grade: this.grade,
                name: this.name,
                password: this.password,
                major: this.major,
                phone: this.phone,
                email: this.email,
                college: this.college,
            });
            // 如果注册成功，弹出提示框，并跳转到登录页面
            if (res) {
                this.$api.notify.success('注册成功，请登录');
                this.$router.push('/login');
            }
        },
        // 跳转到登录页面
        goLogin() {
            this.$router.push('/login');
        }
    } // 定义组件的方法
};
</script>

<style scoped></style>
