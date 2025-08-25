# 新能源编程俱乐部微信小程序

基于 https://darrenpig.github.io/Energy-Coder-Club-Website/ 构建的微信小程序版本，采用深色主题设计，包含毛玻璃效果和iOS风格元素。

## 功能特性

- 🎨 **深色主题** - 基于网站主题色设计的深色界面
- ✨ **毛玻璃效果** - 现代化的背景模糊效果
- 📱 **iOS风格** - 符合iOS设计规范的界面元素
- 🏠 **首页展示** - 俱乐部介绍和核心功能展示
- 👥 **团队页面** - 成员介绍和详细信息
- 🚀 **项目展示** - 项目列表和详情查看
- 📝 **加入申请** - 在线申请加入俱乐部
- 📊 **响应式设计** - 适配不同屏幕尺寸

## 技术栈

- 微信小程序原生开发
- WXML + WXSS + JavaScript
- 自定义组件和样式
- 深色主题配色系统

## 项目结构

```
根目录/
├── app.js              # 小程序入口文件
├── app.json            # 小程序配置文件
├── app.wxss            # 全局样式文件
├── sitemap.json        # 搜索索引配置
├── theme.json          # 主题配置
├── project.config.json # 项目配置
├── project.private.config.json # 私有配置
├── pages/              # 页面目录
│   ├── index/         # 首页
│   ├── team/          # 团队页面
│   ├── projects/      # 项目页面
│   ├── join/          # 加入页面
│   └── about/         # 关于页面
├── assets/            # 静态资源
│   ├── icons/         # 图标文件
│   ├── avatars/       # 头像文件
│   └── projects/      # 项目封面
└── README.md          # 项目说明文档
```

## 安装和运行

### 1. 准备工作

1. 安装微信开发者工具
2. 申请小程序AppID（或使用测试号）
3. 克隆或下载本项目代码

### 2. 导入项目

1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择项目根目录（包含 app.json 的目录）
4. 输入AppID（或选择测试号）
5. 点击"确定"导入项目

### 3. 配置图标

1. 准备所需的PNG图标文件
2. 将图标文件放入对应目录：
   - 导航图标：`assets/icons/`
   - 头像图片：`assets/avatars/`
   - 项目封面：`assets/projects/`
3. 确保文件名与代码引用一致

### 4. 修改配置

在 `project.config.json` 中修改小程序配置：

```json
{
  "appid": "your-appid-here",
  "projectname": "energy-coder-club-miniprogram"
}
```

## 页面说明

### 首页 (`pages/index/index`)
- 俱乐部介绍和欢迎信息
- 核心功能快速入口
- 数据统计展示
- 最新动态轮播

### 团队页面 (`pages/team/team`)
- 团队成员列表
- 成员详细信息模态框
- 按角色分类筛选
- 成员技能和项目展示

### 项目页面 (`pages/projects/projects`)
- 项目网格布局
- 项目状态和进度展示
- 技术栈标签显示
- 项目详情查看

### 加入页面 (`pages/join/join`)
- 角色选择器
- 在线申请表单
- 联系信息展示
- 常见问题解答

## 主题色系统

小程序使用与网站一致的主题色：

```css
/* 主色调 */
--primary-color: #16a34a;      /* 绿色 */
--primary-hover: #15803d;      /* 深绿色 */

/* 辅助色 */
--accent-color: #0d9488;       /* 青绿色 */
--success-color: #22c55e;      /* 成功色 */
--warning-color: #f59e0b;      /* 警告色 */
--error-color: #ef4444;         /* 错误色 */

/* 文本色 */
--text-primary: #f1f5f9;       /* 主要文本 */
--text-secondary: #94a3b8;     /* 次要文本 */
--text-muted: #64748b;         /* 弱化文本 */

/* 背景色 */
--bg-primary: #0f172a;         /* 主要背景 */
--bg-secondary: #1e293b;       /* 次要背景 */
--bg-card: rgba(30, 41, 59, 0.8); /* 卡片背景 */
```

## 毛玻璃效果实现

使用CSS backdrop-filter实现毛玻璃效果：

```css
.glass-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}
```

## iOS风格元素

- 圆角设计：使用16-24rpx的圆角
- 阴影效果：柔和的投影提升层次感
- 过渡动画：平滑的交互过渡效果
- 图标系统：统一的线性图标风格

## 自定义修改

### 修改主题色

在 `app.wxss` 中修改CSS变量：

```css
:root {
  --primary-color: #your-color;
  --accent-color: #your-accent-color;
}
```

### 添加新页面

1. 在 `pages/` 目录下创建新页面文件夹
2. 在 `app.json` 的 `pages` 数组中添加页面路径
3. 创建对应的 `.wxml`, `.wxss`, `.js` 文件

### 修改导航栏

在 `app.json` 中配置全局导航栏：

```json
{
  "window": {
    "navigationBarTitleText": "新能源编程俱乐部",
    "navigationBarBackgroundColor": "#0f172a",
    "navigationBarTextStyle": "white"
  }
}
```

## 包大小优化

当前小程序包大小约为 **132.5KB**，远小于微信小程序的 **1.5MB** 主包限制。

### 优化建议

1. **图标优化** - 使用压缩后的PNG图标，保持文件大小在10KB以内
2. **代码分割** - 对于大型功能，考虑使用分包加载
3. **图片压缩** - 使用工具压缩所有图片资源
4. **代码压缩** - 启用微信开发者工具的代码压缩功能

### 包大小统计
- 核心文件：16.8KB
- 页面文件：115.7KB
- 图标文件：<1KB（占位文件）
- **总计：~132.5KB**

## 部署发布

### 测试阶段

1. 在微信开发者工具中点击"预览"
2. 生成二维码进行真机测试
3. 使用"真机调试"功能

### 提交审核

1. 点击"上传"按钮上传代码
2. 在微信公众平台提交审核
3. 等待审核通过

### 发布上线

1. 审核通过后，点击"发布"
2. 选择发布版本
3. 完成小程序上线

## 注意事项

1. **图标格式**：必须使用PNG格式，不能使用SVG
2. **文件大小**：单个文件不能超过2MB
3. **域名配置**：如果需要网络请求，需在公众平台配置合法域名
4. **权限申请**：部分API需要用户授权才能使用
5. **性能优化**：注意页面加载速度和内存使用

## 更新日志

### v1.0.0 (2024-12-20)
- ✅ 完成小程序基础架构
- ✅ 实现深色主题设计
- ✅ 添加毛玻璃效果
- ✅ 完成四个主要页面
- ✅ 实现响应式布局
- ✅ 添加iOS风格元素

## 技术支持

如有问题或建议，请联系：
- 邮箱：contact@energy-coder-club.org
- GitHub：https://github.com/energy-coder-club

## 许可证

本项目采用 MIT 许可证，详见 LICENSE 文件。