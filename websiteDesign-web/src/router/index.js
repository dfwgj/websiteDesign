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
                component: () => import('../pages/user/demo.vue'),
                meta: {
                    title: '示例页面',
                    freeAuth: true
                }
            },
            {
                path: 'resource',
                name: 'CourseResourcesPage',
                component: () => import('../pages/user/courseResources.vue'),
                meta: {
                    title: '课程资料',
                    freeAuth: false
                }
            },
            {
                path: 'detail',
                name: 'detail',
                component: () => import('../pages/user/contest/detail.vue'),
                meta: {
                    title: '竞赛详情',
                    freeAuth: true
                }
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
