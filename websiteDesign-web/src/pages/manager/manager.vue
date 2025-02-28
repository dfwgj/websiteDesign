<template>
  <div class="flex h-screen">
      <div class="h-[100vh] w-[250px] bg-gradient-to-b text-center from-[#8FBBDF]/40 border-2 border-[#5295CD] text-[#5295CD]">
          <div class="px-4 py-5"></div>
          <div class="text-xl">网站设计大赛管理系统</div>
          <div class="px-4 py-4"></div>
          <span class="px-14 py-2 border-2 border-blue-500 bg-blue-50" @click="gotoHome" :class="{ 'bg-blue-300': select === 'home' }">主页</span>
          <div class="px-4 py-4"></div>
          <span class="px-10 py-2 border-2 border-blue-500 bg-blue-50" @click="gotoUser" :class="{ 'bg-blue-300': select === 'user' }">用户管理</span>
          <div class="px-4 py-4"></div>
          <span class="px-10 py-2 border-2 border-blue-500 bg-blue-50" @click="gotoTeam" :class="{ 'bg-blue-300': select === 'team' }">队伍管理</span>
          <div class="px-4 py-4"></div>
          <span class="px-10 py-2 border-2 border-blue-500 bg-blue-50" @click="gotoCourse" :class="{ 'bg-blue-300': select === 'course' }">课程管理</span>
          <div class="px-4 py-4"></div>
          <span class="px-10 py-2 border-2 border-blue-500 bg-blue-50" @click="gotoMaterials" :class="{ 'bg-blue-300': select === 'materials' }">资料管理</span>
          <div class="px-4 py-4"></div>
          <span class="px-6 py-2 border-2 border-blue-500 bg-blue-50" @click="gotoContest" :class="{ 'bg-blue-300': select === 'contest' }">比赛信息管理</span>
          <div class="h-[200px]"></div>
      </div>
      <div class="bg-white h-[100vh] w-[100vw] float-right">
          <span>
              <router-view></router-view>
          </span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ManagerLayout', // 修正组件名称，避免为空
  data() {
      return {
          select: this.getInitialSelect() // 从路由或 localStorage 获取初始值
      };
  },
  methods: {
      gotoHome() {
          this.select = 'home';
          this.saveSelect(); // 保存到 localStorage
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
          // 将当前选中的菜单项存储到 localStorage
          localStorage.setItem('selectedMenu', this.select);
      },
      getInitialSelect() {
          // 从 localStorage 或路由获取当前选中的菜单项
          return localStorage.getItem('selectedMenu') || 'home'; // 默认选中主页
      }
  },
  watch: {
      $route(to) {
          // 根据路由路径动态更新 select 的值
          let selectValue = '';
          switch (to.path) {
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
                  selectValue = 'contest';
                  break;
              default:
                  selectValue = '';
          }
          this.select = selectValue;
          this.saveSelect(); // 更新存储的值
      }
  }
};
</script>

<style scoped>
</style>