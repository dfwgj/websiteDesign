<template>
    <div class="w-full overflow-hidden opacity-0 " :class="{ 'title-visible': isMounted }">
        <!-- 固定背景图（非第一页时显示） -->
        <div class="fixed top-[10vh] w-full h-[90vh] opacity-0 transition-opacity duration-100 bg-contain bg-center bg-no-repeat z-0" :class="{ 'opacity-100': currentPage !== 0 }" :style="{ backgroundImage: `url(${bgImage})` }"></div>
        <!-- 滚动容器，使用 CSS Scroll Snap 实现全屏吸附 -->
        <div class="scroll-container relative z-1">
            <!-- 页面 0：封面 -->
            <div class="page" data-index="0">
                <div class="w-full h-screen transition-opacity duration-1000">
                    <img class="w-full h-[80vh]" src="@/assets/天蓝.svg" alt="背景图" />
                    <div class="left-0 right-0 flex h-[10vh] justify-center">
                        <!-- 点击后平滑滚动到下一页 -->
                        <img src="@/assets/展开.svg" @click="scrollToPage(1)" class="cursor-pointer animate-bounce" />
                    </div>
                </div>
            </div>
            <!-- 页面 1：大赛简介 -->
            <div class="page" data-index="1" ref="page1">
                <div class="h-screen flex flex-col lg:flex-row items-center justify-center opacity-0 transition-opacity duration-0" :class="{ 'opacity-100': currentPage === 1 }">
                    <img ref="poeme" class="ml-[0vw] lg:ml-[10vw] w-[80%] lg:w-[40%] mt-[-15vh] lg:mt-[-20vh]" src="@/assets/大赛简介.svg" alt="大赛简介" />
                    <p ref="introText" class="text-[#5295CD] p-10 mt-[80px] lg:mt-0 text-3xl lg:text-5xl 2xl:text-7xl">
                        <span v-for="(char, index) in contest.introduce" :key="index" class="inline-block">
                            {{ char }}
                        </span>
                    </p>
                </div>
            </div>
            <!-- 页面 2：分组展示 -->
            <div class="page" data-index="2" ref="page2">
                <div class="h-[90vh] flex flex-col lg:flex-row justify-center lg:p-[2%] opacity-0 transition-opacity duration-0" :class="{ 'opacity-100': currentPage === 2 }">
                    <img ref="gourp1" src="@/assets/组合 7.svg" class="transition-transform ease-out hidden lg:block w-1/3 ml-[8vw]" alt="分组图标" />
                    <p ref="groupText" class="text-[#5295CD] flex flex-col lg:flex-row items-center justify-center mx-[5vw] sm:mt-10vh">
                        <span v-for="(char, index) in contest.group" :key="index" class="flex lg:flex-col items-center bg-[white] bg-opacity-80 justify-center border-[#5295CD] p-[2%] my-[1vh] border-2 rounded-xl lg:mx-4">
                            <p class="text-3xl lg:text-4xl 2xl:text-6xl mr-[2vw]">{{ char.groupName }}</p>
                            <p class="text-lg lg:text-2xl 2xl:text-3xl text-[#2C2828]">{{ char.groupRemark }}</p>
                        </span>
                    </p>
                    <img ref="gourp2" src="@/assets/组合 7.svg" class="mt-[5vh] lg:hidden transition-transform ease-out w-3/5" alt="分组图标" />
                </div>
            </div>
            <!-- 页面 3：赛程及方向 -->
            <div class="page" data-index="3" ref="page3">
                <div class="h-[90vh] flex flex-col lg:flex-row items-center justify-center lg:p-[2%] opacity-0 transition-opacity duration-0" :class="{ 'opacity-100': currentPage === 3 }">
                    <p ref="directionText" class="text-[#2C2828] lg:w-1/2 p-[2%] bg-[white] bg-opacity-80 rounded-xl mx-[5vw] lg:mx-[1vw]">
                        <span v-for="(char, index) in contest.direction" :key="index" class="flex flex-row items-center justify-center">
                            <p class="text-2xl lg:text-4xl 2xl:text-6xl mr-[2vw] lg:mr-0 text-[#5295CD] w-[40%] my-[5%]">{{ char.name }}</p>
                            <p class="text-md lg:text-xl 2xl:text-2xl w-[70%] lg:w-[60%] my-[5%]">{{ char.txt }}</p>
                        </span>
                    </p>
                    <img ref="direction" src="@/assets/组合 6.svg" class="transition-transform lg:place-self-center lg:ml-[5vw] order-2 self-end w-2/5 lg:w-1/4 ease-out" alt="方向图标" />
                </div>
            </div>
            <!-- 页面 4：奖品设置 -->
            <div class="page" data-index="4" ref="page4">
                <div class="h-[90vh] lg:h-[100vh] flex flex-col items-center justify-center p-5 lg:p-8 opacity-0 transition-opacity duration-0" :class="{ 'opacity-100': currentPage === 4 }">
                    <div class="h-[60%] w-full lg:p-8">
                        <div class="grid grid-cols-2 gap-[5vw] lg:gap-[20vw] lg:p-8">
                            <span v-for="(char, index) in contest.group" :key="index" :ref="groupItemRef">
                                <div class="flex flex-col items-center justify-center">
                                    <p class="text-3xl lg:text-5xl 2xl:text-7xl mb-[1vh] text-[#5295CD]">{{ char.groupName }}</p>
                                    <div class="flex flex-col lg:flex-row mb-[8vh] lg:mb-0 items-center">
                                        <span v-for="(award, awardIndex) in contest.awards" :key="awardIndex" class="mb-[2vh] lg:mb-[10vh] flex flex-row text-lg lg:text-3xl 2xl:text-4xl text-[#2C2828] items-center">
                                            {{ award.name }}{{ award.quantity }}名
                                            <span hidden lg:block v-if="awardIndex !== contest.awards.length - 1">、</span>
                                        </span>
                                    </div>
                                    <p class="text-3xl lg:text-5xl 2xl:text-7xl mb-[1vh] text-[#5295CD]">奖品划分</p>
                                    <div class="flex flex-col items-center">
                                        <span v-for="(award, awardIndex) in contest.awards" :key="awardIndex" class="mb-[2vh] flex flex-row text-md lg:text-3xl 2xl:text-4xl text-[#2C2828] items-center">{{ award.name }}: 价值{{ award.amount }}的{{ award.prize }}</span>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <img ref="award" src="@/assets/组合 9.svg" class="h-[20%] transition-transform ease-out" alt="奖品图标" />
                </div>
            </div>
            <!-- 页面 5：主办信息 -->
            <div class="page" data-index="5" ref="page5">
                <div class="h-[100vh] flex flex-col items-center justify-center p-8 opacity-0 transition-opacity duration-1000" :class="{ 'opacity-100': currentPage === 5 }">
                    <div class="h-[70vh] lg:grid lg:grid-cols-2 gap-[5vw] lg:gap-[30vw]">
                        <!-- 左边区域 -->
                        <div class="flex flex-col items-center justify-center">
                            <img class="w-[50vw] lg:w-[25vw] border-2 rounded-xl shadow-xl max-w-full" :src="contest.qrLink" alt="咨询群二维码" />
                            <p class="text-[#2C2828] mt-[2vh] mb-[2vh] text-center text-lg lg:text-xl 2xl:text-2xl">更多赛事相关问题，可加入官方咨询群进行答疑</p>
                        </div>
                        <!-- 右边区域 -->
                        <div class="flex flex-col items-center justify-center">
                            <img class="w-[50vw] lg:w-[25vw] border-2 rounded-xl shadow-xl max-w-full" :src="contest.userLink" alt="比赛负责人二维码" />
                            <p class="text-[#2C2828] mt-[2vh] mb-[2vh] text-center text-lg lg:text-xl 2xl:text-2xl">比赛负责人联系方式</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-[#2C2828] text-lg lg:text-xl 2xl:text-2xl">主办单位：{{ contest.organizers }}</p>
                        <p class="text-[#2C2828] text-lg lg:text-xl 2xl:text-2xl">承办单位：{{ contest.contractors }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap';
import bgImage from '@/assets/生工院标.svg';
export default {
    name: 'FullPageScroll',
    data() {
        return {
            bgImage,
            groupRefs: [],
            isMounted: false,
            currentPage: 0
        };
    },
    computed: {
        contest() {
            return this.$store.contest;
        }
    },
    mounted() {
        // 使用 IntersectionObserver 监听各页面的进入状态
        setTimeout(() => {
            this.isMounted = true;
        }, 200);
        const options = {
            threshold: 0.7
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);
                    if (this.currentPage !== index) {
                        this.currentPage = index;
                        this.triggerAnimation(index);
                    }
                }
            });
        }, options);
        const pages = this.$el.querySelectorAll('.page');
        pages.forEach((page) => {
            observer.observe(page);
        });
    },
    methods: {
        groupItemRef(el) {
            if (el) {
                this.groupRefs.push(el);
            }
        },
        // 平滑滚动到指定页面
        scrollToPage(index) {
            const target = this.$el.querySelector(`.page[data-index="${index}"]`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        },
        // 根据页面索引触发对应动画
        triggerAnimation(index) {
            switch (index) {
                case 1:
                    this.playIntroAnimation();
                    this.playTextAnimation();
                    break;
                case 2:
                    this.playSecondPageAnimation();
                    break;
                case 3:
                    this.playThirdPageAnimation();
                    break;
                case 4:
                    this.playFourthPageAnimation();
                    break;
                default:
                    break;
            }
        },
        playIntroAnimation() {
            gsap.from(this.$refs.poeme, {
                x: -400,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out'
            });
        },
        playTextAnimation() {
            const text = gsap.utils.toArray(this.$refs.introText.children);
            gsap.from(text, {
                opacity: 0,
                x: 100,
                ease: 'power1.out',
                duration: 1.5,
                stagger: {
                    each: 0.05,
                    from: 'random'
                }
            });
        },
        playSecondPageAnimation() {
            gsap.from(this.$refs.gourp1, {
                y: 200,
                duration: 1.5,
                opacity: 0,
                ease: 'power2.out'
            });
            gsap.from(this.$refs.gourp2, {
                y: 200,
                duration: 1.5,
                opacity: 0,
                ease: 'power2.out'
            });
            const groupText = gsap.utils.toArray(this.$refs.groupText.children);
            gsap.from(groupText, {
                opacity: 0,
                y: -200,
                ease: 'power1.out',
                duration: 1.5,
                stagger: {
                    each: 0.05,
                    from: 'random'
                }
            });
        },
        playThirdPageAnimation() {
            gsap.from(this.$refs.directionText, {
                x: 300,
                opacity: 0,
                ease: 'power1.out',
                duration: 1.5,
                stagger: {
                    each: 0.05,
                    from: 'random'
                }
            });
            gsap.from(this.$refs.direction, {
                x: -300,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out'
            });
        },
        playFourthPageAnimation() {
            // 组合动画
            const groupItems1 = gsap.utils.toArray(this.groupRefs[0]);
            gsap.from(groupItems1, {
                x: -400,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out',
                stagger: {
                    each: 0.1,
                    from: 'random'
                }
            });
            const groupItems2 = gsap.utils.toArray(this.groupRefs[1]);
            gsap.from(groupItems2, {
                x: 400,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out',
                stagger: {
                    each: 0.1,
                    from: 'random'
                }
            });
            gsap.from(this.$refs.award, {
                y: 400,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    }
};
</script>

<style scoped>
/* 滚动容器使用 CSS Scroll Snap */
.scroll-container {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
}

/* 每一页均铺满全屏，并在滚动时吸附 */
.page {
    height: 100vh;
    scroll-snap-align: start;
}
.title-visible {
    opacity: 1;
    transition: opacity 0.4s ease-in;
}
</style>
