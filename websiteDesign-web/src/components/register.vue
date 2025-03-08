<template>
    <var-loading description="LOADING" :loading="loading" color="#5295CD">
        <div class="flex flex-col items-center justify-center w-full h-full max-w-sm lg:max-w-md mx-auto p-6 rounded-2xl">
            <h2 class="text-2xl font-bold mb-3 text-[#5295CD]">注册</h2>

            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="studentId" clearable placeholder="请输入学号" @input="calculateGrade" :rules="[(v) => !!v || '学号不能为空', (v) => /^\d{11}$/.test(v.trim()) || '学号格式不正确']" />
            </div>
            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="grade" placeholder="请输入年级" />
            </div>
            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="name" clearable placeholder="请输入真实姓名" :rules="[(v) => !!v || '姓名不能为空', (v) => /^[\u4e00-\u9fa5]{2,16}$/.test(v) || '姓名格式不正确']" />
            </div>
            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" type="password" v-model="password" clearable placeholder="请输入密码" :rules="[(v) => !!v || '密码不能为空', (v) => /^[A-Za-z0-9]{6,16}$/.test(v) || '密码只能为6到16位的数字、字母组成']" />
            </div>
            <var-space direction="column" size="small" class="pb-2 w-full rounded-xl">
                <var-select v-model="college" clearable variant="outlined" placeholder="请选择学院" size="small" focus-color="#5295CD" class="w-full text-center bg-white text-black rounded-xl">
                    <var-option label="生物医学工程学院" value="SWYXGCXY" />
                    <var-option label="第二临床医学院" value="DELCYXY" />
                    <var-option label="药学院" value="YYXY" />
                    <var-option label="公共卫生学院" value="GGSWXY" />
                    <var-option label="护理学院" value="HLXY" />
                    <var-option label="医学技术学院" value="YXJSXY" />
                    <var-option label="人文与管理学院" value="RWYGLXY" />
                    <var-option label="基础医学院" value="JCYXY" />
                    <var-option label="外国语学院" value="WGYXY" />
                </var-select>
            </var-space>
            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="major" clearable placeholder="请输入专业" :rules="[(v) => !!v || '专业不能为空', (v) => /^[\u4e00-\u9fa5]{2,10}$/.test(v) || '专业格式不正确']" />
            </div>
            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="phone" clearable placeholder="请输入手机号" :rules="[(v) => !!v || '手机号不能为空', (v) => /^\d{11}$/.test(v) || '手机号格式不正确']" />
            </div>
            <div class="mb-2 w-full">
                <var-input size="small" variant="outlined" focus-color="#5295CD" v-model="email" clearable placeholder="请输入邮箱" :rules="[(v) => !!v || '邮箱不能为空', (v) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) || '邮箱格式不正确']" />
            </div>

            <button class="w-full py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-lg bg-[#E8F3FF]" @click="handleRegister">注册</button>

            <div class="mt-2 text-center cursor-pointer hover:underline text-[#8FBBDF]" @click="goLogin">已有账号？请登录</div>
        </div>
    </var-loading>
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
            college: '', // 选择学院
            loading: false // 控制loading组件的显示
        };
    },
    computed: {}, // 定义计算属性
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        // 通过学号计算年级
        calculateGrade() {
            let prefix = this.studentId.substring(0, 2); // 获取学号的前两位
            this.grade = '20' + prefix;
        },
        async handleRegister() {
            // 注册
            const { studentId, name, password, major, phone, email, college } = this;
            // 校验输入信息
            if (!studentId || !name || !password || !major || !phone || !email || !college) {
                this.$api.notify.error('请填写所有必填项');
                return;
            }
            if (!this.validate(studentId, /^\d{11}$/) || !this.validate(name, /^[\u4e00-\u9fa5]{2,16}$/) || !this.validate(password, /^[A-Za-z0-9]{6,16}$/) || !this.validate(major, /^[\u4e00-\u9fa5]{2,10}$/) || !this.validate(phone, /^\d{11}$/) || !this.validate(email, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
                this.$api.notify.warning('请检查输入信息是否符合规范');
                return;
            }
            this.loading = true;
            const res = await this.$api.auth.register({
                // 传递注册信息给后端
                studentId: this.studentId,
                grade: this.grade,
                name: this.name,
                password: this.password,
                major: this.major,
                phone: this.phone,
                email: this.email,
                college: this.college
            });

            this.loading = false;

            // 如果注册成功，弹出提示框，并跳转到登录页面
            if (res.success) {
                this.$api.notify.success('注册成功，请登录');
                this.goLogin();
            } else {
                this.$api.notify.error(res.error);
            }
        },
        // 跳转到登录页面
        goLogin() {
            this.$emit('go-login');
        },
        // 验证输入值是否符合正则表达式
        validate(value, regex) {
            return typeof value === 'string' && new RegExp(regex).test(value.trim());
        }
    } // 定义组件的方法
};
</script>

<style scoped></style>
