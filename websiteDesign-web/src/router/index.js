import { createRouter, createWebHistory } from 'vue-router';
import notify from '@/api/notify';
import { userStore } from '../stores/user';

const routes = [
    {
        path: '/',
        name: 'header',
        component: () => import('../pages/user/header.vue'),
        redirect: '/home',
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
                    freeAuth: true
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
                component: () => import('../pages/user/contest/detail.vue'),
                meta: {
                    title: '大赛详细',
                    freeAuth: true
                }
            },
            {
                path: 'myInfo',
                name: 'myInfo',
                component: () => import('../pages/user/myInfo/myInfo.vue'),
                redirect: '/myInfo/team',
                meta: {
                    title: '个人信息',
                    freeAuth: false
                },
                children: [
                    {
                        path: 'revise',
                        name: 'revise',
                        component: () => import('../pages/user/myInfo/revise.vue'),
                        meta: {
                            title: '信息修改',
                            freeAuth: false
                        }
                    },
                    {
                        path: 'team',
                        name: 'team',
                        component: () => import('../pages/user/myInfo/team.vue'),
                        meta: {
                            title: '我的队伍',
                            freeAuth: false
                        }
                    },
                    {
                        path: 'signup',
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
        path: '/manager',
        name: 'manager',
        component: () => import('../pages/manager/manager.vue'),
        redirect: '/manager/managerHome',
        meta: {
            title: '示例页面',
            freeAuth: false,
            requireAuth: true
        },
        children: [
            {
                path: 'managerHome',
                name: 'managerHome',
                component: () => import('../pages/manager/managerHome.vue'),
                meta: {
                    title: '首页',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'userManagement',
                name: 'userManagement',
                component: () => import('../pages/manager/userManagement.vue'),
                meta: {
                    title: '用户管理',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'contestManagement',
                name: 'contestManagement',
                component: () => import('../pages/manager/contestManagement.vue'),
                meta: {
                    title: '比赛管理',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'createContest',
                name: 'createContest',
                component: () => import('../pages/manager/createContest.vue'),
                meta: {
                    title: '创建比赛',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'contestDetail',
                name: 'contestDetail',
                component: () => import('../pages/manager/contestDetail.vue'),
                meta: {
                    title: '比赛详情',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'teamManagement',
                name: 'teamManagement',
                component: () => import('../pages/manager/teamManagement.vue'),
                meta: {
                    title: '团队管理',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'courseManagement',
                name: 'courseManagement',
                component: () => import('../pages/manager/courseManagement.vue'),
                meta: {
                    title: '课程管理',
                    freeAuth: false,
                    requireAuth: true
                }
            },
            {
                path: 'materialsManagement',
                name: 'materialsManagement',
                component: () => import('../pages/manager/materialsManagement.vue'),
                meta: {
                    title: '资源管理',
                    freeAuth: false,
                    requireAuth: true
                }
            }
        ]
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
    // 获取当前路由最后一条匹配记录的 meta 信息
    const currentRecord = to.matched[to.matched.length - 1];
    const freeAuthMeta = currentRecord.meta.freeAuth;
    const requireAuthMeta = currentRecord.meta.requireAuth;
    // 通过状态管理获取用户信息
    const user = userStore();

    // 如果不是免认证的页面并且没有 token，则跳转到首页
    if (!freeAuthMeta && !token) {
        notify.error('请先登录！');
        return next({ name: 'header' });
    }

    // 如果当前页面需要管理员权限，并且用户的权限不满足要求，则跳转到首页
    if (requireAuthMeta && user.userRole !== '1') {
        notify.error('你没有权限访问该页面！');
        return next({ name: 'header' });
    }

    // 通过验证，允许访问目标路由
    next();
});

export default router;
