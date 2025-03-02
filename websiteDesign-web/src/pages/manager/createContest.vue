<template>
    <div class="h-full w-full p-[2%] overflow-auto">
        <div class="flex flex-col items-center w-full">
            <div class="flex items-center h-[5vh] w-full">
                <img class="h-[5vh] w-[5vh]" @click="back" src="@/assets/back.svg" alt="" />
                <div class="flex-grow flex justify-center">
                    <p class="text-3xl font-bold text-[#5295CD]">创建比赛</p>
                </div>
            </div>
            <var-form ref="form" scroll-to-error="start">
                <div class="flex flex-col w-full p-[2%] h-[85vh]">
                    <p class="ml-[1vw] text-2xl font-bold">比赛基本信息</p>
                    <div class="grid grid-cols-2 gap-[2vw] p-[2%] w-full h-[100%]">
                        <var-input v-model="newContest.name" clearable focus-color="#5295CD" placeholder="请输入比赛名称" :rules="(v) => !!v || '比赛名称不能为空'" />
                        <var-input v-model="newContest.topic" clearable focus-color="#5295CD" placeholder="请输入比赛主题" :rules="(v) => !!v || '比赛主题不能为空'" />
                        <var-select placeholder="请选择一个年份" v-model="newContest.year" focus-color="#5295CD">
                            <var-option v-for="(year, index) in years" :label="year" :value="year">
                                {{ year }}
                            </var-option>
                        </var-select>
                        <var-input v-model="newContest.doubleKnots" focus-color="#5295CD" clearable placeholder="请输入双节全称" :rules="(v) => !!v || '双节全称不能为空'" />
                        <var-input v-model="newContest.organizers" focus-color="#5295CD" clearable placeholder="请输入主办方" :rules="(v) => !!v || '主办方不能为空'" />
                        <var-input v-model="newContest.contractors" focus-color="#5295CD" clearable placeholder="请输入承办方" :rules="(v) => !!v || '承办方不能为空'" />
                        <var-input variant="outlined" v-model="newContest.introduce" focus-color="#5295CD" clearable rows="8" textarea placeholder="请输入比赛简介" :rules="(v) => !!v || '比赛简介不能为空'" />
                    </div>
                </div>
                <div class="flex flex-col w-full p-[1%] h-[80vh]">
                    <p class="ml-[1vw] text-2xl font-bold">比赛流程信息</p>
                    <div class="grid grid-cols-5 gap-[1vw] p-[1%] w-full h-[100%]">
                        <div v-for="(item, index) in date" :key="index" class="border-[2px] border-[#5295CD] rounded-[1vw] p-[1vw] w-[100%] h-[100%]">
                            <div class="flex items-center justify-between w-full h-[5vh]">
                                <p class="text-xl font-bold text-[#5295CD]">流程{{ index + 1 }}</p>
                                <img v-show="index !== 0" src="@/assets/path.svg" class="h-[3vh]" @click="deleteDate(index)" />
                            </div>
                            <var-input v-model="date[index].name" clearable focus-color="#5295CD" placeholder="请输入流程名称" :rules="(v) => !!v || '日期名称不能为空'" />
                            <!-- 选择日期按钮 -->
                            <var-button v-show="date[index].date === ''" class="my-[1vh]" text outline block text-color="#5295CD" @click="openDatePicker(index)">选择该流程时间</var-button>
                            <!-- 显示已选日期 -->
                            <var-input v-show="date[index].date !== ''" v-model="date[index].date" clearable focus-color="#5295CD" placeholder="请输入日期" @clear="cancelDate(index)" />
                            <var-input v-model="date[index].place" clearable focus-color="#5295CD" placeholder="请输入地点" :rules="(v) => !!v || '地点不能为空'" />
                            <var-input v-model="date[index].txt" clearable focus-color="#5295CD" textarea placeholder="请输入内容" :rules="(v) => !!v || '内容不能为空'" />
                        </div>
                        <!-- 图片按钮 -->
                        <div v-if="date.length < 5" class="flex items-center justify-center">
                            <img src="@/assets/添加.svg" class="h-[10vh]" @click="addDate" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full p-[2%] h-[120vh]">
                    <p class="ml-[1vw] text-2xl font-bold">比赛奖项信息</p>
                    <div class="p-[1%] w-full h-[100%]">
                        <div class="writing-mode-vertical-rl text-[#5295CD] font-bold text-2xl">网页设计组:</div>
                        <div class="grid grid-cols-4 gap-[1vw] w-full h-[45%] py-[1vh]">
                            <!-- 奖项内容 -->
                            <div v-for="(item, index) in oneAwards" :key="index" class="border-[2px] border-[#5295CD] rounded-[1vw] p-[1vw] w-[100%] h-[100%]">
                                <div class="flex items-center justify-between w-full h-[5vh]">
                                    <p class="text-xl font-bold text-[#5295CD]">奖项{{ index + 1 }}</p>
                                    <img v-show="index !== 0" src="@/assets/path.svg" class="h-[3vh]" @click="deleteOneAward(index)" />
                                </div>
                                <var-input v-model="oneAwards[index].name" clearable focus-color="#5295CD" placeholder="请输入奖项名称" :rules="(v) => !!v || '奖项名称不能为空'" />
                                <var-input v-model="oneAwards[index].prize" clearable focus-color="#5295CD" placeholder="请输入奖品名称" :rules="(v) => !!v || '奖项名称不能为空'" />
                                <var-input v-model="oneAwards[index].amount" clearable focus-color="#5295CD" placeholder="请输入奖品金额" :rules="(v) => !!v || '奖项数量不能为空'" />
                                <var-input v-model="oneAwards[index].quantity" clearable focus-color="#5295CD" placeholder="请输入奖项数量" :rules="(v) => !!v || '奖项数量不能为空'" />
                            </div>
                            <!-- 添加按钮 -->
                            <div v-if="oneAwards.length < 4" class="flex items-center justify-center">
                                <img src="@/assets/添加.svg" class="h-[10vh]" @click="addOneAward" />
                            </div>
                        </div>
                        <div class="mt-[2vh] writing-mode-vertical-rl text-[#5295CD] font-bold text-2xl">网站开发组:</div>
                        <!-- 第二组 -->
                        <div class="grid grid-cols-4 gap-[1vw] w-full h-[45%] py-[1vh]">
                            <!-- 奖项内容 -->
                            <div v-for="(item, index) in twoAwards" :key="index" class="border-[2px] border-[#5295CD] rounded-[1vw] p-[1vw] w-[100%] h-[100%]">
                                <div class="flex items-center justify-between w-full h-[5vh]">
                                    <p class="text-xl font-bold text-[#5295CD]">奖项{{ index + 1 }}</p>
                                    <img v-show="index !== 0" src="@/assets/path.svg" class="h-[3vh]" @click="deleteTwoAward(index)" />
                                </div>
                                <var-input v-model="twoAwards[index].name" clearable focus-color="#5295CD" placeholder="请输入奖项名称" :rules="(v) => !!v || '奖项名称不能为空'" />
                                <var-input v-model="twoAwards[index].prize" clearable focus-color="#5295CD" placeholder="请输入奖品名称" :rules="(v) => !!v || '奖项名称不能为空'" />
                                <var-input v-model="twoAwards[index].amount" clearable focus-color="#5295CD" placeholder="请输入奖品金额" :rules="(v) => !!v || '奖项数量不能为空'" />
                                <var-input v-model="twoAwards[index].quantity" clearable focus-color="#5295CD" placeholder="请输入奖项数量" :rules="(v) => !!v || '奖项数量不能为空'" />
                            </div>
                            <!-- 添加按钮 -->
                            <div v-if="twoAwards.length < 4" class="flex items-center justify-center">
                                <img src="@/assets/添加.svg" class="h-[10vh]" @click="addTwoAward" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full p-[2%] h-[70vh]">
                    <p class="ml-[1vw] text-2xl font-bold">比赛方向信息</p>
                    <div class="grid grid-cols-5 gap-[2vw] p-[2%] w-full h-[100%]">
                        <div v-for="(item, index) in directions" :key="index" class="border-[2px] border-[#5295CD] rounded-[1vw] p-[1vw] w-[100%] h-[100%]">
                            <div class="flex items-center justify-between w-full h-[5vh]">
                                <p class="text-xl font-bold text-[#5295CD]">方向{{ index + 1 }}</p>
                                <img v-show="index !== 0" src="@/assets/path.svg" class="h-[3vh]" @click="deleteDirection(index)" />
                            </div>
                            <var-input v-model="directions[index].name" clearable focus-color="#5295CD" placeholder="请输入方向名称" :rules="(v) => !!v || '方向名称不能为空'" />
                            <var-input v-model="directions[index].txt" clearable focus-color="#5295CD" textarea placeholder="请输入内容" :rules="(v) => !!v || '内容不能为空'" />
                        </div>
                        <!-- 添加按钮 -->
                        <div v-if="directions.length < 5" class="flex items-center justify-center">
                            <img src="@/assets/添加.svg" class="h-[10vh]" @click="addDirection" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full p-[2%] px-[20vw]">
                    <var-button size="large" text outline block text-color="#5295CD" @click="createContest">确认添加</var-button>
                </div>
            </var-form>
        </div>
        <!-- 日期选择弹窗 -->
        <var-popup class="rounded-xl w-[30vw] h-[60vh]" v-model:show="showForm" title="添加日期">
            <var-date-picker color="#5295CD" v-model="selectedDate" />
            <div class="w-[80%] mx-[10%]">
                <var-button class="mt-[1vh]" text outline block text-color="#5295CD" @click="confirmDate">确认</var-button>
            </div>
        </var-popup>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            showForm: false,
            newContest: {
                name: '',
                topic: '',
                introduce: '',
                doubleKnots: '',
                organizers: '',
                contractors: '',
                year: ''
            },
            date: [
                {
                    name: '',
                    date: '',
                    place: '',
                    txt: ''
                }
            ],
            oneAwards: [
                {
                    name: '',
                    prize: '',
                    amount: '',
                    quantity: '',
                    type: 'WYSJ'
                }
            ],
            twoAwards: [
                {
                    name: '',
                    prize: '',
                    amount: '',
                    quantity: '',
                    type: 'WZKF'
                }
            ],
            directions: [
                {
                    name: '',
                    txt: ''
                }
            ],
            years: [],
            selectedDate: undefined, // 选中的日期
            currentEditIndex: -1 // 当前编辑的流程索引
        };
    },
    created() {
        this.years = Array.from({ length: 26 }, (_, i) => String(2025 + i));
    },
    methods: {
        addOneAward() {
            if (this.oneAwards.length >= 4) {
                this.$api.notify.error('最多只能添加 4 个奖项');
                return;
            }
            this.oneAwards.push({
                name: '',
                prize: '',
                amount: '',
                quantity: '',
                type: 'WYSJ'
            });
        },
        addTwoAward() {
            if (this.twoAwards.length >= 4) {
                this.$api.notify.error('最多只能添加 4 个奖项');
                return;
            }
            this.twoAwards.push({
                name: '',
                prize: '',
                amount: '',
                quantity: '',
                type: 'WZKF'
            });
        },
        deleteOneAward(index) {
            this.oneAwards.splice(index, 1);
        },
        deleteTwoAward(index) {
            this.twoAwards.splice(index, 1);
        },
        addDate() {
            if (this.date.length >= 5) {
                this.$api.notify.error('最多只能添加 5 个流程');
                return;
            }
            this.date.push({
                name: '',
                date: '',
                place: '',
                txt: ''
            });
        },
        deleteDate(index) {
            this.date.splice(index, 1);
        },
        addDirection() {
            if (this.directions.length >= 5) {
                this.$api.notify.error('最多只能添加 4 个方向');
                return;
            }
            this.directions.push({
                name: '',
                txt: ''
            });
        },
        deleteDirection(index) {
            this.directions.splice(index, 1);
        },
        back() {
            this.$router.push('/manager/contestManagement');
        },
        openDatePicker(index) {
            this.currentEditIndex = index; // 记录当前编辑的流程索引
            this.showForm = true; // 显示日期选择弹窗
        },
        confirmDate() {
            if (this.currentEditIndex !== -1 && this.selectedDate) {
                const selected = new Date(this.selectedDate);
                if (this.date.length > 1) {
                    for (let i = 0; i < this.date.length; i++) {
                        if (i !== this.currentEditIndex && this.date[i].date) {
                            const existingDate = new Date(this.date[i].date);
                            if (selected < existingDate && this.currentEditIndex > i) {
                                this.$api.notify.error('日期不能早于已有流程日期');
                                return;
                            }
                        }
                    }
                }
                this.date[this.currentEditIndex].date = selected.toISOString().split('T')[0];
            }
            this.showForm = false;
            this.currentEditIndex = -1;
            this.selectedDate = undefined;
        },
        cancelDate(index) {
            this.date[index].date = '';
            this.currentEditIndex = -1;
            this.selectedDate = undefined;
        },
        async createContest() {
            // 验证流程名称不能重复
            const dateNames = this.date.map((d) => d.name).filter((name) => name);
            if (new Set(dateNames).size !== dateNames.length) {
                this.$api.notify.error('流程名称不能重复');
                return;
            }
            // 验证两个奖项组内名称不能相等
            const oneAwardsNames = this.oneAwards.map((a) => a.name).filter((name) => name);
            if (new Set(oneAwardsNames).size !== oneAwardsNames.length) {
                this.$api.notify.error('网页设计组奖项名称不能重复');
                return;
            }
            const twoAwardsNames = this.twoAwards.map((a) => a.name).filter((name) => name);
            if (new Set(twoAwardsNames).size !== twoAwardsNames.length) {
                this.$api.notify.error('网站开发组奖项名称不能重复');
                return;
            }
            const directionNames = this.directions.map((d) => d.name).filter((name) => name);
            if (new Set(directionNames).size !== directionNames.length) {
                this.$api.notify.error('方向名称不能重复');
                return;
            }
            // 触发表单验证
            const valid = await this.$refs.form.validate();
            if (valid) {
                // 表单验证通过，执行表单提交逻辑
                const contest = {
                    ...this.newContest,
                    date: this.date,
                    awards: [...this.oneAwards, ...this.twoAwards],
                    direction: this.directions
                };
                const res = await this.$api.contest.createContest(contest);
                if (res.success) {
                    this.$api.notify.success('创建成功');
                    this.$router.push('/manager/contestManagement');
                } else {
                    this.$api.notify.error('创建失败');
                }
            } else {
                // 表单验证失败
                this.$api.notify.error('表单验证失败，请检查输入');
            }
        }
    }
};
</script>

<style scoped></style>
