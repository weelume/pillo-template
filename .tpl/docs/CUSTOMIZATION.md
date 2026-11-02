# 修改指南

- config/brand.ts：品牌、价格和素材路径；注入接口为 host.tsx。
- content/copy.ts：标题、功能、步骤、评价、方案和 FAQ，中英文一起维护。睡眠数据为示例。
- theme.css：--pl-* 管理字体、颜色、间距、玻璃面板、滚动条和响应式。
- public/templates/pillo/images：本地图片；更换后更新 docs/asset-sources.json 与 .tpl/assets 真实展示图，保留字体许可。
- components：滚动舞台、手机、菜单、定价和 FAQ，保留原生滚动、键盘和减少动态分支。
- pages 与 meta.ts：页面组合及注册，新增页面同步 template.json。

修改后执行适用的 typecheck、lint、test、build 和受影响的双语页面检查，不新增依赖，不把演示内容当成真实业务承诺。
