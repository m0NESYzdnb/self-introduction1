# 刘好 / Alastor · Interactive Resume

React 19 + Vite + GSAP. 本地启动：

```sh
npm install
npm run dev
```

打开终端提供的本地地址。`npm run build` 输出静态站点到 `dist`；`npm run preview` 预览构建结果。

主题按钮在“跟随系统 → 深色 → 浅色”间循环，默认跟随系统。语言与主题偏好保存到本机。手机图标切换窄屏预览。Tabs 支持方向键、Home 和 End。证书可分类和放大，Esc 关闭。打印按钮打开浏览器打印窗口，选择“另存为 PDF”；打印始终包含全部技能、教育、证书和联系方式，不受当前 Tab 或筛选影响。

内容在 `src/data.js` 及 `src/main.jsx` 中维护。15 张证书原件位于 `public/certificates`。未提供的成绩、项目、课程和岗位方向未显示。智能达摩证书按图片中的颁发主体记录，未误写为阿里达摩院或国家职业资格。

当前标题使用本机瘦金体 / 楷体回退，英文签名使用 Note Script / Segoe Script 回退。尚未提供指定字体文件；如需所有设备外观一致，请提供有使用权的瘦金体与 Note Script-Regular WOFF2/TTF，放入 `public/fonts` 并更新 `src/styles.css` 中的 @font-face。正文优先保证阅读性。

证书和联系方式为公开页面内容。GitHub Pages 部署工作流位于 `.github/workflows/deploy-pages.yml`，推送 `main` 后自动构建发布。Vite 基础路径由工作流从 Pages 配置中获取，本地开发默认使用 `/`。

SplashCursor: supplied React Bits WebGL fluid cursor at src/components/SplashCursor.jsx. Gold color (#EAB308), reduced dye resolution, non-interactive overlay. Disabled for reduced motion and print; resources released when page is hidden or component unmounts. No extra npm dependency.

个人名片使用提供的 React Bits FlipCard（motion/react）。点击或横向拖拽翻面；Enter、空格可切换。悬停轻微倾斜并出现随光标移动的金色高光。背面为静态联系方式，页面原有联系按钮继续提供拨号、邮件和微信复制。

证书图片使用提供的 React Bits RefineFrame：加载时从低清像素块逐步清晰，带扫光和状态标签；图片保持完整比例并使用 contain，避免证书文字被裁切。当前使用现有 lucide-react 图标替代文档中的 Hugeicons，避免额外图标包。

首屏背景使用 public/images/angel-profile.jpg（来自指定 Steam Workshop 文件夹的 preview.jpg），采用左右分栏桌面布局、暖金调色和暗色遮罩；移动端改为上下堆叠。原有 SplashCursor、FlipCard 和证书 RefineFrame 动效保留。
