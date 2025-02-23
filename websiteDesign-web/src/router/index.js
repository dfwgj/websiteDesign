import { createRouter, createWebHistory } from 'vue-router';
import notify from '@/api/notify';

const routes = [
    {
        path: '/',
        name: 'header',
        component: () => import('../pages/user/header.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../pages/user/home/home.vue'),
                meta: {
                    title: '示例页面',
                    freeAuth: true
                }
            },
            {
                path: 'resource',
                name: 'resource',
                component: () => import('../pages/user/course/course.vue'),
                meta: {
                    title: '资料',
                    freeAuth:  true
                }
            },
            {
                path: 'courseResources/:title',
                name: 'courseResources',
                component: () => import('../pages/user/course/courseResources.vue'),
                meta: {
                    title: '课程资源',
                    freeAuth: false
                }
            },
            {
                path: 'detail',
                name: 'ResponsiveDesignCompetition',
                component: () => import('@/pages/user/detail.vue'),
                meta: {
                    title: '大赛详细',
                    freeAuth: true
                }
            },
            {
                path: 'myInfo',
                name: 'myInfo',
                component: () => import('../pages/user/myInfo.vue'),
                meta: {
                    title: '个人信息',
                    freeAuth: false
                },
                children: [
                    {
                        path: '/revise',
                        name: 'revise',
                        component: () => import('../pages/user/myInfo/revise.vue'),
                        meta: {
                            title: '信息修改',
                            freeAuth: false
                        }
                    },
                    {
                        path: '/team',
                        name:'team',
                        component: () => import('../pages/user/myInfo/team.vue'),
                        meta: {
                            title: '我的队伍',
                            freeAuth: false
                        }
                    },
                    {
                        path: '/signup',
                        name: 'signup',
                        component: () => import('../pages/user/myInfo/signup.vue'),
                        meta: {
                            title: '比赛报名',
                            freeAuth: false
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/Mmain',
        name: 'Mmain',
        component: () => import('../pages/manager/main.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 从 localStorage 中读取 token
    const token = localStorage.getItem('token');
    // 判断当前页面 meta 信息是否包含免认证标识
    const currentRecord = to.matched[to.matched.length - 1];
    const freeAuthMeta = currentRecord.meta.freeAuth;
    // 如果不是免认证的页面并且没有token，则跳转到首页
    if (!freeAuthMeta && !token) {
        notify.error('请先登录！');
        next({ name: 'header' });
    } else {
        next();
    }
});

export default router;
