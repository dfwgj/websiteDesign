<template>
  <div class="ml-12 bg-white rounded-lg"> <!-- 添加左边距、边框、内边距、白色背景和圆角 -->
    <div class="h-8"></div>
    <h1 class="text-2xl font-bold text-[#5295CD]">您好! 管理员丰川祥子</h1>
    <div class="h-10"></div>
    <var-row :gutter="16">
      <var-col span="7">
        <var-card class="border-2 border-solid border-[#5295CD] p-4 bg-white rounded-lg"> <!-- 为卡片添加边框、内边距、白色背景和圆角 -->
          <h2 class="text-xl font-semibold text-[#0B0808]">今日访问量</h2>
          <p class="text-2xl text-[#0B0808]">114,514</p>
          <p class="text-[#0B0808]">总数：114514</p>
        </var-card>
      </var-col>

      <var-col span="7" class="ml-10">
        <var-card class="border-2 border-solid border-[#5295CD] p-4 bg-white rounded-lg"> <!-- 为卡片添加边框、内边距、白色背景和圆角 -->
          <h2 class="text-xl font-semibold text-[#0B0808]">今日新用户数</h2>
          <p class="text-2xl text-[#0B0808]">114,514</p>
          <p class="text-[#0B0808]">总数：114514</p>
        </var-card>
      </var-col>

      <var-col span="7" class="ml-10">
        <var-card class="border-2 border-solid border-[#5295CD] p-4 bg-white rounded-lg"> <!-- 为卡片添加边框、内边距、白色背景和圆角 -->
          <h2 class="text-xl font-semibold text-[#0B0808]">今日新队伍数</h2>
          <p class="text-2xl text-[#0B0808]">114,514</p>
          <p class="text-[#0B0808]">总数：114514</p>
        </var-card>
      </var-col>
    </var-row>
    <div class="h-10"></div>
    <var-row>
      <var-col span="16" class="ml-20">
        <var-card class="border-2 border-solid border-[#5295CD] p-4 bg-white rounded-lg"> <!-- 为卡片添加边框、内边距、白色背景和圆角 -->
          <h2 class="text-xl font-semibold text-[#0B0808]">数据统计</h2>
          <div class="h-40"></div>
          <div class="flex justify-between mt-4 text-[#0B0808]">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </var-card>
      </var-col>
    </var-row>
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
  methods: {}, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>