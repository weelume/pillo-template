# 架构

按功能组织于 src/features/site-templates/catalog/pillo，config、content、主题、组件、页面和路由分离。src/app 只识别语言和页面，共享类型在 src/features/site-templates/types.ts。

Shell 管导航、主题、语言、菜单锁定、焦点返回和演示提示。host.tsx 提供可选品牌、Logo、平台入口和页脚注入，默认自身 Pillo 品牌；不读取外部工程路径。

Journey 用原生页面滚动控制手机位移、缩放和屏幕切换；移动端按原站隐藏模型，紧凑排列功能文字。HowItWorks 管视差与错峰、Metrics 管双向循环、Testimonials 管横向故事，Pricing、Faq、Cta 为共享组件。只有一个主要纵向滚动区域。

html 属性在挂载时设置并在卸载还原，限定主题、语言和滚动条作用域。减少动态效果时移除循环和大幅位移，保持静态内容可读。
