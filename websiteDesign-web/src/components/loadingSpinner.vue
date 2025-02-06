<template>
    <div v-if="isLoading" class="fixed z-10 w-screen h-screen flex flex-col justify-center items-center bg-[#F7FFFF]">
        <!-- SVG 圆圈加载条 -->
        <div class="circle-container mb-4">
            <svg ref="circleSvg" width="90px" height="90px" xmlns="http://www.w3.org/2000/svg">
                <circle ref="progressCircle" cx="45px" cy="45px" r="40px" stroke="#71A9D7" stroke-width="3px" fill="none" stroke-dasharray="283" stroke-dashoffset="283" stroke-linecap="round" transform="rotate(-90 45 45)" />
            </svg>
            <!-- 图标（修改后的定位部分） -->
            <div class="icon-wrapper">
                <Icon type="jiandao" extraclass="icon" size="40" color="#71A9D7" ref="icon" />
            </div>
        </div>
        <!-- 文字 -->
        <p class="text-center text-2xl font-bold text-[#71A9D7]">Loading...</p>
    </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
    name: 'LoadingSpinner',
    data() {
        return {
            isLoading: true // 控制加载页面的显示和隐藏
        };
    },
    mounted() {
        this.startLoaderAnimation();
        this.startIconRotation();

        // 模拟网站加载
        this.simulateWebsiteLoading();
    },
    methods: {
        startLoaderAnimation() {
            const progressCircle = this.$refs.progressCircle;
            // GSAP 动画：顺时针加载一圈
            gsap.fromTo(
                progressCircle,
                { strokeDashoffset: 283 }, // 初始状态
                {
                    strokeDashoffset: 0, // 结束状态
                    duration: 2, // 动画持续时间
                    ease: 'sine.inOut', // 缓动函数
                    repeat: -1, // 无限循环
                    onComplete: () => {
                        // 加载条动画完成后隐藏加载页面
                        this.isLoading = false;
                    }
                }
            );
        },
        startIconRotation() {
            const icon = this.$refs.icon.$el;

            // GSAP 动画：图标旋转
            gsap.to(icon, {
                rotationY: 360, // 旋转 360 度
                duration: 2, // 动画持续时间
                ease: 'linear', // 线性旋转
                repeat: -1, // 无限循环
                transformOrigin: 'center' // 旋转中心为图标中心
            });
        },
        simulateWebsiteLoading() {
            // 模拟网站加载（例如：2 秒后加载完成）
            setTimeout(() => {
                // 停止加载条动画
                gsap.killTweensOf(this.$refs.progressCircle);
                // 快速完成加载条动画
                gsap.to(this.$refs.progressCircle, {
                    strokeDashoffset: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        // 隐藏加载页面
                        this.isLoading = false;
                        // 1秒后渐渐消失
                        gsap.to(this.$el, {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                this.$emit('loading-complete');
                            }
                        });
                    }
                });
            }, 2000); // 模拟加载时间
        }
    }
};
</script>

<style scoped>
.circle-container {
    position: relative;
    width: 90px;
    height: 90px;
}

.icon-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon {
    /* 确保图标自身居中 */
    display: block;
}
</style>