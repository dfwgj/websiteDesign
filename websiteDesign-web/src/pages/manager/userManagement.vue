<template>
  <div class="relative bg-white rounded-lg ml-10"><!-- 使用 flex 布局将标题和搜索框放在同一行 -->
    <div class="p-9 flex items-center justify-between"><!-- 标题 -->
      <h1 class="text-2xl font-bold text-[#5295CD]">用户管理</h1><!-- 搜索框 -->
      <div class="relative">
        <input type="text" placeholder="搜索..."
          class="rounded-lg px-3 py-2 text w-64 mr-10 border-2 border-solid border-[#5295CD]" /><!-- 搜索按钮 -->
        <button class="absolute inset-y-0 right-0 pr-3 flex items-center "><!-- 搜索图标 -->
        </button>
      </div>
    </div><!-- 分隔空间 -->
    <div class="h-10"></div>
  </div>

  <div class="border-[2px] border-[#5295CD] w-[75vw] h-[70vh] ml-[5vw] rounded-lg">

    <table class="w-full text-left border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr class="bg-white text-[#0B0808] border-b border-[#5295CD]">
          <th class="px-4 py-2">学号</th>
          <th class="px-4 py-2">姓名</th>
          <th class="px-4 py-2">队伍名称</th>
          <th class="px-4 py-2">注册时间</th>
          <th class="px-4 py-2">状态</th>
          <th class="px-4 py-2">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-b border-[#5295CD]">
          <td class="px-4 py-2">23209060181</td>
          <td class="px-4 py-2">丰川祥子</td>
          <td class="px-4 py-2">Ave mujica</td>
          <td class="px-4 py-2">2025/1/1</td>
          <td class="px-4 py-2">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">封禁</span>
          </td>
          <td class="px-4 py-2">
            <button
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">操作</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 flex justify-center items-center">
      <div class="space-x-4">
        <button class="text-gray-500">&lt;</button>
        <span class="font-medium">1</span>
        <span>/ 1</span>
        <button class="text-gray-500">&gt;</button>
        <span>10条 / 页 -</span>
        <!-- 下拉菜单选择每页显示的条目数 -->
      </div>
    </div>
  </div>
</template>
<script>
</script>
<!-- css样式 -->
<style scoped></style>