/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80035 (8.0.35)
 Source Host           : localhost:3306
 Source Schema         : gym_db

 Target Server Type    : MySQL
 Target Server Version : 80035 (8.0.35)
 File Encoding         : 65001

 Date: 25/05/2025 13:10:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_group
-- ----------------------------

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id` ASC, `permission_id` ASC) USING BTREE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id` ASC) USING BTREE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id` ASC, `codename` ASC) USING BTREE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES (1, 'Can add 用户', 1, 'add_user');
INSERT INTO `auth_permission` VALUES (2, 'Can change 用户', 1, 'change_user');
INSERT INTO `auth_permission` VALUES (3, 'Can delete 用户', 1, 'delete_user');
INSERT INTO `auth_permission` VALUES (4, 'Can view 用户', 1, 'view_user');
INSERT INTO `auth_permission` VALUES (5, 'Can add 用户健身档案', 2, 'add_userprofile');
INSERT INTO `auth_permission` VALUES (6, 'Can change 用户健身档案', 2, 'change_userprofile');
INSERT INTO `auth_permission` VALUES (7, 'Can delete 用户健身档案', 2, 'delete_userprofile');
INSERT INTO `auth_permission` VALUES (8, 'Can view 用户健身档案', 2, 'view_userprofile');
INSERT INTO `auth_permission` VALUES (9, 'Can add 课程', 3, 'add_course');
INSERT INTO `auth_permission` VALUES (10, 'Can change 课程', 3, 'change_course');
INSERT INTO `auth_permission` VALUES (11, 'Can delete 课程', 3, 'delete_course');
INSERT INTO `auth_permission` VALUES (12, 'Can view 课程', 3, 'view_course');
INSERT INTO `auth_permission` VALUES (13, 'Can add 课程分类', 4, 'add_coursecategory');
INSERT INTO `auth_permission` VALUES (14, 'Can change 课程分类', 4, 'change_coursecategory');
INSERT INTO `auth_permission` VALUES (15, 'Can delete 课程分类', 4, 'delete_coursecategory');
INSERT INTO `auth_permission` VALUES (16, 'Can view 课程分类', 4, 'view_coursecategory');
INSERT INTO `auth_permission` VALUES (17, 'Can add 课程安排', 5, 'add_courseschedule');
INSERT INTO `auth_permission` VALUES (18, 'Can change 课程安排', 5, 'change_courseschedule');
INSERT INTO `auth_permission` VALUES (19, 'Can delete 课程安排', 5, 'delete_courseschedule');
INSERT INTO `auth_permission` VALUES (20, 'Can view 课程安排', 5, 'view_courseschedule');
INSERT INTO `auth_permission` VALUES (21, 'Can add 课程报名', 6, 'add_courseenrollment');
INSERT INTO `auth_permission` VALUES (22, 'Can change 课程报名', 6, 'change_courseenrollment');
INSERT INTO `auth_permission` VALUES (23, 'Can delete 课程报名', 6, 'delete_courseenrollment');
INSERT INTO `auth_permission` VALUES (24, 'Can view 课程报名', 6, 'view_courseenrollment');
INSERT INTO `auth_permission` VALUES (25, 'Can add 会员套餐', 7, 'add_membershipplan');
INSERT INTO `auth_permission` VALUES (26, 'Can change 会员套餐', 7, 'change_membershipplan');
INSERT INTO `auth_permission` VALUES (27, 'Can delete 会员套餐', 7, 'delete_membershipplan');
INSERT INTO `auth_permission` VALUES (28, 'Can view 会员套餐', 7, 'view_membershipplan');
INSERT INTO `auth_permission` VALUES (29, 'Can add 订单', 8, 'add_order');
INSERT INTO `auth_permission` VALUES (30, 'Can change 订单', 8, 'change_order');
INSERT INTO `auth_permission` VALUES (31, 'Can delete 订单', 8, 'delete_order');
INSERT INTO `auth_permission` VALUES (32, 'Can view 订单', 8, 'view_order');
INSERT INTO `auth_permission` VALUES (33, 'Can add 订单项', 9, 'add_orderitem');
INSERT INTO `auth_permission` VALUES (34, 'Can change 订单项', 9, 'change_orderitem');
INSERT INTO `auth_permission` VALUES (35, 'Can delete 订单项', 9, 'delete_orderitem');
INSERT INTO `auth_permission` VALUES (36, 'Can view 订单项', 9, 'view_orderitem');
INSERT INTO `auth_permission` VALUES (37, 'Can add log entry', 10, 'add_logentry');
INSERT INTO `auth_permission` VALUES (38, 'Can change log entry', 10, 'change_logentry');
INSERT INTO `auth_permission` VALUES (39, 'Can delete log entry', 10, 'delete_logentry');
INSERT INTO `auth_permission` VALUES (40, 'Can view log entry', 10, 'view_logentry');
INSERT INTO `auth_permission` VALUES (41, 'Can add permission', 11, 'add_permission');
INSERT INTO `auth_permission` VALUES (42, 'Can change permission', 11, 'change_permission');
INSERT INTO `auth_permission` VALUES (43, 'Can delete permission', 11, 'delete_permission');
INSERT INTO `auth_permission` VALUES (44, 'Can view permission', 11, 'view_permission');
INSERT INTO `auth_permission` VALUES (45, 'Can add group', 12, 'add_group');
INSERT INTO `auth_permission` VALUES (46, 'Can change group', 12, 'change_group');
INSERT INTO `auth_permission` VALUES (47, 'Can delete group', 12, 'delete_group');
INSERT INTO `auth_permission` VALUES (48, 'Can view group', 12, 'view_group');
INSERT INTO `auth_permission` VALUES (49, 'Can add content type', 13, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (50, 'Can change content type', 13, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (51, 'Can delete content type', 13, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (52, 'Can view content type', 13, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (53, 'Can add session', 14, 'add_session');
INSERT INTO `auth_permission` VALUES (54, 'Can change session', 14, 'change_session');
INSERT INTO `auth_permission` VALUES (55, 'Can delete session', 14, 'delete_session');
INSERT INTO `auth_permission` VALUES (56, 'Can view session', 14, 'view_session');
INSERT INTO `auth_permission` VALUES (57, 'Can add 上传图片', 15, 'add_uploadedimage');
INSERT INTO `auth_permission` VALUES (58, 'Can change 上传图片', 15, 'change_uploadedimage');
INSERT INTO `auth_permission` VALUES (59, 'Can delete 上传图片', 15, 'delete_uploadedimage');
INSERT INTO `auth_permission` VALUES (60, 'Can view 上传图片', 15, 'view_uploadedimage');

-- ----------------------------
-- Table structure for django_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `object_repr` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NULL DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co`(`content_type_id` ASC) USING BTREE,
  INDEX `django_admin_log_user_id_c564eba6_fk_gym_user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_gym_user_id` FOREIGN KEY (`user_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_admin_log_chk_1` CHECK (`action_flag` >= 0)
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label` ASC, `model` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES (10, 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES (12, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (11, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (15, 'common', 'uploadedimage');
INSERT INTO `django_content_type` VALUES (13, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (3, 'courses', 'course');
INSERT INTO `django_content_type` VALUES (4, 'courses', 'coursecategory');
INSERT INTO `django_content_type` VALUES (6, 'courses', 'courseenrollment');
INSERT INTO `django_content_type` VALUES (5, 'courses', 'courseschedule');
INSERT INTO `django_content_type` VALUES (7, 'orders', 'membershipplan');
INSERT INTO `django_content_type` VALUES (8, 'orders', 'order');
INSERT INTO `django_content_type` VALUES (9, 'orders', 'orderitem');
INSERT INTO `django_content_type` VALUES (14, 'sessions', 'session');
INSERT INTO `django_content_type` VALUES (1, 'users', 'user');
INSERT INTO `django_content_type` VALUES (2, 'users', 'userprofile');

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'contenttypes', '0001_initial', '2025-05-14 15:59:29.712098');
INSERT INTO `django_migrations` VALUES (2, 'contenttypes', '0002_remove_content_type_name', '2025-05-14 15:59:29.783772');
INSERT INTO `django_migrations` VALUES (3, 'auth', '0001_initial', '2025-05-14 15:59:30.048473');
INSERT INTO `django_migrations` VALUES (4, 'auth', '0002_alter_permission_name_max_length', '2025-05-14 15:59:30.116869');
INSERT INTO `django_migrations` VALUES (5, 'auth', '0003_alter_user_email_max_length', '2025-05-14 15:59:30.126507');
INSERT INTO `django_migrations` VALUES (6, 'auth', '0004_alter_user_username_opts', '2025-05-14 15:59:30.133506');
INSERT INTO `django_migrations` VALUES (7, 'auth', '0005_alter_user_last_login_null', '2025-05-14 15:59:30.141508');
INSERT INTO `django_migrations` VALUES (8, 'auth', '0006_require_contenttypes_0002', '2025-05-14 15:59:30.145505');
INSERT INTO `django_migrations` VALUES (9, 'auth', '0007_alter_validators_add_error_messages', '2025-05-14 15:59:30.152543');
INSERT INTO `django_migrations` VALUES (10, 'auth', '0008_alter_user_username_max_length', '2025-05-14 15:59:30.162542');
INSERT INTO `django_migrations` VALUES (11, 'auth', '0009_alter_user_last_name_max_length', '2025-05-14 15:59:30.170544');
INSERT INTO `django_migrations` VALUES (12, 'auth', '0010_alter_group_name_max_length', '2025-05-14 15:59:30.188543');
INSERT INTO `django_migrations` VALUES (13, 'auth', '0011_update_proxy_permissions', '2025-05-14 15:59:30.196543');
INSERT INTO `django_migrations` VALUES (14, 'auth', '0012_alter_user_first_name_max_length', '2025-05-14 15:59:30.204542');
INSERT INTO `django_migrations` VALUES (15, 'users', '0001_initial', '2025-05-14 15:59:30.676532');
INSERT INTO `django_migrations` VALUES (16, 'admin', '0001_initial', '2025-05-14 15:59:30.821104');
INSERT INTO `django_migrations` VALUES (17, 'admin', '0002_logentry_remove_auto_add', '2025-05-14 15:59:30.844108');
INSERT INTO `django_migrations` VALUES (18, 'admin', '0003_logentry_add_action_flag_choices', '2025-05-14 15:59:30.853108');
INSERT INTO `django_migrations` VALUES (19, 'courses', '0001_initial', '2025-05-14 15:59:31.055243');
INSERT INTO `django_migrations` VALUES (20, 'courses', '0002_initial', '2025-05-14 15:59:31.283061');
INSERT INTO `django_migrations` VALUES (21, 'orders', '0001_initial', '2025-05-14 15:59:31.553398');
INSERT INTO `django_migrations` VALUES (22, 'orders', '0002_order_user', '2025-05-14 15:59:31.635202');
INSERT INTO `django_migrations` VALUES (23, 'sessions', '0001_initial', '2025-05-14 15:59:31.671753');
INSERT INTO `django_migrations` VALUES (24, 'courses', '0003_alter_course_image', '2025-05-24 11:30:55.031484');
INSERT INTO `django_migrations` VALUES (25, 'users', '0002_alter_user_avatar', '2025-05-24 11:32:48.162282');

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session`  (
  `session_key` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`) USING BTREE,
  INDEX `django_session_expire_date_a5c62663`(`expire_date` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_session
-- ----------------------------

-- ----------------------------
-- Table structure for gym_course
-- ----------------------------
DROP TABLE IF EXISTS `gym_course`;
CREATE TABLE `gym_course`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NOT NULL,
  `duration` int NOT NULL,
  `capacity` int NOT NULL,
  `difficulty` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint NOT NULL,
  `instructor_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `gym_course_category_id_7585c224_fk_gym_course_category_id`(`category_id` ASC) USING BTREE,
  INDEX `gym_course_instructor_id_e1636dae_fk_gym_user_id`(`instructor_id` ASC) USING BTREE,
  CONSTRAINT `gym_course_category_id_7585c224_fk_gym_course_category_id` FOREIGN KEY (`category_id`) REFERENCES `gym_course_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gym_course_instructor_id_e1636dae_fk_gym_user_id` FOREIGN KEY (`instructor_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_course
-- ----------------------------
INSERT INTO `gym_course` VALUES (3, 'Hatha Yoga', 'Traditional yoga practice focusing on physical postures and breathing techniques', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', 99.00, 60, 20, 'beginner', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3, 27);
INSERT INTO `gym_course` VALUES (4, 'Power Yoga', 'Dynamic and energetic yoga practice', 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b', 129.00, 75, 15, 'intermediate', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3, 28);
INSERT INTO `gym_course` VALUES (5, 'CrossFit', 'High-intensity functional movements', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', 149.00, 60, 12, 'advanced', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3, 29);
INSERT INTO `gym_course` VALUES (6, 'Swimming Basics', 'Learn basic swimming techniques', 'https://images.unsplash.com/photo-1530549387789-4c1017266635', 199.00, 45, 8, 'beginner', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3, 27);
INSERT INTO `gym_course` VALUES (7, 'Kickboxing', 'Cardio kickboxing for fitness', 'https://images.unsplash.com/photo-1518611012118-696072aa579a', 159.00, 60, 15, 'intermediate', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3, 29);
INSERT INTO `gym_course` VALUES (8, 'Zumba', 'Dance fitness program', 'https://images.unsplash.com/photo-1518611012118-696072aa579a', 119.00, 45, 20, 'beginner', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3, 28);

-- ----------------------------
-- Table structure for gym_course_category
-- ----------------------------
DROP TABLE IF EXISTS `gym_course_category`;
CREATE TABLE `gym_course_category`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_course_category
-- ----------------------------
INSERT INTO `gym_course_category` VALUES (2, 'test', '1111', '2025-05-24 08:14:27.937306', '2025-05-24 08:14:27.937306');
INSERT INTO `gym_course_category` VALUES (3, 'Yoga', 'Various yoga classes for all levels', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_course_category` VALUES (4, 'Fitness', 'General fitness and workout classes', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_course_category` VALUES (5, 'Swimming', 'Swimming lessons and water exercises', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_course_category` VALUES (6, 'Martial Arts', 'Self-defense and martial arts training', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_course_category` VALUES (7, 'Dance', 'Dance classes for fitness and fun', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');

-- ----------------------------
-- Table structure for gym_course_enrollment
-- ----------------------------
DROP TABLE IF EXISTS `gym_course_enrollment`;
CREATE TABLE `gym_course_enrollment`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attendance` tinyint(1) NULL DEFAULT NULL,
  `feedback` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `rating` int NULL DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `schedule_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `gym_course_enrollment_user_id_schedule_id_141354bd_uniq`(`user_id` ASC, `schedule_id` ASC) USING BTREE,
  INDEX `gym_course_enrollmen_schedule_id_c4ed0033_fk_gym_cours`(`schedule_id` ASC) USING BTREE,
  CONSTRAINT `gym_course_enrollmen_schedule_id_c4ed0033_fk_gym_cours` FOREIGN KEY (`schedule_id`) REFERENCES `gym_course_schedule` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gym_course_enrollment_user_id_4a7a3d81_fk_gym_user_id` FOREIGN KEY (`user_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_course_enrollment
-- ----------------------------
INSERT INTO `gym_course_enrollment` VALUES (3, 'enrolled', NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 6, 30);
INSERT INTO `gym_course_enrollment` VALUES (4, 'enrolled', NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 6, 31);
INSERT INTO `gym_course_enrollment` VALUES (5, 'enrolled', NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 6, 32);
INSERT INTO `gym_course_enrollment` VALUES (6, 'enrolled', NULL, NULL, NULL, '2025-05-24 18:26:44.654338', '2025-05-24 18:26:44.654338', 6, 1);
INSERT INTO `gym_course_enrollment` VALUES (7, 'enrolled', NULL, NULL, NULL, '2025-05-24 18:26:45.609853', '2025-05-24 18:26:45.609853', 7, 1);
INSERT INTO `gym_course_enrollment` VALUES (8, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:06:54.174813', '2025-05-24 19:06:54.174813', 9, 6);
INSERT INTO `gym_course_enrollment` VALUES (9, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:07:13.705212', '2025-05-24 19:07:13.705212', 6, 6);
INSERT INTO `gym_course_enrollment` VALUES (10, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:10:12.525289', '2025-05-24 19:10:12.525289', 7, 6);
INSERT INTO `gym_course_enrollment` VALUES (11, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:41:59.439347', '2025-05-24 19:41:59.439347', 6, 36);
INSERT INTO `gym_course_enrollment` VALUES (12, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:43:22.276269', '2025-05-24 19:43:22.276269', 7, 36);
INSERT INTO `gym_course_enrollment` VALUES (13, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:43:24.350768', '2025-05-24 19:43:24.350768', 8, 36);
INSERT INTO `gym_course_enrollment` VALUES (14, 'enrolled', NULL, NULL, NULL, '2025-05-24 19:43:40.250527', '2025-05-24 19:43:40.250527', 10, 36);
INSERT INTO `gym_course_enrollment` VALUES (15, 'enrolled', 1, 'Great instructor!', 5, '2025-05-25 12:30:00.000000', '2025-05-25 12:30:00.000000', 6, 50);
INSERT INTO `gym_course_enrollment` VALUES (16, 'enrolled', 1, 'Excellent class', 4, '2025-05-25 12:35:00.000000', '2025-05-25 12:35:00.000000', 7, 51);
INSERT INTO `gym_course_enrollment` VALUES (17, 'enrolled', 1, 'Very helpful', 5, '2025-05-25 12:40:00.000000', '2025-05-25 12:40:00.000000', 8, 52);
INSERT INTO `gym_course_enrollment` VALUES (18, 'cancelled', 0, NULL, NULL, '2025-05-25 12:45:00.000000', '2025-05-25 13:45:00.000000', 9, 53);
INSERT INTO `gym_course_enrollment` VALUES (19, 'enrolled', 1, 'Good workout', 4, '2025-05-25 12:50:00.000000', '2025-05-25 12:50:00.000000', 10, 54);
INSERT INTO `gym_course_enrollment` VALUES (20, 'enrolled', 0, NULL, NULL, '2025-05-25 12:55:00.000000', '2025-05-25 12:55:00.000000', 11, 55);
INSERT INTO `gym_course_enrollment` VALUES (21, 'pending', NULL, NULL, NULL, '2025-05-25 13:00:00.000000', '2025-05-25 13:00:00.000000', 12, 56);
INSERT INTO `gym_course_enrollment` VALUES (22, 'enrolled', 1, 'Loved it!', 5, '2025-05-25 13:05:00.000000', '2025-05-25 13:05:00.000000', 6, 57);
INSERT INTO `gym_course_enrollment` VALUES (23, 'enrolled', 1, 'Great class', 4, '2025-05-25 13:10:00.000000', '2025-05-25 13:10:00.000000', 7, 58);
INSERT INTO `gym_course_enrollment` VALUES (24, 'cancelled', 0, NULL, NULL, '2025-05-25 13:15:00.000000', '2025-05-25 14:15:00.000000', 8, 59);
INSERT INTO `gym_course_enrollment` VALUES (25, 'enrolled', 1, 'Very challenging', 4, '2025-05-25 13:20:00.000000', '2025-05-25 13:20:00.000000', 9, 60);
INSERT INTO `gym_course_enrollment` VALUES (26, 'enrolled', 1, 'Great experience', 5, '2025-05-25 13:25:00.000000', '2025-05-25 13:25:00.000000', 10, 61);
INSERT INTO `gym_course_enrollment` VALUES (27, 'enrolled', 0, NULL, NULL, '2025-05-25 13:30:00.000000', '2025-05-25 13:30:00.000000', 11, 62);
INSERT INTO `gym_course_enrollment` VALUES (28, 'pending', NULL, NULL, NULL, '2025-05-25 13:35:00.000000', '2025-05-25 13:35:00.000000', 12, 63);
INSERT INTO `gym_course_enrollment` VALUES (29, 'enrolled', 1, 'Awesome', 5, '2025-05-25 13:40:00.000000', '2025-05-25 13:40:00.000000', 6, 64);
INSERT INTO `gym_course_enrollment` VALUES (30, 'enrolled', 1, 'Good training', 4, '2025-05-25 13:45:00.000000', '2025-05-25 13:45:00.000000', 7, 65);
INSERT INTO `gym_course_enrollment` VALUES (31, 'enrolled', 1, 'Fantastic', 5, '2025-05-25 13:50:00.000000', '2025-05-25 13:50:00.000000', 8, 66);
INSERT INTO `gym_course_enrollment` VALUES (32, 'cancelled', 0, NULL, NULL, '2025-05-25 13:55:00.000000', '2025-05-25 14:55:00.000000', 9, 67);
INSERT INTO `gym_course_enrollment` VALUES (33, 'enrolled', 1, 'Great session', 4, '2025-05-25 14:00:00.000000', '2025-05-25 14:00:00.000000', 10, 68);
INSERT INTO `gym_course_enrollment` VALUES (34, 'enrolled', 0, NULL, NULL, '2025-05-25 14:05:00.000000', '2025-05-25 14:05:00.000000', 11, 69);
INSERT INTO `gym_course_enrollment` VALUES (35, 'pending', NULL, NULL, NULL, '2025-05-25 14:10:00.000000', '2025-05-25 14:10:00.000000', 12, 50);
INSERT INTO `gym_course_enrollment` VALUES (36, 'enrolled', 1, 'Excellent', 5, '2025-05-25 14:15:00.000000', '2025-05-25 14:15:00.000000', 7, 52);
INSERT INTO `gym_course_enrollment` VALUES (37, 'enrolled', 1, 'Very good', 4, '2025-05-25 14:20:00.000000', '2025-05-25 14:20:00.000000', 8, 54);
INSERT INTO `gym_course_enrollment` VALUES (38, 'cancelled', 0, NULL, NULL, '2025-05-25 14:25:00.000000', '2025-05-25 15:25:00.000000', 9, 56);
INSERT INTO `gym_course_enrollment` VALUES (39, 'enrolled', 1, 'Great class', 4, '2025-05-25 14:30:00.000000', '2025-05-25 14:30:00.000000', 10, 58);
INSERT INTO `gym_course_enrollment` VALUES (40, 'enrolled', 1, 'Amazing workout', 5, '2025-05-25 14:35:00.000000', '2025-05-25 14:35:00.000000', 11, 60);
INSERT INTO `gym_course_enrollment` VALUES (41, 'enrolled', 0, NULL, NULL, '2025-05-25 14:40:00.000000', '2025-05-25 14:40:00.000000', 12, 62);
INSERT INTO `gym_course_enrollment` VALUES (43, 'enrolled', 1, 'Great session', 5, '2025-05-25 14:50:00.000000', '2025-05-25 14:50:00.000000', 7, 66);
INSERT INTO `gym_course_enrollment` VALUES (44, 'enrolled', 1, 'Very helpful', 4, '2025-05-25 14:55:00.000000', '2025-05-25 14:55:00.000000', 8, 68);
INSERT INTO `gym_course_enrollment` VALUES (45, 'enrolled', 1, 'Fantastic', 5, '2025-05-25 15:00:00.000000', '2025-05-25 15:00:00.000000', 9, 51);
INSERT INTO `gym_course_enrollment` VALUES (46, 'cancelled', 0, NULL, NULL, '2025-05-25 15:05:00.000000', '2025-05-25 16:05:00.000000', 10, 53);
INSERT INTO `gym_course_enrollment` VALUES (48, 'enrolled', 0, NULL, NULL, '2025-05-25 15:15:00.000000', '2025-05-25 15:15:00.000000', 12, 57);
INSERT INTO `gym_course_enrollment` VALUES (49, 'pending', NULL, NULL, NULL, '2025-05-25 15:20:00.000000', '2025-05-25 15:20:00.000000', 6, 59);
INSERT INTO `gym_course_enrollment` VALUES (50, 'enrolled', 1, 'Excellent class', 5, '2025-05-25 15:25:00.000000', '2025-05-25 15:25:00.000000', 7, 61);
INSERT INTO `gym_course_enrollment` VALUES (51, 'enrolled', 1, 'Very good', 4, '2025-05-25 15:30:00.000000', '2025-05-25 15:30:00.000000', 8, 63);
INSERT INTO `gym_course_enrollment` VALUES (52, 'cancelled', 0, NULL, NULL, '2025-05-25 15:35:00.000000', '2025-05-25 16:35:00.000000', 9, 65);
INSERT INTO `gym_course_enrollment` VALUES (53, 'enrolled', 1, 'Awesome session', 5, '2025-05-25 15:40:00.000000', '2025-05-25 15:40:00.000000', 10, 67);
INSERT INTO `gym_course_enrollment` VALUES (55, 'enrolled', 0, NULL, NULL, '2025-05-25 15:50:00.000000', '2025-05-25 15:50:00.000000', 12, 51);

-- ----------------------------
-- Table structure for gym_course_schedule
-- ----------------------------
DROP TABLE IF EXISTS `gym_course_schedule`;
CREATE TABLE `gym_course_schedule`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `current_capacity` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `gym_course_schedule_course_id_5e70b784_fk_gym_course_id`(`course_id` ASC) USING BTREE,
  CONSTRAINT `gym_course_schedule_course_id_5e70b784_fk_gym_course_id` FOREIGN KEY (`course_id`) REFERENCES `gym_course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_course_schedule
-- ----------------------------
INSERT INTO `gym_course_schedule` VALUES (6, '2024-03-20 09:00:00.000000', '2024-03-20 10:00:00.000000', 'Yoga Studio 1', 3, '2025-05-25 02:15:58.000000', '2025-05-24 19:41:59.452441', 3);
INSERT INTO `gym_course_schedule` VALUES (7, '2024-03-20 18:00:00.000000', '2024-03-20 19:00:00.000000', 'Yoga Studio 1', 3, '2025-05-25 02:15:58.000000', '2025-05-24 19:43:22.291271', 3);
INSERT INTO `gym_course_schedule` VALUES (8, '2024-03-20 10:00:00.000000', '2024-03-20 11:15:00.000000', 'Yoga Studio 2', 1, '2025-05-25 02:15:58.000000', '2025-05-24 19:43:24.354769', 3);
INSERT INTO `gym_course_schedule` VALUES (9, '2024-03-20 14:00:00.000000', '2024-03-20 15:00:00.000000', 'CrossFit Area', 1, '2025-05-25 02:15:58.000000', '2025-05-24 19:06:54.180605', 3);
INSERT INTO `gym_course_schedule` VALUES (10, '2024-03-20 16:00:00.000000', '2024-03-20 16:45:00.000000', 'Swimming Pool', 1, '2025-05-25 02:15:58.000000', '2025-05-24 19:43:40.269530', 3);
INSERT INTO `gym_course_schedule` VALUES (11, '2024-03-20 17:00:00.000000', '2024-03-20 18:00:00.000000', 'Martial Arts Studio', 0, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3);
INSERT INTO `gym_course_schedule` VALUES (12, '2024-03-20 19:00:00.000000', '2024-03-20 19:45:00.000000', 'Dance Studio', 0, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 3);

-- ----------------------------
-- Table structure for gym_membership_plan
-- ----------------------------
DROP TABLE IF EXISTS `gym_membership_plan`;
CREATE TABLE `gym_membership_plan`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `benefits` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_membership_plan
-- ----------------------------
INSERT INTO `gym_membership_plan` VALUES (1, 'test', 'monthly', 90, 90.00, NULL, NULL, 1, '2025-05-24 06:51:42.485071', '2025-05-24 06:51:42.485071');
INSERT INTO `gym_membership_plan` VALUES (2, 'Basic Monthly', 'monthly', 30, 299.00, 'Basic monthly membership', 'Access to gym facilities\nGroup classes\nLocker room access', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_membership_plan` VALUES (3, 'Premium Monthly', 'monthly', 30, 499.00, 'Premium monthly membership', 'All Basic benefits\nPersonal trainer sessions\nSpa access\nPriority booking', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_membership_plan` VALUES (4, 'Quarterly Plan', 'quarterly', 90, 799.00, '3-month membership plan', 'All Basic benefits\n2 personal trainer sessions\nNutrition consultation', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');
INSERT INTO `gym_membership_plan` VALUES (5, 'Annual Plan', 'yearly', 365, 2999.00, 'Annual membership plan', 'All Premium benefits\nUnlimited personal trainer sessions\nNutrition plan\nPriority booking for all classes', 1, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000');

-- ----------------------------
-- Table structure for gym_order
-- ----------------------------
DROP TABLE IF EXISTS `gym_order`;
CREATE TABLE `gym_order`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_amount` decimal(10, 2) NOT NULL,
  `discount_amount` decimal(10, 2) NOT NULL,
  `actual_amount` decimal(10, 2) NOT NULL,
  `payment_method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `payment_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `paid_at` datetime(6) NULL DEFAULT NULL,
  `remark` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_id`(`order_id` ASC) USING BTREE,
  INDEX `gym_order_user_id_66d4bc5b_fk_gym_user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `gym_order_user_id_66d4bc5b_fk_gym_user_id` FOREIGN KEY (`user_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_order
-- ----------------------------
INSERT INTO `gym_order` VALUES (1, '0658428e-5431-4829-9ddd-b9f9895c1e74', 'membership', 'pending', 90.00, 0.00, 90.00, NULL, NULL, NULL, NULL, '2025-05-24 17:58:57.449298', '2025-05-24 17:58:57.449298', 1);
INSERT INTO `gym_order` VALUES (2, 'ORD202403200001', 'membership', 'paid', 299.00, 0.00, 299.00, 'wechat', 'WX202403200001', '2025-05-25 02:15:58.000000', 'Monthly membership purchase', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 30);
INSERT INTO `gym_order` VALUES (3, 'ORD202403200002', 'membership', 'paid', 799.00, 0.00, 799.00, 'alipay', 'ALI202403200001', '2025-05-25 02:15:58.000000', 'Quarterly membership purchase', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 31);
INSERT INTO `gym_order` VALUES (4, 'ORD202403200003', 'membership', 'paid', 2999.00, 0.00, 2999.00, 'card', 'CARD202403200001', '2025-05-25 02:15:58.000000', 'Annual membership purchase', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 32);

-- ----------------------------
-- Table structure for gym_order_item
-- ----------------------------
DROP TABLE IF EXISTS `gym_order_item`;
CREATE TABLE `gym_order_item`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `item_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_price` decimal(10, 2) NOT NULL,
  `quantity` int NOT NULL,
  `item_total` decimal(10, 2) NOT NULL,
  `course_id` bigint NULL DEFAULT NULL,
  `membership_plan_id` bigint NULL DEFAULT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `gym_order_item_course_id_0a2e360e_fk_gym_course_id`(`course_id` ASC) USING BTREE,
  INDEX `gym_order_item_membership_plan_id_e9aa264d_fk_gym_membe`(`membership_plan_id` ASC) USING BTREE,
  INDEX `gym_order_item_order_id_d24c203d_fk_gym_order_id`(`order_id` ASC) USING BTREE,
  CONSTRAINT `gym_order_item_course_id_0a2e360e_fk_gym_course_id` FOREIGN KEY (`course_id`) REFERENCES `gym_course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gym_order_item_membership_plan_id_e9aa264d_fk_gym_membe` FOREIGN KEY (`membership_plan_id`) REFERENCES `gym_membership_plan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gym_order_item_order_id_d24c203d_fk_gym_order_id` FOREIGN KEY (`order_id`) REFERENCES `gym_order` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_order_item
-- ----------------------------
INSERT INTO `gym_order_item` VALUES (1, 'test', 90.00, 1, 90.00, NULL, 1, 1);
INSERT INTO `gym_order_item` VALUES (2, 'Basic Monthly Membership', 299.00, 1, 299.00, NULL, 2, 2);
INSERT INTO `gym_order_item` VALUES (3, 'Quarterly Plan', 799.00, 1, 799.00, NULL, 2, 2);
INSERT INTO `gym_order_item` VALUES (4, 'Annual Plan', 2999.00, 1, 2999.00, NULL, 2, 2);

-- ----------------------------
-- Table structure for gym_uploaded_image
-- ----------------------------
DROP TABLE IF EXISTS `gym_uploaded_image`;
CREATE TABLE `gym_uploaded_image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `business_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'other',
  `business_id` int NULL DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_business`(`business_type` ASC, `business_id` ASC) USING BTREE,
  INDEX `idx_is_active`(`is_active` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_uploaded_image
-- ----------------------------
INSERT INTO `gym_uploaded_image` VALUES (1, 'uploads/other/2025/05/e307922fca7048bb9ba5eb9df3960279.jpg', 'other', NULL, NULL, NULL, 0, '2025-05-24 09:53:49', '2025-05-24 09:53:49');
INSERT INTO `gym_uploaded_image` VALUES (2, 'uploads/other/2025/05/8edba79a744d46cf96264dc0dfa7ed91.jpg', 'other', NULL, NULL, NULL, 0, '2025-05-24 09:53:57', '2025-05-24 09:53:57');
INSERT INTO `gym_uploaded_image` VALUES (3, 'uploads/course/2025/05/8857af6ed2d74328913eebcbdee08a96.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 10:20:03', '2025-05-24 10:20:03');
INSERT INTO `gym_uploaded_image` VALUES (4, 'uploads/course/2025/05/6efc34a6eb764e68b7585321faf8f31b.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 10:25:09', '2025-05-24 10:25:09');
INSERT INTO `gym_uploaded_image` VALUES (5, 'uploads/course/2025/05/12fa8b7c1f0347389a7eadd393e150f7.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 10:26:19', '2025-05-24 10:26:19');
INSERT INTO `gym_uploaded_image` VALUES (6, 'uploads/course/2025/05/2982064dd7664a938944f09642c0bdf8.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 10:39:16', '2025-05-24 10:39:16');
INSERT INTO `gym_uploaded_image` VALUES (7, 'uploads/user/2025/05/d029ab834b92403e827f0e31b2594701.jpg', 'user', 5, NULL, NULL, 0, '2025-05-24 10:43:38', '2025-05-24 10:43:38');
INSERT INTO `gym_uploaded_image` VALUES (8, 'uploads/user/2025/05/7c94b422e49849deb00856359f29bd2b.jpg', 'user', 5, NULL, NULL, 0, '2025-05-24 10:48:11', '2025-05-24 10:48:11');
INSERT INTO `gym_uploaded_image` VALUES (9, 'uploads/user/2025/05/e55a281231a64416a6405cfd7e38138a.jpg', 'user', 5, NULL, NULL, 0, '2025-05-24 10:52:23', '2025-05-24 10:52:23');
INSERT INTO `gym_uploaded_image` VALUES (10, 'uploads/course/2025/05/e0e697fc98ae41ab8669eb3138807718.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 10:53:25', '2025-05-24 10:53:25');
INSERT INTO `gym_uploaded_image` VALUES (11, 'uploads/course/2025/05/737fc9211a2344029c5f48855d6bba09.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 11:19:17', '2025-05-24 11:19:17');
INSERT INTO `gym_uploaded_image` VALUES (12, 'uploads/course/2025/05/ddc24fdbd3f04b36a847e8ece315ad9a.jpg', 'course', 2, NULL, NULL, 0, '2025-05-24 11:20:50', '2025-05-24 11:20:50');
INSERT INTO `gym_uploaded_image` VALUES (13, 'uploads/user/2025/05/96c5105df03641268bf2924014f68151.jpg', 'user', 5, NULL, NULL, 0, '2025-05-24 11:33:29', '2025-05-24 11:33:29');
INSERT INTO `gym_uploaded_image` VALUES (14, 'uploads/user/2025/05/c585193ebf1b4ef1b78d96db94b135dd.jpg', 'user', 5, NULL, NULL, 0, '2025-05-24 11:36:19', '2025-05-24 11:36:19');
INSERT INTO `gym_uploaded_image` VALUES (15, 'uploads/course/2024/03/yoga1.jpg', 'course', 3, 'Yoga Class Image', 'Hatha Yoga class image', 1, '2025-05-25 02:15:58', '2025-05-25 02:15:58');
INSERT INTO `gym_uploaded_image` VALUES (16, 'uploads/course/2024/03/fitness1.jpg', 'course', 3, 'CrossFit Class Image', 'CrossFit class image', 1, '2025-05-25 02:15:58', '2025-05-25 02:15:58');
INSERT INTO `gym_uploaded_image` VALUES (17, 'uploads/user/2024/03/trainer1.jpg', 'user', 27, 'John Trainer Profile', 'John trainer profile image', 1, '2025-05-25 02:15:58', '2025-05-25 02:15:58');

-- ----------------------------
-- Table structure for gym_user
-- ----------------------------
DROP TABLE IF EXISTS `gym_user`;
CREATE TABLE `gym_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) NULL DEFAULT NULL,
  `is_superuser` tinyint(1) NULL DEFAULT 0,
  `username` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `last_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NULL DEFAULT 0,
  `is_active` tinyint(1) NULL DEFAULT 1,
  `date_joined` datetime(6) NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `member_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `birth_date` date NULL DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `membership_start` date NULL DEFAULT NULL,
  `membership_end` date NULL DEFAULT NULL,
  `membership_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `membership_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'active',
  `membership_plan_id` int NULL DEFAULT NULL,
  `membership_plan_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `phone`(`phone` ASC) USING BTREE,
  UNIQUE INDEX `member_id`(`member_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_user
-- ----------------------------
INSERT INTO `gym_user` VALUES (1, 'pbkdf2_sha256$260000$Z0psLFtq1D4syJNe7FzuCF$V4eWmqTVPF78s/Q9NXlmS98HkFh9ZEKh00XgkT3SbHc=', '2025-05-14 16:20:43.933056', 1, 'admin1', '', '', '1@qq.com', 1, 1, '2025-05-14 16:00:04.082787', NULL, 'admin', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 16:00:04.308024', '2025-05-14 16:00:04.308024', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (2, 'pbkdf2_sha256$260000$1QP13Ci0lmBfWIjD4TV6Fs$tyi5f2NX6GZEheCZSjAJxwguIQQ4wnmQPtL5FU9vWKo=', NULL, 0, '111', '', '', 'y964550575d@2925.com', 0, 1, '2025-05-22 12:28:38.458564', '13112344567', 'member', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-22 12:28:38.460564', '2025-05-22 12:28:38.733564', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (4, 'pbkdf2_sha256$260000$boC2uR7bawXcDL4UpfSUcu$Sgg4OZ6XfHuIIAQPm+LntQtpg8nnuNeplP+JyRLcpSw=', NULL, 0, '2222', '', '', '2@qq.com', 0, 1, '2025-05-24 05:30:18.048255', NULL, 'member', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-24 05:30:18.049254', '2025-05-24 05:30:18.547518', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (6, 'pbkdf2_sha256$260000$yrbtPk2kkg2EQd1jOwA78i$jK8kx+BF/JNG5riAcXy1tZq8FZMVDcHTdIuHZVFvJMQ=', NULL, 0, '222', '', '', '1@qq.com', 0, 1, '2025-05-24 17:30:50.294845', '13146544644', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-24 17:30:50.295845', '2025-05-24 17:30:50.523016', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (26, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 1, 'admin', NULL, NULL, 'admin@example.com', 1, 1, '2025-05-25 02:13:25.000000', NULL, 'admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (27, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'john_trainer', NULL, NULL, 'john@example.com', 0, 1, '2025-05-25 02:13:25.000000', '13800138001', 'staff', 'https://images.unsplash.com/photo-1594381898411-846e7d193883', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (28, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'sarah_trainer', NULL, NULL, 'sarah@example.com', 0, 1, '2025-05-25 02:13:25.000000', '13800138002', 'staff', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (29, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'mike_trainer', NULL, NULL, 'mike@example.com', 0, 1, '2025-05-25 02:13:25.000000', '13800138003', 'staff', 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (30, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'alice_member', NULL, NULL, 'alice@example.com', 0, 1, '2025-05-25 02:13:25.000000', '13800138004', 'member', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 'M001', '1990-01-01', 'female', '123 Main St', '2024-01-01', '2024-12-31', 'monthly', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (31, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'bob_member', NULL, NULL, 'bob@example.com', 0, 1, '2025-05-25 02:13:25.000000', '13800138005', 'member', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 'M002', '1988-05-15', 'male', '456 Oak St', '2024-01-01', '2024-12-31', 'quarterly', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (32, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'carol_member', NULL, NULL, 'carol@example.com', 0, 1, '2025-05-25 02:13:25.000000', '13800138006', 'member', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', 'M003', '1992-08-20', 'female', '789 Pine St', '2024-01-01', '2024-12-31', 'yearly', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (33, 'pbkdf2_sha256$260000$jW8rx02xpKiQBEI9nzERil$A/wTsEJXixIFoWC7sZO6N2KXEynarUae2B8u51vU9wY=', NULL, 0, '333', '', '', 'pengjunyu@gs9999hk.com', 0, 1, '2025-05-24 19:31:13.094957', '13111112222', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-24 19:31:13.094957', '2025-05-24 19:31:13.330186', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (36, 'pbkdf2_sha256$260000$Rpo2qdCkFAtgWOqnJJ3qkw$5lPNvGDJ8kU2jOw2SaM+twri80F2cVqXKvKjhNoHQwM=', NULL, 0, '2022012925', '', '', 'iuguy679874o@yantestcur.site', 0, 1, '2025-05-24 19:41:41.672509', '13165432514', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-24 19:41:41.672509', '2025-05-24 19:41:41.885572', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (40, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'david_trainer', NULL, NULL, 'david@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138011', 'staff', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5', NULL, NULL, 'male', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (41, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'emma_trainer', NULL, NULL, 'emma@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138012', 'staff', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', NULL, NULL, 'female', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (42, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'frank_trainer', NULL, NULL, 'frank@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138013', 'staff', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', NULL, NULL, 'male', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (43, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'grace_trainer', NULL, NULL, 'grace@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138014', 'staff', 'https://images.unsplash.com/photo-1547212371-eb5e6a4b590c', NULL, NULL, 'female', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (44, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'henry_trainer', NULL, NULL, 'henry@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138015', 'staff', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61', NULL, NULL, 'male', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (45, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'isabella_trainer', NULL, NULL, 'isabella@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138016', 'staff', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', NULL, NULL, 'female', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (46, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'jack_trainer', NULL, NULL, 'jack@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13800138017', 'staff', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', NULL, NULL, 'male', NULL, NULL, NULL, NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (50, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member01', NULL, NULL, 'member01@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000001', 'member', NULL, 'M101', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (51, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member02', NULL, NULL, 'member02@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000002', 'member', NULL, 'M102', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (52, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member03', NULL, NULL, 'member03@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000003', 'member', NULL, 'M103', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (53, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member04', NULL, NULL, 'member04@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000004', 'member', NULL, 'M104', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (54, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member05', NULL, NULL, 'member05@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000005', 'member', NULL, 'M105', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (55, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member06', NULL, NULL, 'member06@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000006', 'member', NULL, 'M106', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (56, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member07', NULL, NULL, 'member07@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000007', 'member', NULL, 'M107', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (57, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member08', NULL, NULL, 'member08@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000008', 'member', NULL, 'M108', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (58, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member09', NULL, NULL, 'member09@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000009', 'member', NULL, 'M109', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (59, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member10', NULL, NULL, 'member10@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000010', 'member', NULL, 'M110', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (60, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member11', NULL, NULL, 'member11@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000011', 'member', NULL, 'M111', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (61, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member12', NULL, NULL, 'member12@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000012', 'member', NULL, 'M112', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (62, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member13', NULL, NULL, 'member13@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000013', 'member', NULL, 'M113', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (63, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member14', NULL, NULL, 'member14@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000014', 'member', NULL, 'M114', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (64, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member15', NULL, NULL, 'member15@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000015', 'member', NULL, 'M115', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (65, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member16', NULL, NULL, 'member16@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000016', 'member', NULL, 'M116', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (66, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member17', NULL, NULL, 'member17@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000017', 'member', NULL, 'M117', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (67, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member18', NULL, NULL, 'member18@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000018', 'member', NULL, 'M118', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (68, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member19', NULL, NULL, 'member19@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000019', 'member', NULL, 'M119', NULL, 'male', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);
INSERT INTO `gym_user` VALUES (69, 'pbkdf2_sha256$600000$your_hashed_password', NULL, 0, 'member20', NULL, NULL, 'member20@example.com', 0, 1, '2025-05-25 02:15:58.000000', '13900000020', 'member', NULL, 'M120', NULL, 'female', NULL, '2025-01-01', '2025-12-31', 'monthly', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 'active', NULL, NULL);

-- ----------------------------
-- Table structure for gym_user_groups
-- ----------------------------
DROP TABLE IF EXISTS `gym_user_groups`;
CREATE TABLE `gym_user_groups`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `gym_user_groups_user_id_group_id_82959337_uniq`(`user_id` ASC, `group_id` ASC) USING BTREE,
  INDEX `gym_user_groups_group_id_6803f18f_fk_auth_group_id`(`group_id` ASC) USING BTREE,
  CONSTRAINT `gym_user_groups_group_id_6803f18f_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gym_user_groups_user_id_91749750_fk_gym_user_id` FOREIGN KEY (`user_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_user_groups
-- ----------------------------

-- ----------------------------
-- Table structure for gym_user_profile
-- ----------------------------
DROP TABLE IF EXISTS `gym_user_profile`;
CREATE TABLE `gym_user_profile`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `height` decimal(5, 2) NULL DEFAULT NULL,
  `weight` decimal(5, 2) NULL DEFAULT NULL,
  `health_condition` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `fitness_goal` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `fitness_level` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `notes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `gym_user_profile_user_id_e3b52748_fk_gym_user_id` FOREIGN KEY (`user_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_user_profile
-- ----------------------------
INSERT INTO `gym_user_profile` VALUES (32, 180.00, 75.00, 'No health issues', 'muscle_gain', 'advanced', 'Professional trainer with 5 years experience', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 27);
INSERT INTO `gym_user_profile` VALUES (33, 165.00, 55.00, 'No health issues', 'fitness', 'advanced', 'Yoga and Pilates specialist', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 28);
INSERT INTO `gym_user_profile` VALUES (34, 175.00, 70.00, 'No health issues', 'fitness', 'intermediate', 'CrossFit certified trainer', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 29);
INSERT INTO `gym_user_profile` VALUES (35, 165.00, 52.00, 'No health issues', 'weight_loss', 'beginner', 'New member', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 30);
INSERT INTO `gym_user_profile` VALUES (36, 178.00, 75.00, 'No health issues', 'muscle_gain', 'intermediate', 'Regular member', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 31);
INSERT INTO `gym_user_profile` VALUES (37, 162.00, 50.00, 'No health issues', 'wellness', 'beginner', 'Yoga enthusiast', '2025-05-25 02:13:25.000000', '2025-05-25 02:13:25.000000', 32);
INSERT INTO `gym_user_profile` VALUES (38, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-24 19:31:13.108960', '2025-05-24 19:31:13.334185', 33);
INSERT INTO `gym_user_profile` VALUES (44, NULL, NULL, NULL, 'fitness', 'beginner', NULL, '2025-05-24 19:41:41.673721', '2025-05-24 19:41:41.893573', 36);
INSERT INTO `gym_user_profile` VALUES (50, 185.00, 80.00, 'No health issues', 'fitness', 'advanced', 'Boxing specialist with 4 years experience', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 40);
INSERT INTO `gym_user_profile` VALUES (51, 168.00, 57.00, 'No health issues', 'wellness', 'advanced', 'Dance and Zumba instructor', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 41);
INSERT INTO `gym_user_profile` VALUES (52, 182.00, 85.00, 'No health issues', 'muscle_gain', 'advanced', 'Strength training specialist', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 42);
INSERT INTO `gym_user_profile` VALUES (53, 170.00, 58.00, 'No health issues', 'flexibility', 'advanced', 'Pilates instructor', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 43);
INSERT INTO `gym_user_profile` VALUES (54, 178.00, 75.00, 'No health issues', 'endurance', 'advanced', 'Swimming coach', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 44);
INSERT INTO `gym_user_profile` VALUES (55, 165.00, 55.00, 'No health issues', 'weight_loss', 'advanced', 'Aerobics and HIIT specialist', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 45);
INSERT INTO `gym_user_profile` VALUES (56, 180.00, 78.00, 'No health issues', 'fitness', 'advanced', 'Martial arts instructor', '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 46);
INSERT INTO `gym_user_profile` VALUES (60, 175.00, 70.00, 'No health issues', 'weight_loss', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 50);
INSERT INTO `gym_user_profile` VALUES (61, 165.00, 55.00, 'No health issues', 'fitness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 51);
INSERT INTO `gym_user_profile` VALUES (62, 180.00, 80.00, 'No health issues', 'muscle_gain', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 52);
INSERT INTO `gym_user_profile` VALUES (63, 160.00, 50.00, 'No health issues', 'wellness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 53);
INSERT INTO `gym_user_profile` VALUES (64, 178.00, 75.00, 'No health issues', 'fitness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 54);
INSERT INTO `gym_user_profile` VALUES (65, 162.00, 52.00, 'No health issues', 'flexibility', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 55);
INSERT INTO `gym_user_profile` VALUES (66, 183.00, 82.00, 'No health issues', 'endurance', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 56);
INSERT INTO `gym_user_profile` VALUES (67, 170.00, 65.00, 'No health issues', 'weight_loss', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 57);
INSERT INTO `gym_user_profile` VALUES (68, 175.00, 70.00, 'No health issues', 'muscle_gain', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 58);
INSERT INTO `gym_user_profile` VALUES (69, 168.00, 57.00, 'No health issues', 'wellness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 59);
INSERT INTO `gym_user_profile` VALUES (70, 172.00, 68.00, 'No health issues', 'fitness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 60);
INSERT INTO `gym_user_profile` VALUES (71, 165.00, 55.00, 'No health issues', 'flexibility', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 61);
INSERT INTO `gym_user_profile` VALUES (72, 180.00, 78.00, 'No health issues', 'endurance', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 62);
INSERT INTO `gym_user_profile` VALUES (73, 170.00, 60.00, 'No health issues', 'weight_loss', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 63);
INSERT INTO `gym_user_profile` VALUES (74, 175.00, 72.00, 'No health issues', 'muscle_gain', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 64);
INSERT INTO `gym_user_profile` VALUES (75, 167.00, 56.00, 'No health issues', 'wellness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 65);
INSERT INTO `gym_user_profile` VALUES (76, 182.00, 80.00, 'No health issues', 'fitness', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 66);
INSERT INTO `gym_user_profile` VALUES (77, 160.00, 50.00, 'No health issues', 'flexibility', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 67);
INSERT INTO `gym_user_profile` VALUES (78, 178.00, 75.00, 'No health issues', 'endurance', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 68);
INSERT INTO `gym_user_profile` VALUES (79, 166.00, 55.00, 'No health issues', 'weight_loss', 'beginner', NULL, '2025-05-25 02:15:58.000000', '2025-05-25 02:15:58.000000', 69);

-- ----------------------------
-- Table structure for gym_user_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `gym_user_user_permissions`;
CREATE TABLE `gym_user_user_permissions`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `gym_user_user_permissions_user_id_permission_id_eac37047_uniq`(`user_id` ASC, `permission_id` ASC) USING BTREE,
  INDEX `gym_user_user_permis_permission_id_4081d95d_fk_auth_perm`(`permission_id` ASC) USING BTREE,
  CONSTRAINT `gym_user_user_permis_permission_id_4081d95d_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gym_user_user_permissions_user_id_3e00f7b3_fk_gym_user_id` FOREIGN KEY (`user_id`) REFERENCES `gym_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gym_user_user_permissions
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
