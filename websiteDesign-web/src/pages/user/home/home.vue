<template>
    <div class="w-full">
        <div class="w-full h-[90vh]">
            <img class="w-full h-[80vh]" src="@/assets/design.svg" alt="" />
            <div class="left-0 right-0 flex justify-center">
                <img src="@/assets/展开.svg" @click="handleClick" />
            </div>
        </div>
        <div v-show="isShow" ref="page" class="w-full h-[90vh] bg-[url('@/assets/生工院标.svg')] bg-contain bg-center bg-no-repeat flex flex-col lg:flex-row items-center justify-center">
            <!-- 直接通过 margin 控制垂直位置 -->
            <img ref="poeme" class="ml-[0vw] lg:ml-[10vw] w-[60%] lg:w-[40%] mt-[-15vh] lg:mt-[-20vh]" src="@/assets/大赛简介.svg" alt="" />
            <p ref="introText" class="text-[#5295CD] p-10 mt-[80px] lg:mt-0 text-3xl lg:text-7xl">
                <span v-for="(char, index) in contest.introduce" :key="index" class="inline-block">
                    {{ char }}
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
    name: '', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            isShow: false // 控制展开动画
        };
    },
    computed: {
        contest() {
            return this.$store.contest;
        }
    },
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        handleClick() {
            this.isShow = true;
            this.$nextTick(() => {
                // 确保 DOM 更新后再执行
                if (this.$refs.page) {
                    this.$refs.page.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    this.playIntroAnimation();
                    this.playTextAnimation(); // 启动文字动画
                } else {
                    console.error('Target element with ref "page" not found');
                }
            });
        },
        playIntroAnimation() {
            gsap.from(this.$refs.poeme, {
                x: -400, // 从屏幕右侧 400px 开始
                opacity: 0, // 从透明开始
                duration: 3, // 动画持续时间 3 秒
                ease: 'power3.out' // 使用缓动效果
            });
        },
        playTextAnimation() {
            const text = gsap.utils.toArray(this.$refs.introText.children);
            gsap.from(text, {
                opacity: 0,
                x: 100, // 从右侧 100px 移动到位置
                ease: 'power1.out',
                duration: 1.5,
                stagger: {
                    each: 0.05,
                    from: 'random' // 添加随机入场效果
                }
            });
        }
    } // 定义组件的方法
};
</script>

<style scoped></style>
