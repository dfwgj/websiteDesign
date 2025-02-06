<template>
  <div class="container mx-auto w-[1920px] h-[1080px] relative">
    <!-- 页面标题 -->
    <div class="text-[#5295CD] text-2xl md:text-3xl mb-4 text-left">第十四届网站设计大赛</div>

    <!-- 布局区域 -->
    <div class="flex flex-col md:flex-row h-full">
      <!-- 左边按钮组 -->
      <div class="flex md:flex-col items-center md:items-start md:space-y-8 space-x-4 md:space-x-0 md:pl-[120px] md:pt-[75px] flex-shrink-0">
        <button class=" w-[158px] h-[170px] bg-transparent border-4 border-[#5D9CD0] rounded-[10px] text-black font-bold text-3xl flex items-center justify-center focus:bg-[#E8F3FF] active:bg-[#E8F3FF]">
          主题方向
        </button>
        <button class="w-[158px] h-[170px] bg-transparent border-4 border-[#5D9CD0] rounded-[10px] text-black font-bold text-3xl flex items-center justify-center focus:bg-[#E8F3FF] active:bg-[#E8F3FF]">
          大赛分组
        </button>
        <button class="w-[158px] h-[170px] bg-transparent border-4 border-[#5D9CD0] rounded-[10px] text-black font-bold text-3xl flex items-center justify-center focus:bg-[#E8F3FF] active:bg-[#E8F3FF]">
          奖项设立
        </button>
        <button class="w-[158px] h-[170px] bg-transparent border-4 border-[#5D9CD0] rounded-[10px] text-black font-bold text-3xl flex items-center justify-center focus:bg-[#E8F3FF] active:bg-[#E8F3FF]">
          大赛流程
        </button>
      </div>

      <!-- 右边信息区域 -->
      <div
        class="flex-grow w-full md:w-[1482px] bg-transparent border-4 border-[#5D9CD0] rounded-[10px] mx-auto mt-4 md:mt-[75px] md:ml-[30px]"
        style="height: calc(100% - 99px - 175px);"
      >
        <!-- 内部信息 -->
        <div class="w-[248px] h-[50px] bg-transparent ">本届大赛主题：</div>
        <div class="w-[443px] h-[70px] text-[#5D9CD0]">为我设计，为我所用</div>
        <div>选手可以选择以下四个方向进行创作：</div>
        <!-- 主题选择区 -->
        <div>
          <button class="w-[206px]  h-[68px]">红色文化</button>
          <button class="w-[206px]  h-[68px]">校园风采</button>
          <button class="w-[206px]  h-[68px]">人工智能</button>
          <button class="w-[206px]  h-[68px]">健康医疗</button>
        </div>
        主题描述区
        <div class="w-[1412px] h-[233px] border-solid border-4 border-[#5D9CD0]">

        </div>
        比赛总体说明
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResponsiveDesignCompetition",
};
</script>

<style scoped>
/* 页面样式调整 */
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 禁止滚动 */
}

.container {
  width: 100vw;
  height: 100vh;
}

@media (max-width: 768px) {
  /* 针对小屏幕的样式调整 */
  .container {
    padding: 0;
  }
}
</style>




