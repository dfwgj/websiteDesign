<template>
    <div v-if="user.team.teamName"
        class="w-full h-5/6 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70 flex items-center justify-center">
        <p class="hidden lg:flex items-center justify-center text-center mx-auto text-3xl 2xl:text-5xl text-[#5295CD]">
            您已经报名成功,祝您比赛顺利！
            <img class="h-[8dvh]" :src="dianzangImg" />
        </p>
        <p class="lg:hidden text-center text-2xl text-[#5295CD]">
            您已经报名成功,
            <br />
            祝您比赛顺利！
        </p>
        <img class="lg:hidden h-[8dvh]" :src="dianzangImg" />
    </div>
    <div v-if="!user.team.teamName"
        class="w-full h-5/6 border-2 rounded-xl border-[#5295CD] bg-[#FFFFFF] bg-opacity-70 overflow-auto">
        <!-- 选择赛道 -->
        <var-loading description="LOADING" color="#5295CD" :loading="loading">
            <div class="w-full h-[5dvh] lg:h-[8dvh] flex items-end text-xl lg:text-xl ml-6 lg:mx-16 lg:p-4">请先选择赛道：
            </div>
            <div class="w-full h-[8dvh] grid grid-cols-2">
                <div v-for="group in groups" class="w-full h-full flex justify-center items-center">
                    <div class="w-[80%] lg:w-[40%] h-4/5 flex justify-center items-center text-xl lg:text-2xl text-[#5295CD] border-2 border-[#5295CD] rounded-2xl"
                        :class="{ 'bg-[#E8F3FF]': type === group.groupCode }" @click="changeGroup(group.groupCode)">{{
                        group.groupName }}</div>
                </div>
            </div>
            <!-- 队伍信息 -->
            <div class="mt-4 lg:grid lg:grid-cols-2 lg:gap-2">
                <div class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">队伍名</div>
                        <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                            class="lg:mr-8 h-[40px] lg:h-[5dvh] w-[70vw] lg:w-[20vw]" v-model="teamInfo.name"
                            :rules="[(v) => !!v || '队伍名不能为空', (v) => /^[a-zA-Z\u4e00-\u9fa5]{1,16}$/.test(v) || '队伍名格式不正确']" />
                    </div>
                </div>
                <div class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">队长</div>
                        <var-input size="small" variant="outlined" disabled focus-color="#5295CD" blur-color="#5295CD"
                            class="lg:mr-8 h-[40px] lg:h-[5dvh] w-[70vw] lg:w-[20vw]"
                            v-model="teamInfo.players[0].name" />
                    </div>
                </div>
                <div v-if="type === 'WZKF'" class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">队友1</div>
                        <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                            class="lg:mr-8 h-[40px] lg:h-[5dvh] w-[70vw] lg:w-[20vw]" v-model="teamInfo.players[1].name"
                            :rules="[(v) => !!v || '姓名不能为空', (v) => /^[\u4e00-\u9fa5]{2,16}$/.test(v) || '姓名格式不正确']" />
                    </div>
                </div>
                <div v-if="type === 'WZKF'" class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">队友1学号
                        </div>
                        <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                            class="lg:mr-8 h-[40px] lg:h-[5dvh] w-[70vw] lg:w-[20vw]"
                            v-model="teamInfo.players[1].studentId"
                            :rules="[(v) => !!v || '学号不能为空', (v) => /^\d{11}$/.test(v.trim()) || '学号格式不正确']" />
                    </div>
                </div>
                <div v-if="type === 'WZKF'" class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">队友2</div>
                        <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                            class="lg:mr-8 h-[40px] lg:h-[5dvh] w-[70vw] lg:w-[20vw]" v-model="teamInfo.players[2].name"
                            :rules="[(v) => !!v || '姓名不能为空', (v) => /^[\u4e00-\u9fa5]{2,16}$/.test(v) || '姓名格式不正确']" />
                    </div>
                </div>
                <div v-if="type === 'WZKF'" class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">队友2学号
                        </div>
                        <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                            class="lg:mr-8 h-[40px] lg:h-[5dvh] w-[70vw] lg:w-[20vw]"
                            v-model="teamInfo.players[2].studentId"
                            :rules="[(v) => !!v || '学号不能为空', (v) => /^\d{11}$/.test(v.trim()) || '学号格式不正确']" />
                    </div>
                </div>
                <div class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">作品方向
                        </div>
                        <var-select v-model="teamInfo.direction" clearable variant="outlined" size="small"
                            blur-color="#5295CD" focus-color="#5295CD"
                            class="w-[70vw] lg:w-[20vw] lg:h-[5dvh] lg:mr-8 flex items-center text-center bg-white text-black rounded-xl">
                            <var-option v-for="direct in directions" :label="direct.name"
                                :value="direct.directionCode" />
                        </var-select>
                    </div>
                </div>
                <div class="w-full h-full flex flex-col items-center justify-center mb-2">
                    <div>
                        <div class="flex items-center text-lg lg:text-xl">作品名称
                        </div>
                        <var-input size="small" variant="outlined" focus-color="#5295CD" blur-color="#5295CD"
                            class="w-[70vw] lg:w-[20vw] lg:mr-8 h-[40px] lg:h-[5dvh]" v-model="teamInfo.opusName"
                            :rules="[(v) => !!v || '作品名称不能为空', (v) => /^[a-zA-Z\u4e00-\u9fa5]{1,16}$/.test(v) || '作品名称格式不正确']" />
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <!-- 保持最小高度 -->
                <div v-show="type === 'WYSJ'" class="w-full h-[6dvh] lg:h-[16dvh] mt-4 transition-all duration-300">
                </div>
            </div>
            <div class="flex justify-center lg:justify-start lg:ml-[7%] p-4 text-md">注：队友需先进行注册才能进行报名，且报名后无法更改信息。</div>
            <!-- 提交按钮 -->
            <div class="w-full h-[6%] lg:justify-end flex justify-center items-center mb-10 lg:mb-0">
                <button
                    class="w-1/2 lg:w-[30%] lg:mr-20 py-2 rounded-full font-bold border-[#5295CD] border text-[#5295CD] text-xl bg-[#E8F3FF]"
                    @click="handleRevise">提交报名信息</button>
            </div>
        </var-loading>
    </div>
</template>
<script>
import dianzangImg from '@/assets/点赞.svg';
export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            dianzangImg: dianzangImg,
            groups: [], // 赛道组
            type: '', // 赛道类型
            loading: false, // 加载状态
            directions: [], // 作品方向
            teamInfo: {
                name: '',
                model: '',
                direction: '',
                opusName: '',
                players: [
                    {
                        studentId: '',
                        name: ''
                    },
                    {
                        studentId: '',
                        name: ''
                    },
                    {
                        studentId: '',
                        name: ''
                    }
                ]
            }
        };
    },
    computed: {
        contest() {
            return this.$store.contest;
        },
        user() {
            return this.$store.user;
        }
    }, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() {
        this.groups = this.contest.group;
        if (this.groups.length > 0) {
            this.type = this.groups[0].groupCode;
            this.teamInfo.model = this.type;
        }
        this.teamInfo.players[0].name = this.user.name;
        this.teamInfo.players[0].studentId = this.user.studentId;
        this.directions = this.contest.direction;
    }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {
        changeGroup(groupCode) {
            this.type = groupCode;
            this.teamInfo.model = this.type;
        },
        async getUserInfo() {
            const res = await this.$api.user.getUserInfo();
            if (res.success) {
                localStorage.setItem('token', res.data);
                this.$store.user.clearUserInfo();
                this.$store.user.decodeToken();
                return this.$store.user;
            } else {
                this.$api.notify.error(res.error);
            }
        },
        async handleRevise() {
            const { name, model, direction, opusName, players } = this.teamInfo;
            if (!name || !model || !direction || !opusName || !players[0].name || !players[0].studentId) {
                this.$api.notify.error('请填写完整信息');
                return;
            }
            if (model === 'WZKF' && (!players[1].name || !players[1].studentId || !players[2].name || !players[2].studentId)) {
                this.$api.notify.error('请填写完整信息');
                return;
            }
            if (
                !this.validate(name, /^[a-zA-Z\u4e00-\u9fa5]{1,16}$/) ||
                !this.validate(players[0].name, /^[\u4e00-\u9fa5]{2,16}$/) ||
                !this.validate(players[0].studentId, /^\d{11}$/) ||
                !this.validate(opusName, /^[a-zA-Z\u4e00-\u9fa5]{1,16}$/) ||
                (model === 'WZKF' && (!this.validate(players[1].name, /^[\u4e00-\u9fa5]{2,16}$/) || !this.validate(players[1].studentId, /^\d{11}$/) || !this.validate(players[2].name, /^[\u4e00-\u9fa5]{2,16}$/) || !this.validate(players[2].studentId, /^\d{11}$/)))
            ) {
                this.$api.notify.warning('请检查输入信息是否符合规范');
                return;
            }
            if (model === 'WZKF' && players[1].studentId === players[2].studentId) {
                this.$api.notify.warning('队友信息不能相同');
                return;
            }
            if (model === 'WYSJ') {
                this.teamInfo.players[1].name = '';
                this.teamInfo.players[1].studentId = '';
                this.teamInfo.players[2].name = '';
                this.teamInfo.players[2].studentId = '';
            }
            this.loading = true;
            const res = await this.$api.team.registerTeam(this.teamInfo);
            this.loading = false;
            if (res.success) {
                this.getUserInfo();
                this.$api.notify.success('报名成功，请等待审核');
            } else {
                this.$api.notify.error(res.error);
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
