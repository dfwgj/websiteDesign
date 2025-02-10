<template>
    <div class="w-full max-w-screen-sm h-full mx-auto py-10">
        <!-- 图标部分 -->
        <div class="mx-10 flex justify-center items-center">
            <div v-for="(icon, index) in icons" :key="index" class="w-1/6 h-1/6" @click="loadCourseByType(icon.type)">
                <img :src="icon.iconLink" class="w-11/12 h-11/12 transition-all" :class="{'brightness-75' : selectedType ===icon.type,'brightness-100' : selectedType !== icon.type}"/>
            </div>
        </div>
        <!-- 课程资源部分 -->
        <div class="h-full overflow-auto flex-col mx-10 mt-5 flex-1">
            <div v-for="(course, index) in coursesByType" :key="index" class="w-full flex justify-between items-center border-b-2 border-gray-200">
                <div class="w-full h-full flex justify-between items-center">
                    <var-card ripple variant="outlined" @click="openNewTab(course.link)">
                        <div class="w-full h-full flex flex-col justify-between items-start">
                            <div class="w-full h-1/2 flex justify-between items-center">
                                <div class="w-1/2 h-full flex justify-start items-center">
                                    <span class="text-lg font-bold" style="color:black">{{ course.courseName }}</span>
                                </div>
                                <div class="w-1/2 h-full flex justify-end items-center">
                                    <span class="text-sm" style="color:black">{{ formatDate(course.createdAt) }}</span>
                                </div>
                            </div>
                            <div class="w-full h-1/2 flex justify-between items-center">
                                <div class="w-2/3 h-full flex justify-start items-center">
                                    <span class="text-sm" style="color:#5295CD">{{ course.type }}</span>
                                </div>
                                <div class="w-1/3 h-full flex justify-end items-center">
                                    <span class="text-sm" style="color:black">{{ course.userName }}</span>
                                </div>
                            </div>
                        </div>
                    </var-card>
                </div>
            </div>
            <div class="h-28 sm:h-32"></div>
        </div>
        <!-- 底部固定栏 -->
        <div class="absolute w-screen bottom-0 left-0 flex justify-center items-center bg-[#F7FFFF]">
            <div class="w-full mx-5 max-w-screen-sm">
                <var-divider description="课程资料">
                </var-divider>
            </div>
        </div>
    </div>
    
</template>

<script>
import { formatDate, openNewTab } from '@/utils/common';

import photoshopIcon from '@/assets/photoshop.svg';
import vuejsIcon from '@/assets/vuejs.svg';
import springbootIcon from '@/assets/springboot.svg';
import mysqlIcon from '@/assets/mysql.svg';
import linuxIcon from '@/assets/linux.svg';
import resourcesIcon from '@/assets/resources.svg';

export default {
    name: 'CourseResourcesPage', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            icons: [
                {
                    type: 'UI设计',
                    iconLink: photoshopIcon
                },
                {
                    type: '前端开发',
                    iconLink: vuejsIcon
                },
                {
                    type: '后端开发',
                    iconLink: springbootIcon
                },
                {
                    type: '数据库',
                    iconLink: mysqlIcon
                },
                {
                    type: '服务器部署',
                    iconLink: linuxIcon
                },
                {
                    type: '课程资料',
                    iconLink: resourcesIcon
                
                }
            ],
            courses: [], // 原始的课程信息
            coursesByType: [] // 某个分类的课程信息
        };
    },
    created() {}, // 组件的生命周期钩子，创建时调用
    async mounted() {
        await this.getCourses();
        this.loadCourseByType('UI设计');
    }, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        // 格式化日期
        formatDate,
        // 打开新的标签页
        openNewTab,
        // 获取课程信息
        async getCourses(){
            const res = await this.$api.course.getCourse();
            this.courses = res;
        },
        // 加载某个分类的课程
        loadCourseByType(type){
            const coursesByType = this.courses.filter(course => course.type === type);
            this.coursesByType = coursesByType;
            this.selectedType = this.selectedType === type ? null : type; // 切换选择状态时，当前分类的标签变暗
        }
    } // 定义组件的方法
};
</script>

<style scoped>
</style>
