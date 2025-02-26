import auth from '../api/auth';
import user from '../api/user';
import course from '../api/course';
import materials from '../api/materials';
import contest from '../api/contest';
import team from '../api/team';

import notify from '@/api/notify';

// 注入所有 api 模块到 Vue 实例
export default {
    install(app) {
        app.config.globalProperties.$api = {
            auth,
            user,
            materials,
            contest,
            course,
            team,
            notify
        };
    }
};
