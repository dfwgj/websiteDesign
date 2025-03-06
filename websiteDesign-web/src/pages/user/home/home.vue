<template>
    <div class="w-full overflow-hidden opacity-0" :class="{ 'title-visible': isMounted }">
        <!-- 固定背景图（非第一页时显示） -->
        <div class="fixed top-[10dvh] w-full h-[90dvh] opacity-0 transition-opacity duration-100 bg-contain bg-center bg-no-repeat z-0"
            :class="{ 'opacity-100': currentPage !== 0 }" :style="{ backgroundImage: `url(${bgImage})` }"></div>
        <!-- 滚动容器，使用 CSS Scroll Snap 实现全屏吸附 -->
        <div class="scroll-container relative z-1">
            <!-- 页面 0：封面 -->
            <div class="page" data-index="0">
                <div class="w-full h-screen transition-opacity duration-1000">
                    <img class="w-full h-[80dvh]" src="@/assets/天蓝.svg" alt="背景图" />
                    <div class="left-0 right-0 flex h-[10dvh] justify-center">
                        <!-- 点击后平滑滚动到下一页 -->
                        <img src="@/assets/展开.svg" @click="scrollToPage(1)" class="cursor-pointer animate-bounce" />
                    </div>
                </div>
            </div>
            <!-- 页面 1：大赛简介 -->
            <div class="page" data-index="1" ref="page1">
                <div class="h-screen flex flex-col lg:flex-row items-center justify-center opacity-0 transition-opacity duration-0"
                    :class="{ 'opacity-100': currentPage === 1 }">
                    <img ref="poeme" class="ml-[0vw] lg:ml-[10vw] w-[80%] lg:w-[40%] mt-[-15dvh] lg:mt-[-20dvh]"
                        src="@/assets/大赛简介.svg" alt="大赛简介" />
                    <p ref="introText" class="text-[#5295CD] p-10 mt-[80px] lg:mt-0 text-3xl lg:text-3xl 2xl:text-5xl">
                        <span v-for="(char, index) in contest.introduce" :key="index" class="inline-block">
                            {{ char }}
                        </span>
                    </p>
                </div>
            </div>
            <!-- 页面 2：分组展示 -->
            <div class="page" data-index="2" ref="page2">
                <div class="h-[90dvh] flex flex-col lg:flex-row justify-center lg:p-[2%] opacity-0 transition-opacity duration-0"
                    :class="{ 'opacity-100': currentPage === 2 }">
                    <img ref="gourp1" src="@/assets/组合 7.svg"
                        class="transition-transform ease-out hidden lg:block w-1/3 ml-[8vw]" alt="分组图标" />
                    <p ref="groupText"
                        class="text-[#5295CD] flex flex-col lg:flex-row items-center justify-center mx-[5vw] sm:mt-10dvh">
                        <span v-for="(char, index) in contest.group" :key="index"
                            class="flex lg:flex-col lg:w-[25dvw] lg:h-[45dvh] items-center bg-[white] bg-opacity-80 justify-center border-[#5295CD] p-[2%] my-[1dvh] border-2 rounded-xl lg:mx-4">
                            <p class=" lg:h-[20%] text-2xl lg:text-4xl 2xl:text-5xl ">{{ char.groupName }}</p>
                            <p class="lg:h-[80%]  text-lg lg:text-2xl 2xl:text-3xl text-[#2C2828]">{{ char.groupRemark
                                }}</p>
                        </span>
                    </p>
                    <img ref="gourp2" src="@/assets/组合 7.svg"
                        class="mt-[5dvh] lg:hidden transition-transform ease-out w-3/5" alt="分组图标" />
                </div>
            </div>
            <!-- 页面 3：赛程及方向 -->
            <div class="page" data-index="3" ref="page3">
                <div class="relative h-[90dvh] flex flex-col lg:flex-row lg:items-center lg:justify-center lg:p-[2%] opacity-0 transition-opacity duration-0"
                    :class="{ 'opacity-100': currentPage === 3 }">
                    <p ref="directionText" class="text-[#2C2828] lg:w-1/2 h-[60dvh]">
                    <div v-for="(char, index) in contest.direction" :key="index"
                        class="w-[60vw] lg:w-[36vw] h-[25vh] lg:h-[37vh] flex flex-col items-center justify-center opacity-100 transition-opacity duration-1000  border-[#5295CD] shadow-2xl bg-[white] bg-opacity-100 pt-0 p-[6px] lg:p-[4%] 2xl:p-[3%]  border-2 rounded-2xl lg:rounded-3xl"
                        :style="cardStyle(index)" :data-index="index" @click="handleCardClick(index)">
                        <div class="w-full flex justify-between">
                            <div class="w-full lg:mt-[2vh] flex flex-col justify-start">
                                <img src="@/assets/threecolor.svg" alt="三色图标" class="w-[35%] lg:w-[5vw]" />
                                <p class="text-xl lg:text-4xl 2xl:text-5xl text-[#5295CD] my-[10px] lg:my-[20px]">
                                    {{ char.name }}
                                </p>
                            </div>
                            <div class="w-full flex justify-end items-center">
                                <img src="@/assets/post-stamp.svg" alt="邮票图标" class="w-[32%]" />
                            </div>
                        </div>
                        <p class="text-sm h-[50%] lg:text-lg 2xl:text-2xl w-[90%] lg:w-[88%] lg:my-[5%] overflow-auto">
                            {{ char.txt }}
                        </p>
                    </div>
                    </p>
                    <img ref="direction" src="@/assets/组合 6.svg"
                        class="transition-transform lg:ml-[8vw] self-end w-2/5 lg:w-1/4 ease-out" alt="方向图标" />
                </div>
            </div>
            <!-- 页面 4：奖品设置（分两组渲染） -->
            <div class="page" data-index="4" ref="page4">
                <div class="h-[90dvh] lg:h-[100dvh] flex flex-col items-center justify-center p-5 lg:p-8 opacity-0 transition-opacity duration-0"
                    :class="{ 'opacity-100': currentPage === 4 }">
                    <div class="h-[70%] w-full lg:p-[2%]">
                        <div class="grid grid-cols-2 gap-[5vw] lg:gap-[20vw] lg:p-8">
                            <!-- 遍历经过排序的组（两组） -->
                            <span v-for="group in sortedGroups" :key="group.groupCode" :ref="groupItemRef">
                                <div class="flex flex-col items-center justify-center">
                                    <p class="text-3xl lg:text-5xl 2xl:text-7xl mb-[1dvh] text-[#5295CD]">{{
                                        group.groupName }}</p>
                                    <div class="flex flex-col lg:flex-row mb-[8dvh] lg:mb-0 items-center">
                                        <!-- 显示该组对应的奖项设置（例如：一等奖、二等奖、三等奖各自的数量） -->
                                        <span v-for="(award, index) in getAwardsByGroup(group.groupCode)"
                                            :key="award.id"
                                            class="mb-[2dvh] lg:mb-[10dvh] flex flex-row text-lg lg:text-2xl 2xl:text-4xl text-[#2C2828] items-center">
                                            {{ award.name }}{{ award.quantity }}组
                                            <span class="hidden lg:block"
                                                v-if="index !== getAwardsByGroup(group.groupCode).length - 1">、</span>
                                        </span>
                                    </div>
                                    <p class="text-3xl lg:text-5xl 2xl:text-7xl mb-[1dvh] text-[#5295CD]">奖品划分</p>
                                    <div class="flex flex-col items-center">
                                        <span v-for="award in getAwardsByGroup(group.groupCode)" :key="award.id"
                                            class="mb-[2dvh] flex flex-row text-md lg:text-3xl 2xl:text-4xl text-[#2C2828] items-center">{{
                                                award.name }}: {{ award.prize }}</span>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <img ref="award" src="@/assets/组合 9.svg" class="h-[25%] transition-transform ease-out" alt="奖品图标" />
                </div>
            </div>
            <!-- 页面 5：主办信息 -->
            <div class="page" data-index="5" ref="page5">
                <div class="h-[100dvh] flex flex-col items-center justify-center p-8 opacity-0 transition-opacity duration-1000"
                    :class="{ 'opacity-100': currentPage === 5 }">
                    <div class="h-[70dvh] lg:grid lg:grid-cols-2 gap-[5vw] lg:gap-[30vw]">
                        <!-- 左边区域 -->
                        <div class="flex flex-col items-center justify-center">
                            <img class="w-[50vw] lg:w-[25vw] border-2 rounded-xl shadow-xl max-w-full"
                                :src="contest.qrLink" alt="咨询群二维码" />
                            <p class="text-[#2C2828] mt-[2dvh] mb-[2dvh] text-center text-lg lg:text-xl 2xl:text-2xl">
                                更多赛事相关问题，可加入官方咨询群进行答疑</p>
                        </div>
                        <!-- 右边区域 -->
                        <div class="flex flex-col items-center justify-center">
                            <img class="w-[50vw] lg:w-[25vw] border-2 rounded-xl shadow-xl max-w-full"
                                :src="contest.userLink" alt="比赛负责人二维码" />
                            <p class="text-[#2C2828] mt-[2dvh] mb-[2dvh] text-center text-lg lg:text-xl 2xl:text-2xl">
                                比赛负责人联系方式</p>
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
            windowWidth: window.innerWidth,
            isShow: false,
            isChange: false,
            isPhone: window.innerWidth <= 1024 ? 1 : 0,
            currentPage: 0,
            lastClick: 0 // 记录上次点击时间戳
        };
    },
    computed: {
        contest() {
            return this.$store.contest;
        },
        // 对 contest.group 进行排序，如优先显示网站开发组（groupCode 为 "WZKF"）
        sortedGroups() {
            return this.contest.group
                ? this.contest.group.slice().sort((a, b) => {
                    if (a.groupCode === 'WZKF') return -1;
                    if (b.groupCode === 'WZKF') return 1;
                    return 0;
                })
                : [];
        }
    },
    watch: {
        // 监听 windowWidth 变化，动态更新 isPhone
        windowWidth(newWidth, oldWidth) {
            if (newWidth !== oldWidth) {
                this.isPhone = newWidth <= 1024 ? 1 : 0;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize); // 
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
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        cardStyle(index) { //切换手机端和电脑端的卡片样式
            if (!this.isShow && !this.isChange) {
                return {
                    transform: 'translateX(0) translateY(0px) rotate(0deg)', // 未展开页面时，卡片的初始位置
                    position: 'absolute',
                    opacity: 0
                };
            } else if (!this.isPhone && !this.isChange) {
                return {
                    transition: 'transform 1s ease',
                    transform: `rotate(${-10 + index * 10}deg) translateY(${30 + index * -15}vh) translateX(${-10 + index * 13}vh)`, // 旋转、位移
                    position: 'absolute', // （子元素）绝对定位
                    zIndex: this.contest.direction.length - index, // 调整卡片层级
                    opacity: 100 // 透明度
                };
            } else if (this.isPhone && !this.isChange) {
                return {
                    transition: 'transform 1s ease',
                    transform: `rotate(${-10 + index * 10}deg) translateY(${40 + index * -12}vh) translateX(${-5 + index * 8}vh)`, // 旋转、位移
                    position: 'absolute', // （子元素）绝对定位
                    zIndex: this.contest.direction.length - index, // 调整卡片层级
                    opacity: 100 // 透明度
                };
            } else if (this.isPhone && this.isChange) {
                return {
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                    transform: 'translateX(40px) translateY(220px) rotate(0deg)',
                    position: 'absolute', // （子元素）绝对定位
                    zIndex: this.contest.direction.length - index, // 调整卡片层级
                    opacity: 0 // 透明度
                };
            } else {
                return {
                    transition: 'transform 0.4s ease ,opacity 0.4s ease',
                    transform: 'translateX(0) translateY(100px) rotate(0deg)',
                    position: 'absolute', // （子元素）绝对定位
                    zIndex: this.contest.direction.length - index, // 调整卡片层级
                    opacity: 0 // 透明度
                };
            }
        },
        handleCardClick(index) {
            // 如果距离上次点击不足 1 秒，则阻止执行
            if (Date.now() - this.lastClick < 1000) return
            this.lastClick = Date.now() // 更新最后点击时间
            
            if (index === 0) {
                this.isChange = true;
                setTimeout(() => {
                    this.rotateCards(); // 1秒后执行卡片轮换
                    this.isChange = false; // 重新显示卡片
                }, 400);
            } else if (index > 0 && this.contest.direction?.length) {
                this.isChange = true;
                // 交换被点击卡片与最顶上的卡片
                const topCard = this.contest.direction[0]; // 获取最顶上的卡片
                const clickedCard = this.contest.direction[index]; // 获取被点击的卡片
                // 交换位置
                this.contest.direction[0] = clickedCard;
                this.contest.direction[index] = topCard;
                setTimeout(() => {
                    this.isChange = false; // 重新显示卡片
                }, 400);
            }
        },
        rotateCards() {
            if (this.contest.direction?.length) {
                const firstCard = this.contest.direction.shift();
                this.contest.direction.push(firstCard);
            }
        },
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
                    this.isShow = false;
                    break;
                case 2:
                    this.isShow = false;
                    this.playSecondPageAnimation();
                    break;
                case 3:
                    this.playThirdPageAnimation();
                    setTimeout(() => {
                        this.isShow = true;
                    }, 200);
                    break;
                case 4:
                    this.playFourthPageAnimation();
                    this.isShow = false;
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
                    each: 0.005,
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
        },
        // 根据组别代码过滤出对应奖项
        getAwardsByGroup(groupCode) {
            return this.contest.awards.filter((award) => award.type === groupCode);
        }
    }
};
</script>

<style scoped>
/* 滚动容器使用 CSS Scroll Snap */
.scroll-container {
    height: 100dvh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
}

/* 每一页均铺满全屏，并在滚动时吸附 */
.page {
    height: 100dvh;
    scroll-snap-align: start;
}

.title-visible {
    opacity: 1;
    transition: opacity 0.4s ease-in;
}
</style>
