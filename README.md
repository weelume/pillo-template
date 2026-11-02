# Pillo 睡眠应用展示模板

响应式双语官网，中文默认；包含首页、定价、404 演示及英文路径，提供主题切换、输入式标题、滚动手机联动、步骤视差、数据循环、横向评价、双周期定价和 FAQ。

首先阅读 .tpl/README.md、.tpl/template.json、.tpl/project.json。

## 环境和运行

Node 24.16.0、pnpm 12.10.1；依赖由锁文件固定。在本机 WSL Linux 文件系统安装、编译和打包，不在服务器构建。

安装：corepack pnpm install --frozen-lockfile。
开发：corepack pnpm dev，默认 http://localhost:43330，可用 PORT 配置；Ctrl+C 停止本次进程。
生产：corepack pnpm build，然后 corepack pnpm start。
检查：corepack pnpm typecheck、corepack pnpm lint、corepack pnpm test。

中文 /，英文 /en，定价 /pricing 与 /en/pricing。无需后台、数据库、账号或密钥。

## 修改和交付

src/features/site-templates/catalog/pillo 下 config 管品牌价格、content 管双语内容、theme.css 管视觉和响应式、components 管交互、pages 管页面、meta.ts 管注册。根路由只识别页面和语言。

运行素材在 public/templates/pillo，展示截图在 .tpl/assets。通用组件从 package.json 的 template / host 导出使用。提交源码后，在本机 WSL 执行 corepack pnpm bundle，生成带 SHA256 的运行包；它不替代完整 Git 工程。

下载按钮仅展示提示，无真实下载、付费、账户或健康数据采集。参考站图片、设计和原始内容的商业权利未确认，listed=false。许可与来源见 .tpl/docs/LICENSE.md 和 asset-sources.json。
