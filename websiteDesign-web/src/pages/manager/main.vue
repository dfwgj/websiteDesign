<template>
  <div class="flex h-screen">
    <div class="h-[100vh] w-[250px] bg-gradient-to-b text-center from-[#8FBBDF]/40 border-2 border-[#5295CD]  text-[#5295CD]">
      <div class="px-4 py-5"></div>
      <div class=" text-xl">网站设计大赛</div>
      <div class="px-4 py-4"></div>
      <span class="px-14 py-2 border-2  border-blue-500 bg-blue-200" @click="run('one')">主页</span>
      <div class="px-4 py-4"></div>
      <span class="px-10 py-2 border-2  border-blue-500 bg-blue-50" @click="run('two')">用户管理</span>
      <div class="px-4 py-4"></div>
      <span class="px-10 py-2 border-2  border-blue-500 bg-blue-50" @click="run('four')">队伍管理</span>
      <div class="px-4 py-4"></div>
      <span class="px-10 py-2 border-2  border-blue-500 bg-blue-50" @click="run('five')">课程管理</span>
      <div class="px-4 py-4"></div>
      <span class="px-10 py-2 border-2  border-blue-500 bg-blue-50" @click="run('six')">资料管理</span>
      <div class="px-4 py-4"></div>
      <span class="px-6 py-2 border-2  border-blue-500 bg-blue-50" @click="run('three')">比赛信息管理</span>
      <div class="h-[200px]"></div>
      <div>tuan</div>
    </div>
    <div class=" bg-white h-[100vh] w-[100vw] float-right  "><span>
        <router-view></router-view>
      </span></div>
  </div>
</template>
<script>
export default {
  name: '', // 组件的名称
  components: {}, // 用于注册子组件的地方
  data() { // 定义组件的响应式数据
    return {};
  },
  computed: {}, // 定义计算属性
  created() { }, // 组件的生命周期钩子，创建时调用
  mounted() { }, // 组件的生命周期钩子，挂载时调用
  updated() { }, // 组件的生命周期钩子，更新时调用
methods: {
        run(page) {
            switch (page) {
                case 'one':
                    this.$router.push({ name: 'one' });
                    break;
                case 'two':
                    this.$router.push({ name: 'two' });
                    break;
                case 'three':
                    this.$router.push({ name: 'three' });
                    break;  
                case 'four':
                    this.$router.push({ name: 'four' });
                    break; 
                case 'five':
                    this.$router.push({ name: 'five' });
                    break; 
                case 'six':
                    this.$router.push({ name: 'six' });
                    break;                       
            }
        },
        // ...
    }
};
</script>
<!-- css样式 -->
<style scoped></style>
