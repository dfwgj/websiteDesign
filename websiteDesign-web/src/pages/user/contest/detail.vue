<template>
    <div class="hidden lg:block w-full h-full bg-[url('@/assets/生工院标.svg')] bg-contain bg-center bg-no-repeat flex-col lg:flex-row items-center justify-center opacity-0" :class="{ 'title-visible': isMounted }">
        <div class="w-full h-full flex justify-center items-center mx-auto bg-[#FFFFFF] bg-opacity-60">
            <!-- 左侧按钮组 -->
            <div class="w-[10%] h-[80%] flex flex-col space-y-7 justify-center items-center pr-2">
                <div
                    v-for="btn in buttons"
                    :key="btn.id"
                    @click="changeContent(btn.id)"
                    :class="{ 'bg-[#E8F3FF]': content === btn.id }"
                    class="min-h-[16dvh] min-w-[9vw] border-4 border-[#5D9CD0] rounded-[10px] flex flex-col items-center justify-center text-[3dvh] font-extrabold text-[#5D9CD0] cursor-pointer transition-all hover:scale-105 p-1 aspect-ratio-[1]">
                    <img :src="btn.iconLink" alt="" class="w-2/5 mb-2" />
                    <!-- 图片 -->
                    {{ btn.label }}
                    <!-- 文字 -->
                </div>
            </div>
            <!-- 右侧内容区域 -->
            <div class="w-[78%] h-[90%] border-4 border-[#5D9CD0] rounded-[10px] flex flex-col p-6 overflow-auto">
                <!-- 主题内容 -->
                <transition name="fade" mode="out-in" :duration="{ enter: 300, leave: 300 }">
                    <div :key="content">
                        <div v-if="content === 'theme'" class="flex flex-col h-full space-y-4 m-0">
                            <header class="space-y-4 px-5">
                                <div class="text-4xl py-[1%] 2xl:text-5xl">本届大赛主题为：</div>
                                <div class="text-5xl 2xl:text-6xl text-[#5D9CD0] font-bold py-[1%]">{{ contest?.topic }}</div>
                                <div class="text-3xl 2xl:text-4xl py-[1%]">选手可以选择以下四个方向进行创作：</div>
                            </header>
                            <div class="flex justify-between flex-1 max-h-[9dvh]" style="padding-left: 89px; padding-right: 89px">
                                <div v-for="theme in contest.direction" :key="theme.id" v-if="content === 'theme'" @click="changeTheme(theme)" :class="{ 'bg-[#E8F3FF]': currentTheme === theme.name }" class="w-[18%] h-[8dvh] flex items-center justify-center border-4 border-[#5D9CD0] p-1 rounded-[20px] text-2xl text-[#5D9CD0]">
                                    {{ theme.name }}
                                </div>
                            </div>
                            <div class="h-[20dvh] w-[100%] border-4 border-[#5D9CD0] rounded-[15px] flex items-center justify-center text-xl 2xl:text-3xl py-[1%] px-4">
                                <!-- 显示对应主题的详细内容 -->
                                <p>{{ theme.txt }}</p>
                            </div>
                            <footer class="text-sm 2xl:text-3xl space-y-3 text-gray-500 px-5 2xl:py-[1%]">
                                <p>本次比赛不限网站形式，可选且不限于宣传网站、门户网站、视频网站、网页游戏等；</p>
                                <p>要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。</p>
                            </footer>
                        </div>
                        <!-- 大赛分组 -->
                        <div v-else-if="content === 'group'" class="flex flex-col h-full space-y-8">
                            <header class="space-y-4 px-5 pt-[1%]">
                                <p class="text-3xl 2xl:text-5xl">选手可以从以下两个组别中选择参赛：</p>
                            </header>
                            <div class="w-[90%] flex justify-between pt-[1%] flex-1 mx-auto">
                                <div v-for="group in groups" :key="group.groupCode" @click="changeGroup(group)" :class="{ 'bg-[#E8F3FF]': currentGroup === group.groupCode }" class="w-[40%] h-[8dvh] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-[#5D9CD0] text-3xl 2xl:text-5xl px-10 mt-2">
                                    {{ group.groupName }}
                                </div>
                            </div>
                            <div class="h-[35dvh] pt-[1%]">
                                <div class="h-full flex-1 flex justify-center border-4 border-[#5D9CD0] rounded-[15px] text-xl 2xl:text-3xl p-8">
                                    {{ group.groupRemark }}
                                </div>
                            </div>
                            <footer class="text-xl 2xl:text-3xl text-gray-500 px-5 py-[1%] 2xl:py-[2%]">注意：每名同学只能选择一个组别参赛</footer>
                        </div>
                        <!-- 奖项设置 -->
                        <div v-else-if="content === 'awards'" class="flex flex-col h-full space-y-[3%]">
                            <header class="space-y-4 px-5 pt-[2%] text-2xl 2xl:text-4xl">
                                <p>在这场创意与技术的盛宴中，我们为获奖者设置了以下奖项：</p>
                                <p>致敬每一位不懈追求卓越的参赛者！</p>
                            </header>
                            <div class="flex flex-col flex-1 justify-between">
                                <!-- 按照奖项名称分组后，每个奖项等级只渲染一次 -->
                                <div v-for="awardGroup in groupedAwards" :key="awardGroup.name" class="flex flex-col items-start">
                                    <div class="text-2xl 2xl:text-4xl text-[#70A7D6] w-full px-5">
                                        {{ awardGroup.name }}
                                        <div class="flex items-center text-xl 2xl:text-3xl text-[#70A7D6] px-5 pt-2">
                                            奖项设置：
                                            <div class="text-xl 2xl:text-3xl text-[#2C2828C2]">
                                                <!-- 显示排序后所有组别的名称，并依次显示各自的参赛队伍数量 -->
                                                <template v-for="(group, index) in sortedGroups" :key="group.groupCode">
                                                    {{ index === 0 ? '' : '、' }}{{ group.groupName }}
                                                    {{ getAwardQuantity(group.groupCode, awardGroup.awards) }}
                                                    支队伍
                                                </template>
                                                。
                                            </div>
                                        </div>
                                        <div class="flex items-center text-xl 2xl:text-3xl text-[#70A7D6] px-5 pt-2">
                                            奖品：
                                            <div class="text-xl 2xl:text-3xl text-[#2C2828C2]">
                                                <template v-for="(group, index) in sortedGroups" :key="group.groupCode">
                                                    {{ group.groupName }}每位队员将获得价值
                                                    {{ getAwardAmount(group.groupCode, awardGroup.awards) }}
                                                    元的{{ getAwardPrize(group.groupCode, awardGroup.awards) || '精美礼品' }}及校级荣誉证书
                                                    <br />
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 大赛流程内容 -->
                        <div v-else-if="content === 'process'" class="flex flex-col h-full space-y-4">
                            <div class="px-5 pt-[2%] text-3xl 2xl:text-4xl">
                                本届大赛流程：
                                <div class="flex items-center pt-[5%] justify-center h-[14dvh]">
                                    <!-- 移除gap -->
                                    <template v-for="(processStep, index) in dates" :key="processStep.id">
                                        <!-- 方块元素 -->
                                        <div @click="changeProcess(processStep)" :class="{ 'bg-[#E8F3FF]': currentProcess === processStep.name }" class="w-[10vw] h-full flex items-center justify-center border-4 border-[#5D9CD0] rounded-[50px] text-[#5D9CD0E6] text-xl 2xl:text-3xl relative">
                                            {{ processStep.name }}
                                        </div>
                                        <!-- 在方块之间添加连接线 -->
                                        <div v-if="index !== dates.length - 1" class="w-[5%] h-[4px] bg-[#5D9CD0]"></div>
                                    </template>
                                </div>
                                <div class="h-[50dvh] pt-[10dvh]">
                                    <div class="h-full flex-1 flex flex-col space-y-[2dvh] items-start border-4 border-[#5D9CD0] rounded-[15px] text-2xl 2xl:text-4xl p-8">
                                        <div>时间：{{ formatDate(date.date) }}</div>
                                        <div>地点：{{ date.place }}</div>
                                        <div>{{ date.txt }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
    <div class="lg:hidden w-full h-full bg-[url('@/assets/生工院标.svg')] bg-contain bg-center bg-no-repeat flex-col lg:flex-row items-center justify-center opacity-0" :class="{ 'title-visible': isMounted }">
        <div class="bg-[#FFFFFF] bg-opacity-60">
            <!-- 导航区 -->
            <div class="w-[88%] h-[9dvh] flex justify-center items-center mx-auto mb-8">
                <div class="flex h-full justify-between flex-1">
                    <div v-for="btn in buttons" :key="btn.id" @click="changeContent(btn.id)" :class="{ 'bg-[#E8F3FF]': content === btn.id }" class="min-h-[8dvh] border-4 border-[#5D9CD0] rounded-[10px] flex flex-col items-center justify-center text-[2dvh] font-extrabold text-[#5D9CD0] cursor-pointer transition-all p-1 aspect-ratio-[1]">
                        <img :src="btn.iconLink" alt="" class="w-2/5 mb-2" />
                        {{ btn.label }}
                    </div>
                </div>
            </div>
            <!-- 内容 -->
            <div class="w-[88%] h-[74dvh] border-4 border-[#5D9CD0] rounded-[15px] flex justify-center p-4 mx-auto overflow-auto">
                <!-- 主题内容 -->
                <transition name="fade" mode="out-in" :duration="300">
                    <div :key="content + '-mobile'">
                        <div v-if="content === 'theme'" class="w-full h-full">
                            <div class="text-2xl text-center">本届大赛主题为：</div>
                            <div class="text-[#5D9CD0] text-2xl pt-3 text-center">为我设计，为我所用</div>
                            <div class="text-xl pt-3 px-2">选手可以选择以下四个方向进行创作：</div>
                            <div class="flex flex-wrap justify-center gap-4 pt-4">
                                <div v-for="theme in contest.direction" :key="theme.id" @click="changeTheme(theme)" :class="{ 'bg-[#E8F3FF]': currentTheme === theme.name }" class="w-[30vw] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[1.25rem] text-xl p-1 text-[#5D9CD0]">
                                    {{ theme.name }}
                                </div>
                            </div>
                            <div class="w-[95%] h-[30dvh] border-4 border-[#5D9CD0] rounded-[15px] p-2 text-xl mx-auto mt-6">
                                <p>{{ theme.txt }}</p>
                            </div>
                            <footer class="text-gray-500 pt-4 px-2">
                                <p>要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。</p>
                                <p>本次比赛不限网站形式，可选且不限于宣传网站、门户网站、视频网站、网页游戏等；要求创作内容积极向上，思想健康，主题鲜明，能够体现时代要求与大学生的精神面貌。</p>
                            </footer>
                        </div>
                        <!-- 大赛分组 -->
                        <div v-else-if="content === 'group'" class="w-full h-full">
                            <div class="text-2xl text-center p-4">选手可以从以下两个组别中选择参赛：</div>
                            <div class="flex flex-wrap justify-center gap-4 items-center">
                                <div v-for="group in groups" :key="group.groupCode" @click="changeGroup(group)" :class="{ 'bg-[#E8F3FF]': currentGroup === group.groupCode }" class="w-[40%] h-[6dvh] flex items-center justify-center border-4 border-[#5D9CD0] rounded-[20px] text-xl text-[#5D9CD0]">
                                    {{ group.groupName }}
                                </div>
                            </div>
                            <div class="w-[95%] h-[40dvh] border-4 border-[#5D9CD0] rounded-[15px] p-3 text-xl mx-auto mt-6 leading-relaxed">
                                {{ group.groupRemark }}
                            </div>
                            <footer class="w-full text-gray-500 pt-4 px-2">
                                <p>注意：每名同学只能选择一个组别参赛</p>
                            </footer>
                        </div>
                        <!-- 奖项设置 -->
                        <div v-else-if="content === 'awards'" class="w-full h-full">
                            <div class="text-xl p-2 leading-relaxed">
                                <p>在这场创意与技术的盛宴中，我们为获奖者设置了以下奖项：</p>
                                <p>致敬每一位不懈追求卓越的参赛者！</p>
                            </div>
                            <div v-for="awardGroup in groupedAwards" :key="awardGroup.name" class="flex flex-col items-start">
                                <div class="text-xl text-[#70A7D6] w-full px-1 pt-2">
                                    {{ awardGroup.name }}
                                    <!-- 奖项设置 -->
                                    <div class="flex pt-2">
                                        <div class="w-[30vw] text-lg text-[#70A7D6]">奖项设置：</div>
                                        <div class="w-[50vw] flex-grow text-lg text-[#2C2828C2]">
                                            <template v-for="(group, index) in sortedGroups" :key="group.groupCode">
                                                {{ index === 0 ? '' : '、' }}{{ group.groupName }}
                                                {{ getAwardQuantity(group.groupCode, awardGroup.awards) }}
                                                支队伍
                                            </template>
                                            。
                                        </div>
                                    </div>
                                    <!-- 奖品 -->
                                    <div class="flex pt-2">
                                        <div class="w-[30vw] text-lg text-[#70A7D6]">奖品：</div>
                                        <div class="w-[50vw] flex-grow text-lg text-[#2C2828C2]">
                                            <template v-for="(group, index) in sortedGroups" :key="group.groupCode">
                                                {{ group.groupName }}每位队员将获得价值
                                                {{ getAwardAmount(group.groupCode, awardGroup.awards) }}
                                                元的{{ getAwardPrize(group.groupCode, awardGroup.awards) || '精美礼品' }}及校级荣誉证书
                                                <br />
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 大赛流程内容 -->
                        <div v-else-if="content === 'process'" class="flex flex-col h-full space-y-4">
                            <div class="px-5 pt-[2%] text-2xl">
                                本届大赛流程：
                                <div class="flex h-full">
                                    <div class="w-[45%] pt-[5%]">
                                        <template v-for="(processStep, index) in dates" :key="processStep.id">
                                            <!-- 方块元素 -->
                                            <div @click="changeProcess(processStep)" :class="{ 'bg-[#E8F3FF]': currentProcess === processStep.name }" class="w-[25vw] h-[7dvh] flex justify-center items-center border-4 border-[#5D9CD0] rounded-[25px] text-[#5D9CD0E6] text-xl relative">
                                                {{ processStep.name }}
                                            </div>
                                            <!-- 在方块之间添加连接线 -->
                                            <div v-if="index !== dates.length - 1" class="w-[25vw] flex justify-center items-center">
                                                <div class="w-[4px] h-[4dvh] bg-[#5D9CD0]"></div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="w-[55%] pt-[5%]">
                                        <div class="h-full flex-1 flex flex-col space-y-[1dvh] items-start text-lg">
                                            <div>时间：{{ formatDate(date.date) }}</div>
                                            <div>地点：{{ date.place }}</div>
                                            <div>{{ date.txt }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import theme from '@/assets/主题.svg';
import group from '@/assets/个人中心.svg';
import awards from '@/assets/奖项.svg';
import process from '@/assets/日历.svg';
import dayjs from 'dayjs';
export default {
    name: 'CompetitionDesktop',
    data() {
        return {
            content: 'theme',
            theme: '',
            themes: '',
            currentTheme: '红色文化',
            currentGroup: '',
            currentProcess: '',
            buttons: [
                { id: 'theme', label: '主题方向', iconLink: theme },
                { id: 'group', label: '大赛分组', iconLink: group },
                { id: 'awards', label: '奖项设置', iconLink: awards },
                { id: 'process', label: '大赛流程', iconLink: process }
            ],
            groups: [],
            group: '',
            awards: [],
            dates: [],
            isMounted: false,
            date: ''
        };
    },
    created() {},
    computed: {
        contest() {
            if (this.$store.contest.direction.length > 0) {
                return this.$store.contest;
            }
        },
        groupedAwards() {
            // 根据奖项名称（例如一等奖、二等奖、三等奖）分组，保证只渲染三次
            const groupsObj = {};
            this.awards.forEach((award) => {
                if (!groupsObj[award.name]) {
                    groupsObj[award.name] = [];
                }
                groupsObj[award.name].push(award);
            });
            return Object.keys(groupsObj).map((name) => ({
                name,
                awards: groupsObj[name]
            }));
        },
        sortedGroups() {
            // 按照你希望的顺序排序，比如将网站开发组（groupCode 为 'WZKF'）排在前面
            return this.groups.slice().sort((a, b) => {
                if (a.groupCode === 'WZKF') return -1;
                if (b.groupCode === 'WZKF') return 1;
                return 0;
            });
        }
    },
    mounted() {
        setTimeout(() => {
            this.isMounted = true;
        }, 200);
        this.themes = this.contest.direction;
        this.groups = this.contest.group;
        this.awards = this.contest.awards;
        this.dates = this.contest.date;
        if (this.themes.length > 0) {
            this.theme = this.themes[0];
            this.currentTheme = this.themes[0].name;
        }
        if (this.groups.length > 0) {
            this.group = this.groups[0];
            this.currentGroup = this.groups[0].groupCode;
        }
        if (this.dates.length > 0) {
            this.date = this.dates[0];
            this.currentProcess = this.dates[0].name;
        }
    },
    methods: {
        formatDate(date) {
            return dayjs(date).format('YYYY年MM月DD日');
        },
        changeTheme(theme) {
            this.theme = theme; // 更新当前选中的主题对象
            this.currentTheme = theme.name; // 更新当前选中的主题名称
        },
        changeGroup(group) {
            this.group = group;
            this.currentGroup = group.groupCode;
        },
        changeContent(content) {
            this.content = content;
        },
        changeProcess(process) {
            this.date = process;
            this.currentProcess = process.name;
        },
        getAwardAmount(groupCode, awards) {
            const award = awards.find((a) => a.type === groupCode);
            return award ? award.amount : '';
        },
        // 根据组别代码和奖项数组查找对应的奖品名称
        getAwardPrize(groupCode, awards) {
            const award = awards.find((a) => a.type === groupCode);
            return award ? award.prize : '';
        },
        // 根据组别代码查找对应的参赛队伍数量
        getAwardQuantity(groupCode, awards) {
            const award = awards.find((a) => a.type === groupCode);
            return award ? award.quantity : '';
        }
    }
};
</script>
<style scoped>
.fade-enter-active {
    animation: fadeIn 0.8s;
    transition: opacity 0.8s ease;
}

.fade-leave-active {
    animation: fadeOut 0.8s;
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.title-visible {
    opacity: 1;
    transition: opacity 0.4s ease-in;
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(100px);
    }
}
</style>
