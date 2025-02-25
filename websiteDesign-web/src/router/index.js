import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/demo'
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('../pages/demo/demo.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../pages/manager/main.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        },
        children: [
            {
                path: 'one', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'one',
                component: () => import('../pages/manager/main1.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'two', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'two',
                component: () => import('../pages/manager/main2.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '分页'
                }
            },
            {
                path: 'three', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'three',
                component: () => import('../pages/manager/main3.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '尾页'
                }
            },
            {
                path: 'three2', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'three2',
                component: () => import('../pages/manager/main3a.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '尾页'
                }
            },
            {
                path: 'four', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'four',
                component: () => import('../pages/manager/main4.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '页'
                }
            },
            {
                path: 'five', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'five',
                component: () => import('../pages/manager/main5.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '页'
                }
            },
            {
                path: 'six', // 默认子路由，当访问 /engineer 时会匹配这个子路由
                name: 'six',
                component: () => import('../pages/manager/main6.vue'), // 假设这是默认显示的组件
                meta: {
                    title: '页'
                }
            },
        ],
    },

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
    const freeAuthMeta = to.matched.some((record) => record.meta.freeAuth);
    // 如果不是免认证的页面并且没有token，则跳转到登录页
    if (!freeAuthMeta && !token) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
