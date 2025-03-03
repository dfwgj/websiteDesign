import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import notify from '@/api/notify';

export const userStore = defineStore('userStore', {
    state: () => ({
        userId: null,
        studentId: null,
        teamId: null,
        name: null,
        college: null,
        major: null,
        grade: null,
        phone: null,
        email: null,
        userRole: null,
        password: '*********',
        team: {
            teamName: null,
            teamState: null,
            model: null,
            direction: null,
            players: []
        }
    }),
    actions: {
        // 解密 token 并填充用户信息
        decodeToken() {
            const token = localStorage.getItem('token'); // 从 localStorage 获取 token
            if (token) {
                try {
                    const decodedToken = jwtDecode(token); // 使用 jwt-decode 解码 token
                    const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
                    // 检查 token 是否过期
                    if (decodedToken.exp && decodedToken.exp < currentTime) {
                        throw new Error('Token expired');
                    }
                    // 将解码后的 token 信息赋值给实例属性
                    this.userId = decodedToken.userId;
                    this.studentId = decodedToken.studentId;
                    this.teamId = decodedToken.teamId;
                    this.name = decodedToken.name;
                    this.college = decodedToken.college;
                    this.major = decodedToken.major;
                    this.grade = decodedToken.grade;
                    this.phone = decodedToken.phone;
                    this.email = decodedToken.email;
                    this.userRole = decodedToken.userRole;
                    this.team.teamName = decodedToken.team.teamName;
                    this.team.teamState = decodedToken.team.teamState;
                    this.team.model = decodedToken.team.model;
                    this.team.direction = decodedToken.team.direction;
                    this.team.players = decodedToken.team.players;
                } catch (error) {
                    localStorage.removeItem('token');
                    notify.error('登录信息已过期，请重新登录');
                }
            }
        },
        //清除用户信息
        clearUserInfo() {
            this.userId = null;
            this.studentId = null;
            this.teamId = null;
            this.name = null;
            this.college = null;
            this.major = null;
            this.grade = null;
            this.phone = null;
            this.email = null;
            this.userRole = null;
            this.password = '*********';
        }
    }
});
