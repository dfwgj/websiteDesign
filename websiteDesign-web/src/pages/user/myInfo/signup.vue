<template>
    <div class="w-full h-5/6 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70">
        <!-- 选择赛道 -->
        <div class="w-full h-[8%] flex items-end text-xl lg:text-xl ml-6 lg:ml-16 lg:mb-4">请先选择赛道：</div>
        <div class="w-full h-[12%] grid grid-cols-2">
            <div class="w-full h-full flex justify-center items-center">
                <div
                    class="w-[80%] lg:w-[60%] h-4/5  flex justify-center items-center text-2xl lg:text-3xl text-[#5295CD] border-2 border-[#5295CD] rounded-2xl">
                    <div class="w-full flex justify-center">网页设计组</div>
                </div>
            </div>
            <div class="w-full h-full flex justify-center items-center">
                <div
                    class="w-[80%] lg:w-[60%] h-4/5 flex justify-center items-center text-2xl lg:text-3xl text-[#5295CD] border-2 border-[#5295CD] rounded-2xl">
                    <div class="w-full flex justify-center">网站开发组</div>
                </div>
            </div>
        </div>
        <!-- 队伍信息 -->
        <div class=" mt-4 lg:grid lg:grid-cols-2 lg:gap-2">
            <div class="w-full h-full flex items-center justify-center">
                <div class="w-1/4 h-[50px] lg:h-[70px] flex items-center text-lg lg:text-xl lg:ml-8">队伍名：</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                    class="flex items-center lg:mr-8" v-model="teamName" />
            </div>
            <div class="w-full h-full flex items-center justify-center">
                <div class="w-1/4 h-[50px] lg:h-[70px] flex items-center text-lg lg:text-xl lg:ml-8">队长：</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                    class="flex items-center lg:mr-8" v-model="captain" />
            </div>
            <div class="w-full h-full flex items-center justify-center">
                <div class="w-1/4 h-[50px] lg:h-[70px] flex items-center text-lg lg:text-xl lg:ml-8">队友1：</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                    class="flex items-center lg:mr-8" v-model="memberFir" />
            </div>
            <div class="w-full h-full flex items-center justify-center">
                <div class="w-1/4 h-[50px] lg:h-[70px] flex items-center text-lg lg:text-xl lg:ml-8">队友2：</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                    class="flex items-center lg:mr-8" v-model="memberSec" />
            </div>
            <div class="w-full h-full flex items-center justify-center">
                <div class="lg:w-1/4 h-[50px] lg:h-[70px] flex items-center text-lg lg:text-xl lg:ml-8">作品方向：</div>
                <var-select v-model="direction" clearable variant="outlined" size="small" blur-color="#5295CD"
                    focus-color="#5295CD"
                    class="w-[200px] lg:mr-8  flex items-center text-center bg-white text-black rounded-xl">
                    <var-option label="红色文化" value="HSWH" />
                    <var-option label="校园风采" value="XYFC" />
                    <var-option label="人工智能" value="RGZN" />
                    <var-option label="健康医疗" value="JKYL" />
                </var-select>
            </div>
        </div>
        <div class="lg:grid lg:grid-cols-2 lg:gap-2">
            <div class="w-full h-full flex items-center justify-center">
                <div class="lg:w-1/4 h-[50px] lg:h-[70px] flex items-center text-lg lg:text-xl lg:ml-8">作品名称：</div>
                <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                    class="flex items-center lg:mr-8" v-model="workName" />
            </div>
        </div>
        <div class="flex justify-center lg:justify-start lg:ml-[7%] mt-4 text-md">注：队友需先进行注册才能进行报名，且报名后无法更改信息。</div>
        <!-- 提交按钮 -->
        <div class="w-full h-[20%] lg:justify-end flex justify-center items-center">
            <button
                class="w-1/2 lg:w-[30%] lg:mr-20 py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-xl bg-[#E8F3FF] "
                @click="handleRevise">提交报名信息</button>
        </div>
    </div>
</template>
<script>
export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() { // 定义组件的响应式数据
        return {
            teamName: '', // 队伍名
            captain: '', // 队长
            memberFir: '', // 队友1
            memberSec: '', // 队友2
            direction: '', // 作品方向
            workName: '', // 作品名称
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {}, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>