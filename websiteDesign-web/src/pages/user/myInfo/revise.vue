<template>
    <div class="w-full h-5/6 lg:pt-24 lg:pb-24 lg:pl-10 lg:pr-10 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70 lg:grid lg:grid-cols-2 gap-0">
        <div class="mb-4 lg:mb-0 w-full mt-6 lg:mt-0 flex flex-col items-center">
            <div class="">
                <div class="w-1/3 lg:justify-start lg:text-xl">真实姓名</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[250px] flex items-center justify-center" v-model="tempForm.name" :rules="[(v) => !!v || '姓名不能为空', (v) => /^[\u4e00-\u9fa5]{2,16}$/.test(v) || '姓名格式不正确']" />
            </div>
        </div>
        <div class="mb-4 lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="w-1/3 lg:justify-start lg:text-xl">学号</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[250px] flex items-center" v-model="tempForm.studentId" :rules="[(v) => !!v || '学号不能为空', (v) => /^\d{11}$/.test(v.trim()) || '学号格式不正确']" />
            </div>
        </div>
        <div class="mb-4 lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="w-1/3 lg:justify-start lg:text-xl">学院</div>
                <var-select v-model="tempForm.college" clearable variant="outlined" size="small" blur-color="#5295CD" focus-color="#5295CD" class="w-[250px] flex items-center text-center bg-white text-black rounded-xl">
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
        <div class="mb-4 lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="w-1/3 lg:justify-start lg:text-xl">专业</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[250px] flex items-center" v-model="major" :rules="[(v) => !!v || '专业不能为空', (v) => /^[\u4e00-\u9fa5]{2,10}$/.test(v) || '专业格式不正确']" />
            </div>
        </div>
        <div class="mb-4 lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="w-1/3 lg:justify-start lg:text-xl">手机号</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[250px] flex items-center" v-model="phone" :rules="[(v) => !!v || '手机号不能为空', (v) => /^\d{11}$/.test(v) || '手机号格式不正确']" />
            </div>
        </div>
        <div class="mb-4 lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="w-1/3 lg:justify-start lg:text-xl">邮箱</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD" class="w-[250px] flex items-center" v-model="email" :rules="[(v) => !!v || '邮箱不能为空', (v) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) || '邮箱格式不正确']" />
            </div>
        </div>
        <div class="mb-4 lg:mb-0 w-full flex flex-col items-center">
            <div>
                <div class="w-1/3 lg:justify-start lg:text-xl">密码</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" type="password" blur-color="#5295CD" class="w-[250px] flex items-center" v-model="password" :rules="[(v) => !!v || '姓名不能为空', (v) => /^[\u4e00-\u9fa5]{2,16}$/.test(v) || '姓名格式不正确']" />
            </div>
        </div>
        <div class="w-full lg:justify-end flex justify-center items-center">
            <button class="w-1/2 lg:mr-20 lg:mt-14 py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-xl bg-[#E8F3FF]" @click="handleRevise">提交更改</button>
        </div>
    </div>
</template>
<script>
export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
           tempForm: {}, // 临时表单数据
        };
    },
    computed: {
        user() {
            return this.$store.user;
        }
    }, // 定义计算属性
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {
        this.tempForm = this.user;
    }, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {} // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
