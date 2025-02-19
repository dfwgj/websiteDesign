const apiUrl = import.meta.env.VITE_API_URL;

// 封装身份验证请求函数
const authentication = {
    // 封装 fetch 作为基础请求函数
    fetch: async (url, data) => {
        return await fetch(`${apiUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (!res.ok) {
                    console.error('Request error:', res.statusText);
                    return res.json();
                }
                return res.json();
            })
            .then((res) => {
                if (res.code !== 0) {
                    console.error('Request error: Code', res.code);
                    return { success: false, error: res.error }; // 返回具体的错误信息
                }
                return { success: true, data: res.data };
            })
            .catch((error) => {
                console.error('Request error:', error);
                return { success: false, error: error.message || '未知错误' }; // 返回捕获的错误信息
            });
    },
    // 封装 login 请求
    login: async (data) => {
        // 获取 jwt
        const token = await authentication.fetch('/auth/login', data);
        return token;
    },
    // 封装 register 请求
    register: async (data) => {
        const response = await authentication.fetch('/auth/register', data);
        return response;
    }
};

export default authentication;
