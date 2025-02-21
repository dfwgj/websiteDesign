<template>
    <div class="min-h-screen bg-white">
        <!-- Header Navigation -->
        <header class="container mx-auto px-4 py-6">
            <nav class="flex justify-between items-center">
                <h1 class="text-[#77ADFF] text-2xl font-bold">第十四届网站设计大赛</h1>
                <div class="flex gap-8">
                    <a href="#" class="text-[#77ADFF] hover:opacity-80">首页</a>
                    <a href="#" class="text-[#77ADFF] hover:opacity-80">大赛详细</a>
                    <a href="#" class="text-[#77ADFF] hover:opacity-80">课程资料</a>
                    <a href="#" class="text-[#77ADFF] hover:opacity-80">报名</a>
                </div>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-12">
            <!-- DESIGN Text -->
            <div class="text-center mb-16">
                <h2
                    class="text-[#71A9D7] text-[120px] font-bold tracking-wider"
                    style="
                        text-shadow:
                            -2px -2px 0 #71a9d7,
                            2px -2px 0 #71a9d7,
                            -2px 2px 0 #71a9d7,
                            2px 2px 0 #71a9d7;
                        color: white;
                    ">
                    DESIGN
                </h2>
            </div>

            <!-- Cards Fan -->
            <div class="relative h-[400px] flex justify-center items-center">
                <div
                    v-for="(card, index) in cards"
                    :key="card.title"
                    class="absolute w-[200px] h-[300px] bg-white border-2 border-[#77ADFF] rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500"
                    :style="{
                        transform: `rotate(${(index - 2) * 15}deg) translateX(${(index - 2) * 20}px)`,
                        zIndex: index
                    }">
                    <component v-if="card.icon" :is="card.icon" class="w-12 h-12 text-[#77ADFF]" />
                    <span class="text-[#77ADFF] text-center font-medium">{{ card.title }}</span>
                    <div v-if="card.extraIcons" class="flex gap-2">
                        <img v-for="icon in card.extraIcons" :key="icon" :src="icon" class="w-6 h-6" alt="tool icon" />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { Server, Database, Code, Layout, PenTool } from 'lucide-vue-next';

const cards = [
    {
        title: '服务器部署',
        icon: Server
    },
    {
        title: '数据库开发',
        icon: Database
    },
    {
        title: '后端开发',
        icon: Code
    },
    {
        title: '前端开发',
        icon: Layout
    },
    {
        title: '网页设计',
        icon: PenTool,
        extraIcons: ['https://v0.blob.com/ai-icon.png', 'https://v0.blob.com/ps-icon.png']
    }
];
</script>

<style>
</style>
