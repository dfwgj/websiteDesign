# 网站设计大赛宣传网站

主站：https://ws.gdmu-stuorg.com/

副站：https://ws.dfwgj.com/


## websiteDesign-web前端项目结构
- 官方框架地址：https://cn.vuejs.org/
- 封装后框架地址：https://github.com/gdmuna/vue-demo
- 本项目修改后的框架地址：https://github.com/dfwgj/vue-demo
### 项目结构

```plaintext
.
├── .husky              # Git 钩子
├── .vscode             # VSCode 配置与扩展
├── config              # 项目配置文件
├── node_modules        # 项目依赖
├── public              # 静态资源
├── src                 # 源码
│   ├── assets          # 静态资源
│   ├── components      # 组件
│   ├── pages           # 页面
│   ├── router          # 路由
│   ├── stores          # 状态管理
│   ├── utils           # 工具函数
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── styles.css      # 样式
├── .eslintrc.cjs       # ESLint 配置
├── .gitattributes      # Git 格式化提交配置
├── .gitignore          # Git 代码跟踪忽略规则
├── .npmrc              # NPM 镜像源配置
├── .prettierrc.cjs     # Prettier 配置
├── .yarnrc             # Yarn 镜像源配置
├── index.html          # HTML 模板
├── LICENSE             # 开源协议
├── package.json        # 项目信息
├── postcss.config.js   # PostCSS 配置
├── README.md           # 项目说明
├── tailwind.config.js  # Tailwind CSS 配置
└── vite.config.js      # Vite 配置
```
### 快速启动

```bash
$ yarn                               # 下载package.json里的依赖项
$ yarn run dev                       # 启动项目
$ yarn build                         # 打包构建项目
```
## websiteDesign-Server后端项目结构
- 官方框架地址：https://midwayjs.org/
- 封装后框架地址：https://github.com/dfwgj/Midway.js-Server

### 项目结构
```plaintext
websiteDesign-Server
├── package.json              # 定义项目的基本信息，依赖项，脚本等
├── .eslintrc.js              # ESLint 配置文件，用于定义代码风格和检查规则
├── .prettierrc.js            # Prettier 配置文件，用于定义代码格式化规则
├── .gitignore                # Git 忽略文件，列出不需要纳入版本控制的文件和目录
├── .npmrc                    # npm镜像源配置文件
├── yarnrc                    # yarn镜像源配置文件
├── bootstrap.js              # 应用启动脚本，用于初始化和启动应用，配置了链路追踪
├── jest.config.js            # Jest 测试框架的配置文件
├── src                       # 源码
│   ├── config                # 存放应用的配置文件
│   ├── controller            # 存放控制器文件，处理 HTTP 请求
│   ├── service               # 存放服务层代码，包含业务逻辑
│   ├── dao                   # 数据访问对象层，用于数据库操作
│   ├── middleware            # 存放中间件，用于处理请求和响应的中间逻辑
│   ├── filter                # 存放过滤器，用于请求和响应的预处理和后处理
│   ├── dbConnPool            # 数据库连接池配置
│   ├── dto                   # 数据传输对象，用于定义请求和响应的数据结构
│   ├── guard                 # 存放守卫，用于权限控制
│   ├── test/controller       # 存放控制器的测试代码
│   └── configuration.ts      # 应用的配置文件，用于定义全局配置
├── LICENSE                   # 开源协议
├── tsconfig.json             # TypeScript 编译器的配置文件
├── websiteDesign.sql         # 数据库脚本文件
└── yarn.lock                 # 锁定依赖版本的文件
```
### 配置文件
```plaintext
├── src
│   ├── config
│   │   ├── config.local.ts      # 本地环境配置      必须配置
│   │   ├── config.production.ts # 生成环境配置      必须配置
│   │   └── config.unittest.ts   # 单元测试环境配置   可选配置
```
```plaintext
// 应用配置
koa: {
    port: 7001, // 设置 Koa 服务器的端口
    hostname: '0.0.0.0', // 设置 Koa 服务器的主机名
    globalPrefix: 'api', // 设置全局路由前缀，默认为 api
},
// 数据库配置
databaseConfig: {
    host: '', // 数据库主机名
    port: 3306, // 数据库端口，默认3306
    user: '', // 数据库用户名
    password: '', // 数据库密码
    database: '', // 数据库名称
},
// 缓存配置，使用 Redis 作为缓存存储
cacheManager: {
    clients: {
      redis: {
        store: createRedisStore('redis'), // 使用 createRedisStore 方法创建 Redis 存储
        options: {
          ttl: 86400000, // 设置缓存过期时间为 1 天
          refreshThreshold: 43200000, // 设置刷新阈值为 12 小时
        },
      },
    },
},
  redis: {
    clients: {
    // 定义 Redis 客户端实例
      redis: {
        host: '', // Redis 主机名
        port: 6379, // Redis 端口
        password: '', // Redis 密码
        db: 0, // Redis 数据库
        keepAlive: 10000, // Redis 连接保持时间
      },
    },
},
//OSS对象存储配置
oss: {
    client: {
      accessKeyId: '', // 阿里云访问密钥ID
      accessKeySecret: '', // 阿里云访问密钥Secret
      bucket: '', // 阿里云OSS Bucket名称
      endpoint: '', // 阿里云OSS Endpoint
      timeout: '', // 超时时间
    },
},
// 文件上传配置
busboy: {
    mode: 'file',
    tmpdir: join(tmpdir(), 'midway-busboy-files'),
    cleanTimeout: 5 * 60 * 1000,
    mimeTypeWhiteList: {
      '.jpg': 'image/jpeg',
      // 也可以设置多个 MIME type，比如下面的允许 .jpeg 后缀的文件是 jpg 或者是 png 两种类型
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      // 其他类型
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.wbmp': 'image/vnd.wap.wbmp',
      '.webp': 'image/webp',
    },
    limits: {
      fileSize: 1024 * 1024 * 10, // 最大上传文件大小为10M
    }
},
//jwt配置
jwtConfig: {
    secret: '',// JWT 密钥,自定义
    expiresIn: '24h',
  },
//允许跨域
cors: {
    origin: '*',
},
```

### 快速启动

```bash
$ yarn                               # 下载package.json里的依赖项
$ yarn run dev                       # 启动项目
$ open http://localhost:7001/    
```

### NPM脚本作用

```bash
$ yarn run start                      # 启动项目并启动链路追踪
$ yarn run dev                        # 启动项目的开发模式
$ yarn run test                       # 运行项目的测试用例
$ yarn run cov                        # 生成测试覆盖率报告
$ yarn run lint                       # 检查代码中的错误和不符合代码规范的地方
$ yarn run lint:fix                   # 自动修正代码中能够自动修复的lint错误
$ yarn run ci                         # 执行持续集成（CI）流程中的脚本
$ yarn run check                      # 检查项目环境配置
$ yarn run build                      # 构建项目，生成生产环境下的代码
```

[midway]: https://midwayjs.org
