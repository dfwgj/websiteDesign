import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

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
        password: "*********",
    }),
    actions: {
        // 解密 token 并填充用户信息
        decodeToken() {
            const token = localStorage.getItem('token'); // 从 localStorage 获取 token
            if (token) {
                try {
                    const decodedToken = jwtDecode(token); // 解密 token
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
                } catch (error) {
                    console.log(error);
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
            this.password = "*********";
        }
    }
});
