/*
 Navicat Premium Dump SQL

 Source Server         : websiteDesign
 Source Server Type    : MariaDB
 Source Server Version : 110602 (11.6.2-MariaDB-ubu2404)
 Source Host           : 156.254.7.76:3306
 Source Schema         : websiteDesign

 Target Server Type    : MariaDB
 Target Server Version : 110602 (11.6.2-MariaDB-ubu2404)
 File Encoding         : 65001

 Date: 15/03/2025 21:07:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contest_awards
-- ----------------------------
DROP TABLE IF EXISTS `contest_awards`;
CREATE TABLE `contest_awards`  (
  `id` uuid NOT NULL COMMENT '奖项id',
  `contest_id` uuid NOT NULL COMMENT '奖项所属比赛',
  `user_id` uuid NOT NULL COMMENT '创建者id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '奖项名称',
  `prize` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '奖品名称',
  `amount` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '奖品金额',
  `quantity` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '奖品数量',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '奖项类别',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '奖项有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '奖项创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '奖项信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contest_awards
-- ----------------------------
INSERT INTO `contest_awards` VALUES ('019556e2-a437-7ed9-b5e1-46b890e82171', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '一等奖', '数位板', '200', '1', 'WYSJ', '1', '2025-03-02 20:44:08');
INSERT INTO `contest_awards` VALUES ('019556e2-a437-7ed9-b5e1-46b9f1ce8b72', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '二等奖', '有线机械键盘', '120', '2', 'WYSJ', '1', '2025-03-02 20:44:08');
INSERT INTO `contest_awards` VALUES ('019556e2-a437-7ed9-b5e1-46baf650c4c5', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '一等奖', 'm.2固态硬盘', '300', '1', 'WZKF', '1', '2025-03-02 20:44:08');
INSERT INTO `contest_awards` VALUES ('019556e2-a437-7ed9-b5e1-46bb183899b3', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '二等奖', '多模机械键盘', '150', '2', 'WZKF', '1', '2025-03-02 20:44:08');
INSERT INTO `contest_awards` VALUES ('01955f88-4a6e-7205-919a-dcb7dad4538c', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '三等奖', '鼠标', '80', '2', 'WYSJ', '1', '2025-03-04 05:02:02');
INSERT INTO `contest_awards` VALUES ('01955f88-4a74-7063-8829-c397610dd4f1', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '三等奖', 'U盘', '100', '2', 'WZKF', '1', '2025-03-04 05:02:02');

-- ----------------------------
-- Table structure for contest_direction
-- ----------------------------
DROP TABLE IF EXISTS `contest_direction`;
CREATE TABLE `contest_direction`  (
  `id` uuid NOT NULL COMMENT '方向id',
  `contest_id` uuid NOT NULL COMMENT '比赛id',
  `user_id` uuid NOT NULL COMMENT '创建人id',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '方向名称',
  `txt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文本',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '方向有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '方向创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '比赛方向信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contest_direction
-- ----------------------------
INSERT INTO `contest_direction` VALUES ('019556f6-9b66-7ec8-9dee-656ab79d3287', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '红色文化', '2025年，是一个意义非凡的年份。\n遵义会议召开90周年、抗日战争暨世界反法西斯战争胜利80周年、中国人民志愿军抗美援朝作战75周年等等，请以此为题进行网页设计、网站开发。', '1', '2025-03-02 21:05:57');
INSERT INTO `contest_direction` VALUES ('01955f88-a6f2-752a-8bec-07fe1e2d9ee9', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '人工智能', '随着近期deepseek的开源狂潮，新的一轮时代变革正在来袭，人工智能正在逐渐进入我们的生活。请选择合适的模型进行进一步运用并成功在网站中体现。', '1', '2025-03-04 05:02:26');
INSERT INTO `contest_direction` VALUES ('01955f88-a6f2-752a-8bec-07ff4a1a391b', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '智慧医疗', '智慧医疗为用户提供便捷医疗服务、健康建议以及丰富的医学知识科普。基于以上理念，打造一个专业、高效、易用的平台，帮助用户更好地管理健康，促进医患之间的沟通与信任，推动医疗服务的数字化转型。', '1', '2025-03-04 05:02:26');
INSERT INTO `contest_direction` VALUES ('01955f88-a6f2-752a-8bec-0800f0c3a6db', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '校园风采', '广东医科大学作为广东省属重点建设大学，肩负着培养高水平人才的使命。秉持以上设计理念，请打造一个能展现能全方位展示学校的教育理念、科研成果、校园文化和师生风采的校园风采网站。', '1', '2025-03-04 05:02:26');

-- ----------------------------
-- Table structure for contest_information
-- ----------------------------
DROP TABLE IF EXISTS `contest_information`;
CREATE TABLE `contest_information`  (
  `id` uuid NOT NULL COMMENT '比赛id',
  `user_id` uuid NOT NULL COMMENT '负责人id',
  `user_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '负责人链接',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '比赛名称',
  `topic` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '比赛主题',
  `introduce` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '比赛简述',
  `qr_link` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '比赛咨询群二维码链接',
  `double_knots` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '双节名称',
  `organizers` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主办方',
  `contractors` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '承办方',
  `year` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年份',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '比赛有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '比赛创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '比赛信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contest_information
-- ----------------------------
INSERT INTO `contest_information` VALUES ('0194bc66-5d16-7a30-819e-96a6049fa6a4', '0194a725-3423-7df1-a61a-06e34b34fd50', 'http://xierfloat.oss-cn-hongkong.aliyuncs.com/oss%5C01955f93-bd21-7bed-8a04-21184792ce93.jpg', '第十四届网站设计大赛', '智绘医路，创见未来', '网站设计大赛已经成功举办十三届，聚焦于医工交叉特色，将网站开发技术与医学场景结合，在开发实战中提升全栈能力与创新思维，助力医学生成为“懂医学，精技术”的复合型人才。', 'http://xierfloat.oss-cn-hongkong.aliyuncs.com/oss%5C01955f93-8d2c-7574-bd0a-e19358bd63a5.jpg', '广东医科大学第二十届校园文体艺术节暨第十一届生命文化节', '广东医科大学共青团委员会', '广东医科大学生物医学工程学院学生会', '2025', '1', '2025-01-31 12:46:56');

-- ----------------------------
-- Table structure for contest_process
-- ----------------------------
DROP TABLE IF EXISTS `contest_process`;
CREATE TABLE `contest_process`  (
  `id` uuid NOT NULL COMMENT '流程id',
  `contest_id` uuid NOT NULL COMMENT '比赛id',
  `user_id` uuid NOT NULL COMMENT '创建者id',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名字',
  `date` date NOT NULL COMMENT '时间',
  `place` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '地点',
  `txt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '描述',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '流程有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '流程创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '比赛流程信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contest_process
-- ----------------------------
INSERT INTO `contest_process` VALUES ('019556e2-a72f-7abd-b4b7-71d1a4580e86', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '摆摊宣传', '2025-03-21', '东莞校区第一饭堂前', '工作人员会为感兴趣的同学答疑解惑，大家还可以来参加有趣小游戏赢取精美礼品', '1', '2025-03-02 20:44:09');
INSERT INTO `contest_process` VALUES ('019556e2-a730-70b4-9f79-df01f50f9c7f', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '赛前培训', '2025-03-24', '线上', '工作人员为各位参赛选手安排了为期一个星期的赛前培训，哪怕是0基础小白也可以通过赛前培训了解网站开发技术', '1', '2025-03-02 20:44:09');
INSERT INTO `contest_process` VALUES ('019556e2-a730-70b4-9f79-df0219e7ff87', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '作品提交', '2025-04-22', '东莞校区一栋负一楼党员活动室', '网页设计组参赛选手提交作品压缩包和纸质版报名单；网站开发组需要把源代码压缩并标明运行所需环境和纸质版报名单一并提交', '1', '2025-03-02 20:44:09');
INSERT INTO `contest_process` VALUES ('019556e2-a730-70b4-9f79-df03b860e46a', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '初赛', '2025-04-23', '线上', '评委组会通过腾讯会议对初赛作品进行打分，评选选出网页设计组前8名，网站开发组前8名。其中网站开发组会免费获得一个月的云服务器进行决赛作品的部署', '1', '2025-03-02 20:44:09');
INSERT INTO `contest_process` VALUES ('019556e3-bc6c-7c09-a262-19af02386b41', '0194bc66-5d16-7a30-819e-96a6049fa6a4', '019496f8-e44f-73a1-ab44-391565282e2a', '决赛', '2025-04-29', '东莞校区东莞厅', '各个组别内进行抽签上台，以先网页设计组后网站开发组的顺序。网页设计组需在四分钟内表达自己的设计理念，展示UI图。网站开发组需要通过部署后的网站链接进行为期5分钟的介绍和展示以及为期3分钟到评委老师提问环节', '1', '2025-03-02 20:45:20');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` uuid NOT NULL COMMENT '课程id',
  `user_id` uuid NOT NULL COMMENT '创建者id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程名称',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程链接',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程描述',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程类型',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '课程有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '课程创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '课程信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for daily_statistics
-- ----------------------------
DROP TABLE IF EXISTS `daily_statistics`;
CREATE TABLE `daily_statistics`  (
  `date` date NOT NULL COMMENT '统计时间',
  `new_users` int(11) NULL DEFAULT 0 COMMENT '新增用户数',
  `new_teams` int(11) NULL DEFAULT 0 COMMENT '新增队伍数',
  `page_views` int(11) NULL DEFAULT 0 COMMENT '新增点击数',
  PRIMARY KEY (`date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of daily_statistics
-- ----------------------------
INSERT INTO `daily_statistics` VALUES ('2025-03-07', 0, 0, 150);
INSERT INTO `daily_statistics` VALUES ('2025-03-08', 0, 0, 61);
INSERT INTO `daily_statistics` VALUES ('2025-03-09', 0, 0, 13);
INSERT INTO `daily_statistics` VALUES ('2025-03-10', 0, 0, 61);
INSERT INTO `daily_statistics` VALUES ('2025-03-11', 0, 0, 16);
INSERT INTO `daily_statistics` VALUES ('2025-03-12', 0, 0, 2);
INSERT INTO `daily_statistics` VALUES ('2025-03-13', 0, 0, 9);
INSERT INTO `daily_statistics` VALUES ('2025-03-14', 0, 0, 36);
INSERT INTO `daily_statistics` VALUES ('2025-03-15', 0, 0, 3);

-- ----------------------------
-- Table structure for materials
-- ----------------------------
DROP TABLE IF EXISTS `materials`;
CREATE TABLE `materials`  (
  `id` uuid NOT NULL COMMENT '资料id',
  `user_id` uuid NOT NULL COMMENT '创建者id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资料名称',
  `link` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资料链接',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '资料描述',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资料类型',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '资料有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '资料创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '课程资料信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of materials
-- ----------------------------
INSERT INTO `materials` VALUES ('0194dbcc-0bf6-778a-bd5e-975f345f0e87', '0194a725-3423-7df1-a61a-06e34b34fd50', '项目源码', 'GitHub：https://github.com/dfwgj/websiteDesign,&#10;Gitee：https://github.com/dfwgj/websiteDesign', '这是网站设计大赛宣传网站项目源码', 'WZSJDSXCWZ', '1', '2025-02-06 23:06:11');
INSERT INTO `materials` VALUES ('0194dbcc-e311-765f-8a02-f2cd4f09b096', '0194a725-3423-7df1-a61a-06e34b34fd50', '项目UI', 'https://pixso.cn/app/editor/IAHSBCP8zRnOtIj6yI_QQg?icon_type=1&page-id=73%3A19', '这是网站设计大赛宣传网站项目UI', 'WZSJDSXCWZ ', '1', '2025-02-06 23:07:06');

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `dict_id` int(8) UNSIGNED NOT NULL COMMENT '字典ID',
  `dict_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典编码',
  `dict_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典名称',
  `dict_type` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型',
  `enabled_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '启动有效标识，有效为1，无效为0',
  `user_id` uuid NULL COMMENT '创建者id',
  `created_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (1, 'COLLEGE', '学院', 'list', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (5, 'DIRECTION', '方向', 'list', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (2, 'GRADE', '年级', 'list', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (3, 'MODEL', '组别', 'list', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (4, 'TYPE', '类型', 'list', '1', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_item`;
CREATE TABLE `sys_dict_item`  (
  `dict_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典编码',
  `item_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典项编码',
  `item_label` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典项标签',
  `item_sort` int(4) NOT NULL COMMENT '字典项排序',
  `default_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '默认有效标识，有效为1，无效为0',
  `enabled_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '启动有效标识，有效为1，无效为0',
  `user_id` uuid NULL COMMENT '创建者id',
  `created_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_code`, `item_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典项表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_item
-- ----------------------------
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'DELCYXY', '第二临床医学院', 1, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'GGWSXY', '公共卫生学院', 2, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'HLXY', '护理学院', 3, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'JCYXY', '基础医学院', 4, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'RWYGLXY', '人文与管理学院', 5, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'SWYXGCXY', '生物医学工程学院', 6, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'WGYXY', '外国语学院', 7, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'YXJSXY', '医学技术学院', 8, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('COLLEGE', 'YXY', '药学院', 9, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('DIRECTION', 'HSWH', '红色文化', 1, '0', '1', '0194a725-3423-7df1-a61a-06e34b34fd50', '2025-03-01 14:27:05', NULL);
INSERT INTO `sys_dict_item` VALUES ('DIRECTION', 'JKYL', '健康医疗', 1, '0', '1', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '2025-03-06 04:26:09', NULL);
INSERT INTO `sys_dict_item` VALUES ('DIRECTION', 'RGZN', '人工智能', 1, '0', '1', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '2025-03-04 05:02:26', NULL);
INSERT INTO `sys_dict_item` VALUES ('DIRECTION', 'XYFC', '校园风采', 3, '0', '1', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '2025-03-04 05:02:26', NULL);
INSERT INTO `sys_dict_item` VALUES ('DIRECTION', 'ZHYL', '智慧医疗', 1, '0', '1', '0194a701-cf28-7208-aa1b-dc93ef97ab62', '2025-03-05 00:58:09', NULL);
INSERT INTO `sys_dict_item` VALUES ('GRADE', '2021', '2021', 4, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('GRADE', '2022', '2022', 3, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('GRADE', '2023', '2023', 2, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('GRADE', '2024', '2024', 1, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('MODEL', 'WYSJ', '网页设计组', 1, '0', '1', NULL, NULL, '该组别为单人赛，选手单人成队。参赛选手可通过使用Adobe Ilustrator、Pixso等专业绘图工具进行设计网站各个页面的UI图，展现独特的视觉设计理念。\n');
INSERT INTO `sys_dict_item` VALUES ('MODEL', 'WZKF', '网站开发组', 2, '0', '1', NULL, NULL, '该组别为多人赛，选手三人成队。参赛队伍需要综合运用适合的前端、后端框架以及数据库技术，开发出一个功能完善、稳定可靠的信息系统，满足实际应用需求。');
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'FWQ', '服务器部署', 5, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'HDKF', '后端开发', 2, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'QDKF', '前端开发', 1, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'QT', '其他', 7, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'SJK', '数据库', 4, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'UISJ', 'UI设计', 3, '0', '1', NULL, NULL, NULL);
INSERT INTO `sys_dict_item` VALUES ('TYPE', 'WZSJDSXCWZ ', '网站设计大赛宣传网站', 6, '0', '1', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team`  (
  `id` uuid NOT NULL COMMENT '队伍信息id',
  `user_id` uuid NOT NULL COMMENT '创建者（队长）id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '队伍名称',
  `opus_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作品名称',
  `model` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '队伍模式',
  `state_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '队伍状态标识，0为审核中，1为报名成功，2为作品已提交，3为进入初赛，4为进入决赛',
  `direction` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作品方向',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '队伍有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '队伍创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '队伍信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` uuid NOT NULL COMMENT '用户id',
  `student_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学号',
  `team_id` uuid NULL COMMENT '队伍id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户加密密码',
  `college` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学院',
  `major` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '专业',
  `grade` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年级',
  `phone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号码',
  `email` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电子邮箱',
  `is_admin` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '用户是否管理员',
  `captain_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '用户队长标识，队长为1，队员为0',
  `valid_flag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '用户有效标识，有效为1，无效为0',
  `created_at` datetime NULL DEFAULT NULL COMMENT '用户创建时间',
  PRIMARY KEY (`user_id` DESC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
