<template>
    <div class="h-full w-full p-[2%] overflow-auto">
        <div class="flex flex-col items-center w-full">
            <var-loading description="LOADING" :loading="loading" color="#5295CD">
                <div class="flex items-center h-[5vh] w-full">
                    <img class="h-[5vh] w-[5vh]" @click="back" src="@/assets/back.svg" alt="" />
                    <div class="flex-grow flex justify-center">
                        <p class="text-3xl font-bold text-[#5295CD]">{{ contest.name }}</p>
                    </div>
                </div>
                <var-form ref="form" scroll-to-error="start">
                    <div class="flex flex-col w-full p-[2%] h-[85vh]">
                        <p class="ml-[1vw] text-2xl font-bold">比赛基本信息</p>
                        <div class="grid grid-cols-2 gap-[2vw] p-[2%] w-full h-[100%]">
                            <var-input v-model="updateContest.name" clearable focus-color="#5295CD" placeholder="请输入比赛名称" :rules="(v) => !!v || '比赛名称不能为空'" />
                            <var-input v-model="updateContest.topic" clearable focus-color="#5295CD" placeholder="请输入比赛主题" :rules="(v) => !!v || '比赛主题不能为空'" />
                            <var-select placeholder="请选择一个年份" v-model="updateContest.year" focus-color="#5295CD">
                                <var-option v-for="(year, index) in years" :label="year" :value="year">
                                    {{ year }}
                                </var-option>
                            </var-select>
                            <var-input v-model="updateContest.doubleKnots" focus-color="#5295CD" clearable placeholder="请输入双节全称" :rules="(v) => !!v || '双节全称不能为空'" />
                            <var-input v-model="updateContest.organizers" focus-color="#5295CD" clearable placeholder="请输入主办方" :rules="(v) => !!v || '主办方不能为空'" />
                            <var-input v-model="updateContest.contractors" focus-color="#5295CD" clearable placeholder="请输入承办方" :rules="(v) => !!v || '承办方不能为空'" />
                            <var-input variant="outlined" v-model="updateContest.introduce" focus-color="#5295CD" clearable rows="8" textarea placeholder="请输入比赛简介" :rules="(v) => !!v || '比赛简介不能为空'" />
                            <!-- 图片上传 -->
                            <div class="grid grid-cols-2 gap-[2vw]">
                                <div class="flex flex-col items-center justify-center px-[33%]">
                                    <var-uploader v-model="qrLink" maxlength="1"></var-uploader>
                                    <var-button text outline text-color="#5295CD" @click="uploadQrLink" :maxsize="1000000" accept="image/*" style="margin-top: 1rem">上传咨询群二维码</var-button>
                                </div>
                                <div class="flex flex-col items-center justify-center px-[33%]">
                                    <var-uploader v-model="userLink" maxlength="1"></var-uploader>
                                    <var-button text outline text-color="#5295CD" @click="uploadUserLink" :maxsize="1000000" accept="image/*" style="margin-top: 1rem">上传用户群二维码</var-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full p-[1%] h-[45vh]">
                        <p class="ml-[1vw] text-2xl font-bold">比赛组别信息</p>
                        <div class="grid grid-cols-2 gap-[2vw] p-[2%] w-full h-[100%]">
                            <var-input v-for="(group, index) in updateContest.group" variant="outlined" textarea :key="index" v-model="group.groupRemark" clearable focus-color="#5295CD" :placeholder="group.groupName + '的备注'" :rules="(v) => !!v || group.groupName + '的备注不能为空'" />
                        </div>
                    </div>
                    <div class="flex flex-col w-full p-[1%] h-[80vh]">
                        <p class="ml-[1vw] text-2xl font-bold">比赛流程信息</p>
                        <div class="grid grid-cols-5 gap-[1vw] p-[1%] w-full h-[100%]">
                            <div v-for="(item, index) in updateContest.date" :key="index" class="border-[2px] border-[#5295CD] rounded-[1vw] p-[1vw] w-[100%] h-[100%]">
                                <div class="flex items-center justify-between w-full h-[5vh]">
                                    <p class="text-xl font-bold text-[#5295CD]">流程{{ index + 1 }}</p>
                                    <img v-show="index !== 0" src="@/assets/path.svg" class="h-[3vh]" @click="deleteDate(index)" />
                                </div>
                                <var-input v-model="updateContest.date[index].name" clearable focus-color="#5295CD" placeholder="请输入流程名称" :rules="(v) => !!v || '日期名称不能为空'" />
                                <!-- 选择日期按钮 -->
                                <var-button v-show="updateContest.date[index].date === ''" class="my-[1vh]" text outline block text-color="#5295CD" @click="openDatePicker(index)">选择该流程时间</var-button>
                                <!-- 显示已选日期 -->
                                <var-input v-show="updateContest.date[index].date !== ''" v-model="updateContest.date[index].date" clearable focus-color="#5295CD" placeholder="请输入日期" @clear="cancelDate(index)" />
                                <var-input v-model="updateContest.date[index].place" clearable focus-color="#5295CD" placeholder="请输入地点" :rules="(v) => !!v || '地点不能为空'" />
                                <var-input v-model="updateContest.date[index].txt" clearable focus-color="#5295CD" textarea placeholder="请输入内容" :rules="(v) => !!v || '内容不能为空'" />
                            </div>
                            <!-- 图片按钮 -->
                            <div v-if="updateContest.date?.length < 5" class="flex items-center justify-center">
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
                            <div v-for="(item, index) in updateContest.direction" :key="index" class="border-[2px] border-[#5295CD] rounded-[1vw] p-[1vw] w-[100%] h-[100%]">
                                <div class="flex items-center justify-between w-full h-[5vh]">
                                    <p class="text-xl font-bold text-[#5295CD]">方向{{ index + 1 }}</p>
                                    <img v-show="index !== 0" src="@/assets/path.svg" class="h-[3vh]" @click="deleteDirection(index)" />
                                </div>
                                <var-input v-model="updateContest.direction[index].name" clearable focus-color="#5295CD" placeholder="请输入方向名称" :rules="(v) => !!v || '方向名称不能为空'" />
                                <var-input v-model="updateContest.direction[index].txt" clearable focus-color="#5295CD" textarea placeholder="请输入内容" :rules="(v) => !!v || '内容不能为空'" />
                            </div>
                            <!-- 添加按钮 -->
                            <div v-if="updateContest.direction?.length < 5" class="flex items-center justify-center">
                                <img src="@/assets/添加.svg" class="h-[10vh]" @click="addDirection" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full p-[2%] px-[20vw]">
                        <var-button size="large" text outline block text-color="#5295CD" @click="updateContestInfo">确认修改</var-button>
                    </div>
                </var-form>
            </var-loading>
        </div>
        <!-- 修改信息弹窗 -->
        <var-popup class="rounded-xl w-[20vw] h-[40vh]" v-model:show="showUpdateInfo">
            <var-loading :description="updatePopupMsg" type="circle" radius="3vw" :loading="updateLoading" color="#5295CD">
                <div class="flex flex-col items-center justify-center h-[40vh]">
                    <var-result v-show="updateLoading == false" title="成功" description="修改比赛信息成功">
                    <template #footer>
                        <var-button type="success" @click="showUpdateInfo = false">确定</var-button>
                    </template>
                </var-result>
                </div>
            </var-loading>
        </var-popup>
        <!-- 日期选择弹窗 -->
        <var-popup class="rounded-xl w-[30vw] h-[50vh]" v-model:show="showForm" title="添加日期">
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
            loading: false,
            showUpdateInfo: false,
            updateLoading: false, // 弹窗加载状态，默认true表示正在更新
            updatePopupMsg: '', // 弹窗中显示的进度消息
            contest: {},
            updateContest: {},
            oneAwards: [],
            twoAwards: [],
            years: [],
            qrLink: [
                {
                    url: '',
                    cover: ''
                }
            ],
            userLink: [
                {
                    url: '',
                    cover: ''
                }
            ],
            selectedDate: undefined, // 选中的日期
            currentEditIndex: -1 // 当前编辑的流程索引
        };
    },
    created() {
        const id = this.$route.query.id;
        this.contestInfo(id);
        this.years = Array.from({ length: 26 }, (_, i) => String(2025 + i));
    },
    methods: {
        async contestInfo(id) {
            this.loading = true;
            const res = await this.$api.contest.contestInfo({ id: id });
            this.loading = false;
            if (res.success) {
                this.contest = res.data[0];
                this.updateContest = JSON.parse(JSON.stringify(this.contest));
                this.oneAwards = this.updateContest.awards.filter((a) => a.type === 'WYSJ');
                this.twoAwards = this.updateContest.awards.filter((a) => a.type === 'WZKF');
                this.qrLink[0].url = this.contest.qrLink;
                this.qrLink[0].cover = this.contest.qrLink;
                this.userLink[0].url = this.contest.userLink;
                this.userLink[0].cover = this.contest.userLink;
            } else {
                this.$api.notify.error('获取比赛信息失败');
            }
        },
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
            if (this.updateContest.date.length >= 5) {
                this.$api.notify.error('最多只能添加 5 个流程');
                return;
            }
            this.updateContest.date.push({
                name: '',
                date: '',
                place: '',
                txt: ''
            });
        },
        deleteDate(index) {
            this.updateContest.date.splice(index, 1);
        },
        addDirection() {
            if (this.updateContest.direction.length >= 5) {
                this.$api.notify.error('最多只能添加 4 个方向');
                return;
            }
            this.updateContest.direction.push({
                name: '',
                txt: ''
            });
        },
        deleteDirection(index) {
            this.updateContest.direction.splice(index, 1);
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
                if (this.updateContest.date.length > 1) {
                    for (let i = 0; i < this.updateContest.date.length; i++) {
                        if (i !== this.currentEditIndex && this.updateContest.date[i].date) {
                            const existingDate = new Date(this.updateContest.date[i].date);
                            if (selected < existingDate && this.currentEditIndex > i) {
                                this.$api.notify.error('日期不能早于已有流程日期');
                                return;
                            }
                        }
                    }
                }
                this.updateContest.date[this.currentEditIndex].date = selected.toISOString().split('T')[0];
            }
            this.showForm = false;
            this.currentEditIndex = -1;
            this.selectedDate = undefined;
        },
        cancelDate(index) {
            this.updateContest.date[index].date = '';
            this.currentEditIndex = -1;
            this.selectedDate = undefined;
        },
        async uploadQrLink() {
            if (this.qrLink[0].url !== this.contest.qrLink) {
                const rawFile = this.qrLink[0]?.file || toRaw(this.qrLink[0]);
                const formData = new FormData();
                formData.append('files', rawFile);
                formData.append('id', this.contest.id);
                const res = await this.$api.contest.uploadQrLink(formData);
                if (res.success) {
                    this.contestInfo(this.$route.query.id);
                    this.$api.notify.success('上传图片成功');
                } else {
                    this.$api.notify.error('上传图片失败');
                }
            } else {
                this.$api.notify.error('图片未修改，无需上传');
            }
        },
        async uploadUserLink() {
            if (this.userLink[0].url !== this.contest.userLink) {
                const rawFile = this.userLink[0]?.file || toRaw(this.userLink[0]);
                const formData = new FormData();
                formData.append('files', rawFile);
                formData.append('id', this.contest.id);
                const res = await this.$api.contest.uploadUserLink(formData);
                if (res.success) {
                    this.contestInfo(this.$route.query.id);
                    this.$api.notify.success('上传图片成功');
                } else {
                    this.$api.notify.error('上传图片失败');
                }
            } else {
                this.$api.notify.error('图片未修改，无需上传');
            }
        },
        // 比较两个对象的差异，返回变化的字段（不包含函数属性）
        getDiff(oldItem, newItem) {
            const diff = {};
            Object.keys(newItem).forEach((key) => {
                if (typeof newItem[key] === 'function') return;
                if (Array.isArray(newItem[key])) return;
                if (JSON.stringify(newItem[key]) !== JSON.stringify(oldItem[key])) {
                    diff[key] = newItem[key];
                }
            });
            return diff;
        },

        // 对比两个数组，处理新增、修改和删除逻辑
        getArrayDiff(oldArray = [], newArray = []) {
            const diff = [];
            // 生成原始数据的映射，便于快速查找
            const oldMap = new Map();
            oldArray.forEach((item) => {
                if (item.id) {
                    oldMap.set(item.id, item);
                }
            });
            // 用于标记新数据中已存在的原始 id
            const newIds = new Set();
            // 处理新数组中的项
            newArray.forEach((newItem) => {
                if (newItem.id) {
                    // 有 id 的项，视为已存在的项可能被修改
                    newIds.add(newItem.id);
                    const oldItem = oldMap.get(newItem.id);
                    if (oldItem) {
                        const itemDiff = this.getDiff(oldItem, newItem);
                        if (Object.keys(itemDiff).length > 0) {
                            // 有修改，则附上 id 和修改字段
                            diff.push({ id: newItem.id, ...itemDiff });
                        }
                    } else {
                        // 边界情况：newItem 有 id 但在原数组中找不到，视为新增，移除 id 后提交
                        const newItemCopy = { ...newItem };
                        delete newItemCopy.id;
                        diff.push(newItemCopy);
                    }
                } else {
                    // 无 id 的项，直接视为新增项
                    diff.push(newItem);
                }
            });
            // 检查原数组中被删除的项：存在于原数组，但新数组中未出现的 id
            oldArray.forEach((oldItem) => {
                if (oldItem.id && !newIds.has(oldItem.id)) {
                    // 以删除格式提交（附上原 id 和 vailFlag:0）
                    diff.push({ id: oldItem.id, vailFlag: 0 });
                }
            });
            return diff;
        },
        // 修改后的提交方法，只提交修改过的信息
        async updateContestInfo() {
            // 表单验证
            const valid = await this.$refs.form.validate();
            if (!valid) {
                this.$api.notify.error('表单验证失败，请检查输入');
                return;
            }
            // 检查各模块数据重复性
            const dateNames = this.updateContest.date.map((d) => d.name).filter((name) => name);
            if (new Set(dateNames).size !== dateNames.length) {
                this.$api.notify.error('流程名称不能重复');
                return;
            }
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
            const directionNames = this.updateContest.direction.map((d) => d.name).filter((name) => name);
            if (new Set(directionNames).size !== directionNames.length) {
                this.$api.notify.error('方向名称不能重复');
                return;
            }
            // 获取各模块的差异
            const diffData = this.getDiff(this.contest, this.updateContest);
            const updatedAwards = [...this.oneAwards, ...this.twoAwards];
            const awardsDiff = this.getArrayDiff(this.contest.awards, updatedAwards);
            const directionDiff = this.getArrayDiff(this.contest.direction, this.updateContest.direction);
            const dateDiff = this.getArrayDiff(this.contest.date, this.updateContest.date);
            const groupDiff = this.getDiff(this.contest.group, this.updateContest.group);

            // 如果所有部分都没有修改，则提示错误
            if (Object.keys(diffData).length === 0 && awardsDiff.length === 0 && directionDiff.length === 0 && dateDiff.length === 0 && Object.keys(groupDiff).length === 0) {
                this.$api.notify.error('没有任何修改内容');
                return;
            }

            // 打开弹窗，显示加载信息
            this.showUpdateInfo = true;
            this.updateLoading = true;

            try {
                // 逐个处理更新，更新弹窗中的提示信息
                if (Object.keys(diffData).length > 0) {
                    this.updatePopupMsg = '比赛主体信息修改中...';
                    let res = await this.updateThisContestInfo(this.contest.id, diffData);
                    if (res !== true) throw new Error('比赛主体信息更新失败');
                }
                if (awardsDiff.length > 0) {
                    this.updatePopupMsg = '奖项信息修改中...';
                    let res = await this.updateAwardInfo(this.contest.id, awardsDiff);
                    if (res !== true) throw new Error('奖项信息更新失败');
                }
                if (directionDiff.length > 0) {
                    this.updatePopupMsg = '比赛方向信息修改中...';
                    let res = await this.updateContestDirection(this.contest.id, directionDiff);
                    if (res !== true) throw new Error('比赛方向信息更新失败');
                }
                if (dateDiff.length > 0) {
                    this.updatePopupMsg = '比赛流程信息修改中...';
                    let res = await this.updateContestDate(this.contest.id, dateDiff);
                    if (res !== true) throw new Error('比赛流程信息更新失败');
                }
                if (Object.keys(groupDiff).length > 0) {
                    this.updatePopupMsg = '比赛组别信息修改中...';
                    let res = await this.updateGroupRemark(groupDiff);
                    if (res !== true) throw new Error('比赛组别信息更新失败');
                }
                this.contestInfo(this.$route.query.id);
                this.updateLoading = false;
            } catch (error) {
                this.updateLoading = false;
                this.showUpdateInfo = false;
                this.$api.notify.error(error.message);
            }
        },
        //更新奖项信息
        async updateAwardInfo(id, award) {
            console.log({ id: id, award: award });
            const res = await this.$api.contest.updateAwardInfo({ id: id, award: award });
            if (res.success) {
                return true;
            } else {
                return false;
            }
        },
        // 更新比赛方向
        async updateContestDirection(id, direction) {
            console.log({ id: id, direction: direction });
            const res = await this.$api.contest.updateContestDirection({ id: id, direction: direction });
            if (res.success) {
                return true;
            } else {
                return false;
            }
        },
        // 更新比赛流程
        async updateContestDate(id, date) {
            console.log({ id: id, date: date });
            const res = await this.$api.contest.updateContestDate({ id: id, date: date });
            if (res.success) {
                return true;
            } else {
                return false;
            }
        },
        //更新比赛主体信息
        async updateThisContestInfo(id, info) {
            console.log({ id: id, info: info });
            const res = await this.$api.contest.updateContestInfo({ id: id, info: info });
            if (res.success) {
                return true;
            } else {
                return false;
            }
        },
        // 更新组别备注
        async updateGroupRemark(group) {
            console.log(group);
            const res = await this.$api.contest.updateGroupRemark({ group: group });
            if (res.success) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style scoped></style>
