<template>
    <div class="flex h-screen">
        <div class="h-[100vh] w-[15vw] bg-gradient-to-b text-center from-[#8FBBDF]/40 border-2 border-[#5295CD] text-[#5295CD]">
            <div class="text-xl mt-[5vh]">网站设计大赛管理系统</div>
            <div class="mt-[2vh] flex flex-col justify-center items-center w-full">
                <span class="w-[90%] h-[5vh] mb-[1vh] flex justify-center items-center border-2 border-blue-500" @click="gotoHome" :class="{ 'bg-blue-50': select === 'home' }">主页</span>
                <span class="w-[90%] h-[5vh] mb-[1vh] flex justify-center items-center border-2 border-blue-500" @click="gotoUser" :class="{ 'bg-blue-50': select === 'user' }">用户管理</span>
                <span class="w-[90%] h-[5vh] mb-[1vh] flex justify-center items-center border-2 border-blue-500" @click="gotoTeam" :class="{ 'bg-blue-50': select === 'team' }">队伍管理</span>
                <span class="w-[90%] h-[5vh] mb-[1vh] flex justify-center items-center border-2 border-blue-500" @click="gotoCourse" :class="{ 'bg-blue-50': select === 'course' }">课程管理</span>
                <span class="w-[90%] h-[5vh] mb-[1vh] flex justify-center items-center border-2 border-blue-500" @click="gotoMaterials" :class="{ 'bg-blue-50': select === 'materials' }">资料管理</span>
                <span class="w-[90%] h-[5vh] mb-[1vh] flex justify-center items-center border-2 border-blue-500" @click="gotoContest" :class="{ 'bg-blue-50': select === 'contest' }">比赛信息管理</span>
                <div class="mt-[2vh] h-[70vh] flex justify-center items-center">
                    <img class="h-[6vh]" src="@/assets/exit.svg" @click="goHome" />
                </div>
            </div>
        </div>
        <div class="bg-white h-[100vh] w-[85vw] float-right overflow-auto">
            <span>
                <router-view></router-view>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ManagerLayout',
    data() {
        return {
            select: '' // 初始值为空，由 updateSelectFromRoute 方法设置
        };
    },
    async created() {
        await this.$store.contest.getContest();
        this.updateSelectFromRoute(); // 初始化时根据路由设置选中状态
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        gotoHome() {
            this.select = 'home';
            this.saveSelect();
            this.$router.push('/manager/managerHome');
        },
        gotoUser() {
            this.select = 'user';
            this.saveSelect();
            this.$router.push('/manager/userManagement');
        },
        gotoTeam() {
            this.select = 'team';
            this.saveSelect();
            this.$router.push('/manager/teamManagement');
        },
        gotoCourse() {
            this.select = 'course';
            this.saveSelect();
            this.$router.push('/manager/courseManagement');
        },
        gotoMaterials() {
            this.select = 'materials';
            this.saveSelect();
            this.$router.push('/manager/materialsManagement');
        },
        gotoContest() {
            this.select = 'contest';
            this.saveSelect();
            this.$router.push('/manager/contestManagement');
        },
        saveSelect() {
            localStorage.setItem('selectedMenu', this.select);
        },
        updateSelectFromRoute() {
            let selectValue = '';
            switch (this.$route.path) {
                case '/manager/managerHome':
                    selectValue = 'home';
                    break;
                case '/manager/userManagement':
                    selectValue = 'user';
                    break;
                case '/manager/teamManagement':
                    selectValue = 'team';
                    break;
                case '/manager/courseManagement':
                    selectValue = 'course';
                    break;
                case '/manager/materialsManagement':
                    selectValue = 'materials';
                    break;
                case '/manager/contestManagement':
                case '/manager/createContest':
                case '/manager/contestDetail':
                    selectValue = 'contest';
                    break;
                default:
                    selectValue = 'home'; // 默认选中主页
            }
            this.select = selectValue;
            this.saveSelect(); // 更新存储的值
        }
    },
    watch: {
        $route(to) {
            this.updateSelectFromRoute();
        }
    }
};
</script>

<style scoped></style>
