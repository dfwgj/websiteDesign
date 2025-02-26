<template>
    <div class="w-full h-5/6 p-[5%] border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] overflow-auto bg-opacity-70 lg:grid lg:grid-cols-2">
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">真实姓名</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[70vw] lg:w-[20vw]" v-model="tempForm.name" :rules="[(v) => !!v || '姓名不能为空', (v) => /^[\u4e00-\u9fa5]{2,16}$/.test(v) || '姓名格式不正确']" />
            </div>
        </div>
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">学号</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" disabled blur-color="#5295CD" class="w-[70vw] lg:w-[20vw]" v-model="tempForm.studentId" :rules="[(v) => !!v || '学号不能为空', (v) => /^\d{11}$/.test(v.trim()) || '学号格式不正确']" />
            </div>
        </div>
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">学院</div>
                <var-select v-model="tempForm.college" clearable variant="outlined" size="small" blur-color="#5295CD" focus-color="#5295CD" class="w-[70vw] lg:w-[20vw] bg-white text-black rounded-xl">
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
            </div>
        </div>
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">专业</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[70vw] lg:w-[20vw]" v-model="tempForm.major" :rules="[(v) => !!v || '专业不能为空', (v) => /^[\u4e00-\u9fa5]{2,10}$/.test(v) || '专业格式不正确']" />
            </div>
        </div>
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">手机号</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[70vw] lg:w-[20vw]" v-model="tempForm.phone" :rules="[(v) => !!v || '手机号不能为空', (v) => /^\d{11}$/.test(v) || '手机号格式不正确']" />
            </div>
        </div>
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">邮箱</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[70vw] lg:w-[20vw]" v-model="tempForm.email" :rules="[(v) => !!v || '邮箱不能为空', (v) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) || '邮箱格式不正确']" />
            </div>
        </div>
        <div class="mb-2 lg:h-[10vh] lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="lg:justify-start lg:text-2xl">密码</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[70vw] lg:w-[20vw]" v-model="tempForm.password" :rules="[(v) => !!v || '密码不能为空', (v) => /^[A-Za-z0-9!@#$%^&*()]{6,16}$/.test(v) || '密码只能为6到16位的数字、字母组成']" />
            </div>
        </div>
        <div class="mt-2 h-[8vh] lg:h-[10vh] lg:mb-0 w-full flex justify-center items-center">
            <button class="w-[60%] h-[55%] rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-xl bg-[#E8F3FF]" @click="show = true">提交更改</button>
        </div>
    </div>

    <var-dialog class="w-[80vw] lg:w-[60vw] rounded-[10px]" v-model:show="show" confirm-button-text-color="red" persistent cancel-button-text-color="#5295CD" @before-close="handleRevise">
        <var-loading description="LOADING" color="#5295CD" :loading="loading">
            <p>确定要提交更改吗？</p>
        </var-loading>
    </var-dialog>
</template>
<script>
export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            tempForm: {}, // 临时表单数据
            loading: false, // 加载状态
            show: false // 弹窗状态
        };
    },
    computed: {
        user() {
            return this.$store.user;
        }
    }, // 定义计算属性

    created() {
        this.tempForm = { ...this.user };
    }, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        async getUserInfo() {
            const res = await this.$api.user.getUserInfo();
            if (res.success) {
                localStorage.setItem('token', res.data);
                this.$store.user.clearUserInfo();
                this.$store.user.decodeToken();
                this.$api.notify.success('用户信息更新成功！');
                return this.$store.user;
            } else {
                this.$api.notify.error(res.error);
            }
        },
        async handleRevise(action, done) {
            if (action === 'confirm') {
                const { name, college, major, phone, email, password } = this.tempForm;
                if (name === '' || college === '' || major === '' || phone === '' || email === '' || password === '') {
                    this.$api.notify.error('请将信息填写完整');
                    done();
                    return;
                }
                if ( !this.validate(name, /^[\u4e00-\u9fa5]{2,16}$/) || !this.validate(major, /^[\u4e00-\u9fa5]{2,10}$/) || !this.validate(phone, /^\d{11}$/) || !this.validate(email, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
                    this.$api.notify.warning('请检查输入信息是否符合规范');
                    return;
                }
                const keys = ['name', 'college', 'major', 'email', 'phone', 'password'];
                let isModified = false;
                for (const key of keys) {
                    if (this.user[key] !== this.tempForm[key]) {
                        isModified = true;
                        break;
                    }
                }
                if (!isModified) {
                    this.$api.notify.warning('信息未修改');
                    this.loading = false;
                    done();
                    return;
                }
                if (this.tempForm.password.includes('*') && this.tempForm.password !== '*********') {
                    this.$api.notify.error('密码格式错误');
                    this.loading = false;
                    done();
                    return;
                }
                // 生成只包含被修改字段的更新数据
                const updateData = Object.fromEntries(
                    Object.entries(this.tempForm)
                        .filter(([key, value]) => {
                            return this.user[key] !== value;
                        })
                        .map(([key, value]) => {
                            return [key, value];
                        })
                );
                if (Object.keys(updateData).length > 0) {
                    const res = await this.$api.user.updateUserInfo(updateData);
                    if (res.success) {
                        this.getUserInfo();
                        this.$api.notify.success('信息修改成功');
                        this.loading = false;
                        done();
                    } else {
                        this.$api.notify.error(res.error);
                        this.loading = false;
                        done();
                    }
                }
            } else {
                done();
            }
        },
        validate(value, regex) {
            return typeof value === 'string' && new RegExp(regex).test(value.trim());
        }
    } // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
