<template>
    <div class="hidden lg:block w-full h-full">
    <div class="w-full h-full flex justify-center items-center mx-auto">
        <!-- 左侧按钮组 -->
        <div class="w-[10%] h-[80%] flex flex-col space-y-7 justify-center items-center pr-2">
        <p 
            v-for="btn in buttons"
            :key="btn.id"
            @click="changeContent(btn.id)"
            :class="{'bg-[#E8F3FF]': content === btn.id}"
            class="w-[85%] min-h-[140px] border-4 border-[#5D9CD0] rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-[#5D9CD0] cursor-pointer transition-all hover:scale-105">
            {{ btn.label }}
        </p>
        </div>
        <!-- 右侧内容区域 -->
        <div class="w-[78%] h-[90%] border-4 border-[#5D9CD0] rounded-[10px] flex flex-col p-8 ">
        <!-- 主题内容 -->
        <div v-if="content === 'theme'" class="flex flex-col h-full space-y-8 m-0">
            <header class="space-y-4 px-5">
            <div class="text-3xl pt-10 ">本届大赛主题：</div>
            <div class="text-4xl text-[#5D9CD0] font-bold  pt-2">为我设计，为我所用</div>
            <div class="text-3xl pt-12">选手可以选择以下四个方向进行创作：</div>
            </header>


            <div class="flex justify-between flex-1 " style="padding-left: 89px; padding-right: 89px;">
    <div
        v-for="theme in themes"
        :key="theme.id"
        @click="currentTheme = theme.id"
        :class="{'bg-[#E8F3FF]': currentTheme === theme.id}"
        class="w-[18%] h-[85%] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-3xl text-[#5D9CD0]">
        {{ theme.label }}
    </div>
</div>
            <div class="h-[30%] border-4 border-[#5D9CD0] rounded-[15px] flex items-center justify-center text-xl p-4">
            {{ themeDescriptions[currentTheme] }}
            </div>
            <footer class="text-xl space-y-3 text-gray-500 px-5">
            <p>本次比赛不限网站形式，可选且不限于宣传网站、门户网站、视频网站、网页游戏等；</p>
            <p>要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。</p>
            </footer>
        </div>
        <!-- 大赛分组内容 -->
        <div v-if="content === 'group'" class="flex flex-col h-full space-y-8">
    <header class="space-y-4 px-5 pt-6">
        <p class="text-3xl">选手可以从以下两个组别中选择参赛：</p>
    </header>
    <div class="w-[90%] h-[5%] flex justify-between flex-1 mx-auto pb-0">
        <div
            v-for="group in groups"
            :key="group.id"
            @click="currentGroup = group.id"
            :class="{'bg-[#E8F3FF]': currentGroup === group.id}"
            class="w-[40%] h-[75%] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-[#5D9CD0] text-3xl px-10 mt-2 ">
            {{ group.label }}
        </div>
    </div>
    <div class="h-[62%] ">
    <div class="h-full flex-1 flex  justify-center border-4 border-[#5D9CD0] rounded-[15px] text-3xl p-8"> 
        {{ groupDescriptions[currentGroup] }}
    </div>
</div>
    <footer class="text-xl text-gray-500 px-5 pt-1">
        注意：每名同学只能选择一个组别参赛
    </footer>
</div>
        <!-- 奖项设置内容 -->
        <div v-if="content === 'awards'" class="flex flex-col h-full space-y-8">
            <header class="space-y-4 px-5 pt-8">
                <p class="text-3xl">在这场创意与技术的盛宴中，我们为设置了以下奖项：</p>
                <p class="text-3xl ">致敬每一位不懈追求卓越的参赛者！</p>
            </header>
            <div class="flex flex-col flex-1 justify-between">
    <div class="flex flex-col items-start">
        <div class="text-3xl text-[#70A7D6] w-full px-5 pt-5">
    一等奖
    <div class="flex items-center text-2xl text-[#70A7D6] px-5 pt-5">
        奖项设置：<div class="text-2xl text-[#2C2828C2]">网页设计组、网站开发组各一支队伍。</div>
    </div>
    <div class="flex items-center text-2xl text-[#70A7D6] px-5 pt-2">
        奖品：<div class="text-2xl text-[#2C2828C2]">每位队员将获得价值200元的精美礼品及校级荣誉证书。</div>
    </div>
</div>
<div class="text-3xl text-[#70A7D6] w-full px-5 pt-10">
    二等奖
    <div class="flex items-center text-2xl text-[#70A7D6] px-5 pt-5">
        奖项设置：<div class="text-2xl text-[#2C2828C2]">网页设计组、网站开发组各一支队伍。</div>
    </div>
    <div class="flex items-center text-2xl text-[#70A7D6] px-5 pt-2">
        奖品：<div class="text-2xl text-[#2C2828C2]">每位队员将获得价值200元的精美礼品及校级荣誉证书。</div>
    </div>
</div>
<div class="text-3xl text-[#70A7D6] w-full px-5 pt-10">
    三等奖
    <div class="flex items-center text-2xl text-[#70A7D6] px-5 pt-5">
        奖项设置：<div class="text-2xl text-[#2C2828C2]">网页设计组、网站开发组各一支队伍。</div>
    </div>
    <div class="flex items-center text-2xl text-[#70A7D6] px-5 pt-2">
        奖品：<div class="text-2xl text-[#2C2828C2]">每位队员将获得价值200元的精美礼品及校级荣誉证书。</div>
    </div>
</div>
    </div>
</div>
        </div>
        <!-- 大赛流程内容 -->
        <div v-if="content === 'process'" class="flex flex-col h-full space-y-8">
    <div class="text-3xl px-4 pt-10">本届大赛流程：</div>
    <div class="w-full h-[15%] flex flex-row gap-16 items-center justify-center">  
        <div
            v-for="processStep in processSteps"
            :key="processStep.id"
            @click="currentProcessStep = processStep.id"
            :class="{'bg-[#E8F3FF]': currentProcessStep === processStep.id}"
            class="w-[9rem] h-[3.5rem] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-[#5D9CD0E6] text-xl mt-4 ">
            {{ processStep.label }}
        </div>
    </div>
    <div class="h-[60%]">
    <div class="h-[70%] border-4 border-[#5D9CD0] rounded-[15px] flex items-center justify-center text-xl px-4 mt-20" > 
    <p v-if="currentProcessStep">{{ time[currentProcessStep] }}</p> 
    <p v-if="currentProcessStep">{{place[currentProcessStep] }}</p> 
    <p v-if="currentProcessStep">{{ processDescriptions[currentProcessStep] }}</p> 

    </div>
    
</div>
</div>
        </div>
        </div>
    </div>
    <!-- 移动端 -->
    <div class="lg:hidden">
        <!-- 导航区 -->
    <div class="w-[88%]  h-[9vh] flex justify-center items-center mx-auto mb-8">
    <div class="flex h-full justify-between flex-1">
    <div
    v-for="btn in buttons"
            :key="btn.id"
            @click="changeContent(btn.id)"
            :class="{'bg-[#E8F3FF]': content === btn.id}"
        class="flex-1  flex items-center justify-center border-4 border-[#5D9CD0] rounded-[10px] text-base text-[#5D9CD0] mx-1"
    >
    {{ btn.label }}
    </div>
</div>
</div>
<!-- 内容 -->
<div v-if="content === 'theme'">
<div class="w-[88%] h-[74vh] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center p-4 mx-auto">
    <div class="w-full">
        <div class="text-4xl text-center">本届大赛主题：</div>
        <div class="text-[#5D9CD0] text-3xl pt-3 px-8">为我设计，为我所用</div>
        <div class="text-2xl pt-3 px-4">选手可以选择以下四个方向进行创作：</div>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
            <div
                v-for="theme in themes"
                :key="theme.id"
                @click="currentTheme = theme.id"
                :class="{'bg-[#E8F3FF]': currentTheme === theme.id}"
                class="w-[9.5rem] h-[3.5rem] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[1.25rem] text-2xl text-[#5D9CD0]">
                {{ theme.label }}
            </div>
        </div>
        <div class="w-[20rem] h-[35%] border-4 border-[#5D9CD0] rounded-[15px] p-2 text-xl mx-auto mt-6 leading-relaxed">
            {{ themeDescriptions[currentTheme] }}
            </div>
            <footer class="text-xs text-gray-500 pt-4 px-5">
            <p>要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。本次比赛不限网站形式，可选且不限于宣传网站、门户网站、视频网站、网页游戏等；要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。</p>
            </footer>
    </div>
</div>
</div>
<div v-if="content === 'group'">
    <div class="w-[88%] h-[74vh] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center  mx-auto">
    <div class="w-full">
        <div class="text-4xl text-center p-4">选手可以从以下两个组别中选择参赛：</div>
        <div class="flex flex-col items-center  ">
            <div
                v-for="group in groups"
                :key="group.id"
                @click="currentGroup = group.id"
                :class="{'bg-[#E8F3FF]': currentGroup === group.id}"
                class="w-[15rem] h-[3.5rem] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-3xl mt-4 ">
                {{ group.label }}
            </div>
        </div>
        <div class="w-[20rem] h-[50%] border-4 border-[#5D9CD0] rounded-[15px] p-3 text-xl mx-auto mt-6 leading-relaxed">
            {{groupDescriptions[currentGroup] }}
            <div>作品样例：</div>
            </div>
            <footer class="w-full text-xl text-gray-500 pt-4 px-2">
            <p>注意：每名同学只能选择一个组别参赛</p>
            </footer>
    </div>
</div>
</div>
<div v-if="content === 'awards'">
    <div class="w-[88%] h-[74vh] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center  mx-auto">
    <div class="w-full">
        <div class="text-xl p-4 leading-relaxed">
            <p>在这场创意与技术的盛宴中，我们为获奖者设置了以下奖项：</p>
            <p>致敬每一位不懈追求卓越的参赛者！</p>
        </div>
    <div class="flex flex-col flex-1 justify-between">
        <div class="flex flex-col items-start">
        <div class="text-3xl text-[#70A7D6] w-full px-3">一等奖</div>
        <div class="flex items-center text-2xl">
        <span class="text-[#70A7D6] px-2 ">奖项设置：<span class="text-[#2C2828C2]">网页设计组、网站开发组各一支队伍。</span></span>
    </div>
    <div class="flex items-center text-2xl">
        <span class="text-[#70A7D6] px-2 ">奖品：<span class="text-[#2C2828C2]">每位队员将获得价值200元的精美礼品及校级荣誉证书。</span></span>
    </div>
    <div class="text-3xl text-[#70A7D6] w-full pt-6 px-3">二等奖</div>
        <div class="flex items-center text-2xl">
        <span class="text-[#70A7D6] px-2 ">奖项设置：<span class="text-[#2C2828C2]">网页设计组、网站开发组各两支队伍。</span></span>
    </div>
    <div class="flex items-center text-2xl">
        <span class="text-[#70A7D6] px-2 ">奖品：<span class="text-[#2C2828C2]">每位队员将获得价值150元的精美礼品及校级荣誉证书。</span></span>
    </div>
    <div class="text-3xl text-[#70A7D6] w-full pt-6 px-3">三等奖</div>
        <div class="flex items-center text-2xl">
        <span class="text-[#70A7D6] px-2 ">奖项设置：<span class="text-[#2C2828C2]">网页设计组、网站开发组各两支队伍。</span></span>
    </div>
    <div class="flex items-center text-2xl">
        <span class="text-[#70A7D6] px-2 ">奖品：<span class="text-[#2C2828C2]">每位队员将获得价值150元的精美礼品及校级荣誉证书。</span></span>
    </div>
    </div>
</div>
    </div>
</div>
</div>
<div v-if="content === 'process'">
    <div class="w-[88%] h-[74vh] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center p-4 mx-auto">
    <div class="w-full ">
        <div class="text-4xl ">本届大赛流程：</div>
        <div class="flex flex-row">
        <!-- 左边按钮区 -->
        <div class="w-[50%] flex flex-col gap-14 pt-4">  
    <div
        v-for="processStep in processSteps"
        :key="processStep.id"
        @click="currentProcessStep = processStep.id"
        :class="{'bg-[#E8F3FF]': currentProcessStep === processStep.id}"
        class="w-[7.5rem] h-[3rem] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-[#5D9CD0E6] text-xl mt-4"
    >
        {{ processStep.label }}
    </div>
</div>
        <!-- 右边说明区 -->
        <div class="w-[65%] ">
            <div v-if="currentProcessStep" class="text-xl text-[#5D9CD0] pt-10">
                <!-- 根据 currentProcessStep 的值显示对应的说明 -->
                {{ time[currentProcessStep] }}
            </div>
            <div v-if="currentProcessStep" class="text-xl text-[#5D9CD0] pt-5">
                <!-- 根据 currentProcessStep 的值显示对应的说明 -->
                {{ place[currentProcessStep] }}
            </div>
            <div v-if="currentProcessStep" class="text-base  text-[#5D9CD0] pt-5" :style="{ lineHeight: '35px' }">
                <!-- 根据 currentProcessStep 的值显示对应的说明 -->
                {{ processDescriptions[currentProcessStep] }}
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
    name: "CompetitionDesktop",
    data() {
    return {
        content: 'theme',
        currentTheme: 'redCulture',
        currentGroup: 'design',
        currentProcessStep: 'first',
        buttons: [
            { id: 'theme', label: '主题方向' },
            { id: 'group', label: '大赛分组' },
            { id: 'awards', label: '奖项设置' },
            { id: 'process', label: '大赛流程' }
        ],
        themes: [
            { id: 'redCulture', label: '红色文化' },
            { id: 'schoolViews', label: '校园风采' },
            { id: 'artificialIntelligence', label: '人工智能' },
            { id: 'healthTreatment', label: '健康医疗' }
        ],
        groups:[
            {id:'design',label:'网页设计组'},
            {id:'website',label:'网站开发组'},
        ],
        processSteps: [
            {id:'first',label:'摆摊宣传'}, 
            {id:'second',label:'大赛报名'}, 
            {id:'third',label:'作品提交'}, 
            {id:'fourth',label:'初赛'}, 
            {id:'fifth',label:'决赛'}, 
        ],
        themeDescriptions: {
            redCulture: "2025年，是一个意义非凡的年份。",
            schoolViews: "校园风采方向的详细描述...",
            artificialIntelligence: "人工智能方向的详细描述...",
            healthTreatment: "健康医疗方向的详细描述..."
        },
        groupDescriptions: {
            design: "该组别为单人赛，选手单人成队。参赛选手可通过使用Adobe Illustrator、Pixso等专业绘图工具，设计符合大赛主题的完整网站UI界面，包括但不限于电脑端、手机端等多种平台，展现创意与设计理念的完美融合。",
            develop: "网站开发组详细描述..."
        },
        time: {
            first: "时间：2025年3月7日",
            second: "",

        },
        place: {
            first: "地点：第一饭堂门口",
            second: "",
        },
        processDescriptions: {
            first: "届时，我们将在第一饭堂门口举行线下摆摊宣传活动。无论你是对大赛充满兴趣，还是有任何疑问，都可以前来与我们面对面交流。我们将为你提供详细的赛事信息，解答所有疑虑，让你全方位了解大赛内容与参赛细节。欢迎大家踊跃参与，期待与您相见！",
            second: "这是大赛报名的说明...",
        }
}
    },
    methods: {
    changeContent(content) {
        this.content = content
    },
    changeProcessStep(processStepId) {
        this.currentProcessStep = processStepId;
    }
    }
}
</script>
<style scoped>
</style>