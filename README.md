# @ms/game

> 为虚拟主播 [弥生Miku](https://space.bilibili.com/90424564) 生日特制的谐音梗猜成语小游戏 🎂

通过精美的图片提示猜测对应的成语或词语，全部完成后会有特别的生日祝福弹窗！

## 游戏特色

- **图片谜题**：每道题配有精心设计的图片作为提示
- **智能提示系统**：支持多种反馈状态，帮助玩家逐步接近正确答案
- **拼音匹配**：支持拼音匹配和声调识别，降低游戏难度
- **响应式设计**：完美适配桌面端和移动端
- **彩蛋特效**：答对题目时有庆祝彩蛋动画
- **生日祝福**：全部完成后展示特别的生日祝福弹窗

## 技术栈

- **框架**：[Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- **构建工具**：[Vite](https://vite.dev/) - 下一代前端构建工具
- **语言**：[TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- **路由**：[Vue Router](https://router.vuejs.org/) - Vue.js 官方路由
- **状态管理**：[Pinia](https://pinia.vuejs.org/) - Vue 的状态管理库
- **UI 框架**：[Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **拼音处理**：[pinyin-pro](https://pinyin-pro.cn/) - 拼音转换库
- **彩蛋特效**：[canvas-confetti](https://github.com/catdad/canvas-confetti)

## 项目结构

```
src/
├── components/      # Vue 组件
├── assets/images/   # 谜题图片资源
├── utils/           # 工具函数
├── questions.ts     # 谜题配置
├── types.ts         # 类型定义
└── App.vue          # 根组件
```

## 核心功能

### 谜题系统

谜题数据在 `src/questions.ts` 中配置，每个谜题包含：

```typescript
{
  image: string,    // 图片资源路径
  answer: string,   // 正确答案
  w: number,        // 图片宽度
  h: number         // 图片高度
}
```

当前包含 10 道与「弥」相关的谐音梗谜题，例如：

- 猕猴桃
- 鱼米之乡
- 阿弥陀佛
- 生日快乐（最后一题是生日惊喜！）

### 智能验证系统

答案验证采用多级匹配机制（定义在 `src/types.ts`）：

| 状态 | 说明 | 颜色 |
|------|------|------|
| CORRECT | 完全正确（字和位置都对） | 绿色 |
| PRON_CORRECT_POS_CORRECT | 拼音正确、位置正确，但字不对 | 黄色 |
| TONE_CORRECT_POS_CORRECT | 仅声调正确、位置正确 | 浅黄色 |
| CHAR_CORRECT_POS_WRONG | 字正确但位置错误 | 橙色 |
| PRON_CORRECT_POS_WRONG | 拼音正确但位置错误 | 蓝色 |
| ABSENT | 完全不匹配 | 灰色 |

### 交互流程

1. 玩家查看图片提示
2. 在输入框中输入猜测的词语
3. 点击「提交」按钮
4. 系统验证答案并显示反馈
5. 答对后显示彩蛋动画和「下一题」按钮
6. 完成所有题目后展示生日祝福弹窗

## 开发指南

### 环境要求

- Node.js: `^20.19.0 || >=22.12.0`
- pnpm: 推荐使用 pnpm 作为包管理器

### 安装依赖

```sh
pnpm install
```

### 开发模式

```sh
pnpm dev
```

访问 `http://localhost:5173` 查看项目

### 类型检查

```sh
pnpm type-check
```

### 构建生产版本

```sh
pnpm build
```

### 预览生产构建

```sh
pnpm preview
```

### 代码格式化

```sh
# 检查格式
pnpm fmt:check

# 自动格式化
pnpm fmt
```

### 代码检查

```sh
# 检查代码问题
pnpm lint

# 自动修复问题
pnpm lint:fix
```

## 添加新谜题

在 `src/questions.ts` 中添加配置：

```typescript
import imgNewQuestion from '@/assets/images/新图片.webp';

export const questions = [
  // ... 现有谜题
  {
    image: imgNewQuestion,
    answer: '新答案',
    w: 1600,
    h: 3200,
  },
];
```

## 联系方式

- [弥生Miku 的 B 站主页](https://space.bilibili.com/90424564)

---

祝弥生Miku 生日快乐！🎂✨
