<template>
    <div class="w-full h-full mx-auto py-6 lg:flex">
        <!-- 图标部分 -->
        <div
            class="lg:w-1/4 lg:max-h-[550px] lg:max-w-[256px] mx-10 lg:mt-5 lg:ml-16 lg:mr-2 flex lg:flex-col justify-center items-center  lg:space-y-[6%]">
            <div v-for="(icon, index) in icons" :key="index"
                class="w-full h-1/6 border-2 border-[#5295CD] rounded-[10px] sm:rounded-[20px] mx-[1%]"
                :class="{ 'bg-[#E8F3FF]': selectedType === icon.type }" @click="loadCourseByType(icon.type)">
                <div class="w-full h-full lg:flex lg:items-center lg:justify-center">
                    <div class="hidden lg:w-1/2 lg:shrink-0 lg:flex lg:items-center lg:justify-center">
                        <div class="text-[#5295CD] text-[1.4rem]">{{ icon.type }}</div>
                    </div>
                    <img :title="icon.type" :alt="icon.type" :src="icon.iconLink" class="lg:w-1/4 lg:max-h-[80%] " />
                </div>
            </div>
        </div>
        <!-- 课程资源部分 -->
        <div class="lg:w-3/4 h-full mx-10 mt-4 lg:mr-16 flex-1 flex-col overflow-auto">
            <!-- 课程部分 -->
            <var-loading description="LOADING" :loading="loading" color="#5295CD">
                <div v-if="!ismaterials" class="space-y-[0.5%]">
                    <div v-for="(course, index) in coursesByType" :key="index"
                        class="w-full flex justify-between items-center ">
                        <div @click="openNewTab(course.link)"
                            class="w-full h-[9vh] p-4 lg:p-2 border-2 border-[#5295CD] rounded-[10px]">
                            <div class="h-1/2 flex justify-between items-center">
                                <div class="w-1/2 h-full flex justify-start items-center">
                                    <span class=" text-sm lg:text-lg font-bold" style="color: black">{{
                                        course.courseName }}</span>
                                </div>
                                <div class="w-1/2  h-full flex justify-end items-center">
                                    <span class="text-sm" style="color: black">{{ formatDate(course.createdAt) }}</span>
                                </div>
                            </div>
                            <div class="w-full  h-full flex justify-between items-center">
                                <div class="w-2/3 h-full flex justify-start items-center">
                                    <span class="text-sm" style="color: #5295cd">{{ course.type }}</span>
                                </div>
                                <div class="w-1/3 h-full flex justify-end items-center">
                                    <span class="text-sm" style="color: black">{{ course.userName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 资料部分 -->
                <div v-if="ismaterials">
                    <div class="border-[#5295CD] w-full h-full flex justify-between items-center">
                        <var-collapse v-model="openCollapse" :offset="false">
                            <var-collapse-item v-for="(material, index) in materials" :key="index"
                                :title="material.type" style="color: #5295cd"
                                class="border-2 border-[#5295CD] rounded-[10px] mb-0.5">
                                <template #title>
                                    <span class="text-xl">{{ material.type }}</span>
                                </template>
                                <p style="color: #0b0808" class="text-base">{{ material.materialsName }}</p>
                                <p style="color: #0b0808" class="text-base" :title="material.description"
                                    :alt="material.description" v-html="getHref(material.link)"></p>
                            </var-collapse-item>
                        </var-collapse>
                    </div>
                </div>
                <!-- 底部空白 -->
                <div class="h-28 sm:h-32"></div>
            </var-loading>
        </div>
        <!-- 底部固定栏 -->
        <div class="absolute w-screen bottom-0 left-0 flex justify-center items-center bg-[#F7FFFF] lg:hidden">
            <div class="w-full mx-5 max-w-screen-sm">
                <var-divider :description="selectedType"></var-divider>
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
            coursesByType: [], // 某个分类的课程信息
            openCollapse: [], // 课程资料折叠面板
            materials: [], // 课程资料
            selectedType: null, // 选中的分类
            loading: false, // 加载动画
            ismaterials: false // 是否显示课程资料
        };
    },
    computed: {
        title() {
            return this.$route.params.title; // 获取传递的参数
        }
    },
    created() {}, // 组件的生命周期钩子，创建时调用
    async mounted() {
        this.loading = true;
        await this.getCourses();
        await this.getMaterials();
        this.loadCourseByType(this.title || 'UI设计');
        this.loading = false;
    }, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        // 格式化日期
        formatDate,
        // 打开新的标签页
        openNewTab,
        // 获取课程信息
        async getCourses() {
            const res = await this.$api.course.getCourse();
            if (res.success) {
                this.courses = res.data;
            } else {
                this.$api.notify.error(res.error);
            }
        },
        // 加载某个分类的课程
        loadCourseByType(type) {
            this.selectedType = type;
            if (type === '课程资料') {
                this.ismaterials = true;
            } else {
                this.ismaterials = false;
                this.coursesByType = this.courses.filter((course) => course.type === type);
            }
        },
        //获取课程资料
        async getMaterials() {
            const res = await this.$api.materials.getMaterials();
            if (res.success) {
                this.materials = res.data;
            } else {
                this.$api.notify.error(res.error);
            }
        },
        // 文本内容中存在链接时，替换成超链接a标签展示
        getHref(content) {
            if (!content) {
                return '';
            }
            const urlPattern = /(https?:\/\/[a-zA-Z0-9\-\.]+(?:\/[^\s,]*)?)/g; // 匹配URL的正则表达式(匹配 URL 路径部分，允许包含特殊字符，直到遇到空格或逗号为止)
            content = content.replace(urlPattern, (match) => { 
                const url = match;
                const href = match;
                return `<alt="" style="width: 13px; height: 13px"><a target="_blank" href="${href}" style="color: #3298FF">${url}</a>`;
            });
            content = content.replace(/,/g, '<br>');
            return content;
        },

    } // 定义组件的方法
};
</script>

<style scoped></style>
