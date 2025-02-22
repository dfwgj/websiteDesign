<template>
    <div class="relative">
        <!-- 显示标题 -->
        <div class="text-center absolute w-full mt-0 opacity-0" :class="{ 'title-visible': isMounted }">
            <h2
                class="text-[#5295CD] text-[100px] lg:text-[200px] font-bold tracking-wider"
                style="
                    text-shadow:
                        -4px -4px 0 #5295cd,
                        4px -4px 0 #5295cd,
                        -4px 4px 0 #5295cd,
                        4px 4px 0 #5295cd,
                        -2px -2px 0 #5295cd,
                        2px -2px 0 #71a9d7,
                        -2px 2px 0 #71a9d7,
                        2px 2px 0 #71a9d7;
                    color: white;
                    position: relative;
                    z-index: 0;
                ">
                DESIGN
            </h2>
        </div>
        <!-- 展示卡片区域 -->
        <div class="flex w-full top-[30vh] flex-row justify-center items-start relative z-1">
            <div
                v-for="(card, index) in cards"
                :key="index"
                class="w-[140px] h-[200px] lg:w-[280px] lg:h-[400px] flex-shrink-0 border-[3px] bg-white bg-opacity-70 lg:bg-opacity-90 border-[#5295CD] rounded-[10px] lg:rounded-[20px] grid grid-cols-[30%_70%] lg:grid-cols-[35%_65%] gap-1 justify-items-stretch "
                :style="cardStyle(index)"
                :data-index="index"
                @touchstart="handleMouseEnter(index)"
                @touchend="handleMouseLeave(index)"
                @touchmove="handleMouseLeave(index)"
                @mouseover="handleMouseEnter(index)"
                @mouseout="handleMouseLeave(index)"
                @click="handleMouseClick(card.title)">
                <span class="[writing-mode:vertical-lr] text-xl lg:text-5xl font-bold text-[#5295CD] border-r-[#5295CD] items-center justify-center flex">
                    {{ card.title }}
                </span>
                <div class="h-full flex flex-col items-center justify-center pl-0">
                    <img v-for="(img, i) in card.images" :key="i" :src="getImagePath(img)" class="w-5/5 lg:w-4/5" :alt="img.replace(/\..*$/, '')" draggable="false" />
                </div>
            </div>
        </div>
        <div class=" lg:hidden fixed bottom-[15vh] left-0 right-0 flex justify-center bg-white bg-opacity-90 ">
            <button class=" py-2 rounded-full w-[60vw] font-bold border-[#5295CD] border text-[#5295CD] text-lg bg-[#E8F3FF]" @click="handleMouseClick('网页设计')">
                获取比赛资料 >
            </button>
        </div>
    </div>
    <var-popup v-model:show="LoginShow" class="w-3/4 lg:w-1/3 rounded-2xl border-2 border-[#5295CD] lg:block">
        <Login @go-register="handleRegisterShow"  @login-success="handleLoginSuccess" />
    </var-popup>
    <var-popup v-model:show="RegisterShow" class="w-3/4 lg:w-1/3 rounded-2xl border-2 border-[#5295CD] lg:block">
        <Register @go-login="handleLoginShow" />
    </var-popup>
</template>
<script>
import illustrator from '@/assets/adobe_illustrator.svg';
import photoshop from '@/assets/adobe_photoshop.svg';
import vuejs from '@/assets/vuejs (1).svg';
import springboot from '@/assets/bxl-spring-boot.svg';
import mysql from '@/assets/mysql(1).svg';
import linux from '@/assets/linux(1).svg';
import Login from '@/components/login.vue';
import Register from '@/components/register.vue';
export default {
    name: '', // 组件的名称
    components: {
        Login,
        Register
    }, // 用于注册子组件的地方
    data() {
        return {
            cards: [
                {
                    translateX: 180,
                    translateY: 15,
                    rotate: -6,
                    title: '服务器部署',
                    images: [linux],
                    isHovered: false // 用于标识卡片是否被鼠标悬停
                },
                {
                    translateX: 80,
                    translateY: -58,
                    rotate: -6,
                    title: '数据库',
                    images: [mysql],
                    isHovered: false
                },
                {
                    translateX: 0,
                    translateY: -75,
                    rotate: 0,
                    title: '后端开发',
                    images: [springboot],
                    isHovered: false
                },
                {
                    translateX: -80,
                    translateY: -72,
                    rotate: 6,
                    title: '前端开发',
                    images: [vuejs],
                    isHovered: false
                },
                {
                    translateX: -180,
                    translateY: 0,
                    rotate: 15,
                    title: '网页设计',
                    images: [illustrator, photoshop],
                    isHovered: false
                }
            ],
            isMounted: false,
            isAnimating: false,
            LoginShow: false,
            RegisterShow: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.isMounted = true;
        }, 200);
        setTimeout(() => {
            this.isAnimating = true;
        }, 1200);
    },
    methods: {
        getImagePath(img) {
            return img;
        },
        cardStyle(index) {
            if (!this.isMounted) {
                return {
                    transform: 'translateX(0) translateY(0px) rotate(0deg)',
                    position: 'absolute',
                    opacity: 0
                };
            } else {
                const { translateX, translateY, rotate, isHovered } = this.cards[index];
                return {
                    transition: isHovered ? 'transform 0.3s ease' : 'transform 1s ease',
                    'transform': `
                        translateX(${translateX}px) 
                        translateY(${isHovered ? translateY - 80 : translateY}px) /* 动画效果：鼠标悬停时卡片上移 */
                        rotate(${rotate}deg)
                        ${isHovered ? 'scale(1.05)' : 'scale(1)'} /* 动画效果：鼠标悬停时卡片放大 */
                    `,
                    'position': 'relative',
                    'opacity': 1,
                    'box-shadow': isHovered ? '0 10px 20px rgba(0, 0, 0, 0.2)' : 'none', // 阴影效果
                    'background-color': isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.90)' // 背景颜色渐变
                };
            }
        },
        handleMouseEnter(index) {
            if (!this.isAnimating) {
                return;
            }
            this.cards[index].isHovered = true; // 触发悬停效果
        },
        handleMouseLeave(index) {
            if (!this.isAnimating) {
                return;
            }
            this.cards[index].isHovered = false; // 恢复原状
        },
        handleMouseClick(title) {
            if (!this.isAnimating) {
                return;
            }
            if (localStorage.getItem('token')) {
                if (title === '网页设计') {
                    title = 'UI设计';
                }
                this.$router.push({ name: 'courseResources', params: { title: title } });
            } else {
                this.$api.notify.error('请先登录');
                this.LoginShow = true;
            }
        },
        handleRegisterShow() {
            // 登录弹窗隐藏，注册弹窗显示
            this.LoginShow = false;
            this.RegisterShow = true;
        },
        handleLoginShow() {
            // 注册弹窗隐藏，登录弹窗显示
            this.RegisterShow = false;
            this.LoginShow = true;
        },
        handleLoginSuccess() {
            // 登录成功后关闭弹窗
            this.LoginShow = false;
        }
    }
};
</script>
<!-- css样式 -->
<style scoped>
/* 新增字体动画样式 */
.title-visible {
    opacity: 1;
    transition: opacity 0.8s ease-in;
}
</style>
