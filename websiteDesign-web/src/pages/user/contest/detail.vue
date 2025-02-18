<template>
    <div class="w-full h-[90%] flex justify-center items-center">
        <!-- 左边按钮组 -->
        <div class="w-[10%] h-[80%] flex flex-col space-y-7 justify-center items-center">
            <p @click="changeContent('theme')" :class="{ 'bg-[#E8F3FF]': content === 'theme' }" class="w-[85%] min-h-[140px] border-4 border-[#5D9CD0] rounded-[10px] flex items-center justify-center text-3xl font-extrabold text-[#5D9CD0]">主题方向</p>
            <p @click="changeContent('group')" :class="{ 'bg-[#E8F3FF]': content === 'group' }" class="w-[85%] min-h-[140px] border-4 border-[#5D9CD0] rounded-[10px] flex items-center justify-center text-3xl font-extrabold text-[#5D9CD0]">大赛分组</p>
            <p @click="changeContent('awards')" :class="{ 'bg-[#E8F3FF]': content === 'awards' }" class="w-[85%] min-h-[140px] border-4 border-[#5D9CD0] rounded-[10px] flex items-center justify-center text-3xl font-extrabold text-[#5D9CD0]">奖项设立</p>
            <p @click="changeContent('process')" :class="{ 'bg-[#E8F3FF]': content === 'process' }" class="w-[85%] min-h-[140px] border-4 border-[#5D9CD0] rounded-[10px] flex items-center justify-center text-3xl font-extrabold text-[#5D9CD0]">大赛流程</p>
        </div>
        <!-- 右边信息区域 -->
        <div class="w-[78%] h-full border-4 border-[#5D9CD0] rounded-[10px] relative">
            <!-- 根据 content 动态显示内容 -->

            <!-- 主题内容 -->
            <div v-if="content === 'theme'" class="w-full h-full text-[#000000]">
                <div class="w-[20%] h-[6vh] bg-transparent text-[#000000] text-4xl flex items-center justify-center absolute left-[5%] top-[7vh]">本届大赛主题：</div>
                <div class="w-[30%] h-[9%] text-[#5D9CD0] text-5xl absolute left-[5%] top-[18%] whitespace-nowrap">为我设计，为我所用</div>
                <div class="w-[40%] h-[6%] text-[#000000] text-4xl absolute left-[5%] top-[32%] whitespace-nowrap">选手可以选择以下四个方向进行创作：</div>
                <div class="w-full h-[8%] flex flex-row justify-center items-center relative top-[42%]">
                    <p @click="changeTheme('redCulture')" :class="{ 'bg-[#E8F3FF]': theme === 'redCulture' }" class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center text-[#5D9CD0] text-4xl absolute left-[6%]">红色文化</p>
                    <p @click="changeTheme('schoolViews')" :class="{ 'bg-[#E8F3FF]': theme === 'schoolViews' }" class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center text-[#5D9CD0] text-4xl absolute left-[30%]">校园风采</p>
                    <p @click="changeTheme('artificialIntelligence')" :class="{ 'bg-[#E8F3FF]': theme === 'artificialIntelligence' }" class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center text-[#5D9CD0] text-4xl absolute left-[55%]">人工智能</p>
                    <p @click="changeTheme('healthTreatment')" :class="{ 'bg-[#E8F3FF]': theme === 'healthTreatment' }" class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center text-[#5D9CD0] text-4xl absolute right-[6%]">健康医疗</p>
                </div>
                <!-- 主题描述区 -->
                <div class="w-[95%] h-[30%] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center items-center text-[#000000] text-4xl absolute left-[2.5%] top-[55%]">
                    {{ themeDescriptions[theme] }}
                </div>
                <!-- 底部说明 -->
                <div class="w-[86%] h-[10%] flex justify-left items-left text-[#000000] text-2xl absolute left-[5%] top-[88%]">
                    本次比赛不限网站形式，可选且不限于宣传网站、门户网站、视频网站、网页游戏等；
                    <br />
                    要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。
                </div>
            </div>
            <!-- 大赛分组内容 -->
            <div v-if="content === 'group'" class="w-full h-full text-[#000000] relative">
                <div class="w-[40%] h-[6%] text-4xl absolute left-[2.5%] top-[5%] whitespace-nowrap">选手可以从以下两个组别中选择参赛：</div>
                <div class="w-[85%] h-[8%] text-[#5D9CD0] text-4xl relative left-[8%] top-[17.5%]">
                    <p @click="selectGroup('designWebsite')" :class="{ 'bg-[#E8F3FF]': group === 'designWebsite' }" class="w-[40%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute left-0">网页设计组</p>
                    <p @click="selectGroup('developWebsite')" :class="{ 'bg-[#E8F3FF]': group === 'developWebsite' }" class="w-[40%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute right-0">网站开发组</p>
                </div>
                <!-- 组别介绍 -->
                <div class="w-[95%] h-[60%] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center items-center absolute top-[30%] left-[2.5%]">
                    {{ groupDescriptions[group] }}
                </div>
                <!-- 底部说明 -->
                <div class="w-[85%] h-[4.5%] text-[#000000] text-2xl absolute top-[93%] left-[4%]">注意：每名同学只能选择一个组别参赛</div>
            </div>
            <!-- 奖项设立内容 -->
            <div v-if="content === 'awards'" class="w-full h-full">
                <!-- 引言 -->
                <div class="w-[50%] h-[95%] flex justify-left items-left text-[#000000] text-3xl absolute top-[7%] left-[4%] whitespace-nowrap">
                    在这场创意与技术的盛宴中，我们为设置了以下奖项：
                    <br />
                    致敬每一位不懈追求卓越的参赛者！
                </div>
                <!-- 奖项介绍  -->
                <div>
                    <div class="w-[7%] h-[6%] flex justify-left items-left text-[#70A7D6] text-3xl absolute top-[25%] left-[4%] whitespace-nowrap">一等奖</div>
                    <!-- 描述 -->
                    <div></div>
                    <div class="w-[7%] h-[6%] flex justify-left items-left text-[#70A7D6] text-3xl absolute top-[50%] left-[4%] whitespace-nowrap">二等奖</div>
                    <div></div>
                    <div class="w-[7%] h-[6%] flex justify-left items-left text-[#70A7D6] text-3xl absolute top-[73%] left-[4%] whitespace-nowrap">三等奖</div>
                </div>
            </div>
            <!-- 大赛流程内容 -->
            <div v-if="content === 'process'" class="w-full h-full relative">
                <div v-if="content === 'process'" class="w-full h-full relative">
                    <div class="w-[86%] h-[8.5%] flex flex-row justify-center items-center text-[#5D9CD0] text-4xl absolute top-[20%] left-[6%]">
                        <p class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute left-0">摆摊宣传</p>
                        <div class="absolute w-[9%] border-t-4 border-[#5D9CD0] top-[50%] left-[16%]"></div>
                        <p class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute left-[25%]">大赛报名</p>
                        <div class="absolute w-[9%] border-t-4 border-[#5D9CD0] top-[50%] left-[41%]"></div>
                        <p class="w-[16%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute left-[50%]">作品提交</p>
                        <div class="absolute w-[7%] border-t-4 border-[#5D9CD0] top-[50%] left-[66%]"></div>
                        <p class="w-[10%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute right-[17%]">初赛</p>
                        <div class="absolute w-[7.5%] border-t-4 border-[#5D9CD0] top-[50%] right-[10%]"></div>
                        <p class="w-[10%] h-full border-4 border-[#5D9CD0] rounded-[20px] flex items-center justify-center absolute right-0">决赛</p>
                    </div>
                    <div class="w-[95%] h-[45%] border-4 border-[#5D9CD0] rounded-[15px] flex items-center justify-center absolute top-[45%] left-[2.5%]"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ResponsiveDesignCompetition',
    data() {
        return {
            content: 'theme', // 控制左侧显示的内容
            theme: 'redCulture', // 当前选中的theme
            group: 'designWebsite', // 当前选中的group
            themeDescriptions: {
                redCulture: '红色文化',
                schoolViews: '校园风采',
                artificialIntelligence: '人工智能',
                healthTreatment: '健康医疗'
            },
            groupDescriptions: {
                designWebsite: '网页设计组描述',
                developWebsite: '网站开发组描述'
            }
        };
    },
    computed: {
        contest() {
            return this.$store.contest;
        }
    },
    methods: {
        console() {
            console.log(this.contest);
        },
        // 根据点击的按钮改变内容
        changeContent(selectedContent) {
            this.content = selectedContent;
        },
        changeTheme(selectedTheme) {
            this.theme = selectedTheme;
        },
        selectGroup(selectedGroup) {
            this.group = selectedGroup;
        }
    }
};
</script>
<style scoped></style>
