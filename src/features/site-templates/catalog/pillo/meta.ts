import type {SiteTemplate} from '../../types'
export const pilloTemplate:SiteTemplate={
 id:'pillo',gitUrl:'https://github.com/weelume/pillo-template',name:'Pillo · 睡眠与健康应用',localizedNames:{en:'Pillo · Sleep tracking & wind-down app'},sceneId:'landing-page',listed:false,
 tags:['睡眠健康','橙色花卉','滚动手机','深浅主题','中英文','PC / iPad / H5'],summary:'花卉视觉与滚动手机联动的睡眠应用模板，包含功能、使用步骤、评价、双周期定价、方案对比和 FAQ。',accentColor:'#f58249',
 cover:'/templates/pillo/screenshots/desktop-home.webp',screenshots:[
  {
    "src": "/templates/pillo/screenshots/desktop-home.webp",
    "alt": "Pillo desktop home",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/pillo/screenshots/desktop-features.webp",
    "alt": "Pillo desktop features",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/pillo/screenshots/desktop-pricing.webp",
    "alt": "Pillo desktop pricing",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/pillo/screenshots/desktop-404.webp",
    "alt": "Pillo desktop 404",
    "device": "desktop",
    "width": 1440,
    "height": 1000
  },
  {
    "src": "/templates/pillo/screenshots/tablet-home.webp",
    "alt": "Pillo tablet home",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/pillo/screenshots/tablet-features.webp",
    "alt": "Pillo tablet features",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/pillo/screenshots/tablet-pricing.webp",
    "alt": "Pillo tablet pricing",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/pillo/screenshots/tablet-404.webp",
    "alt": "Pillo tablet 404",
    "device": "tablet",
    "width": 834,
    "height": 1180
  },
  {
    "src": "/templates/pillo/screenshots/mobile-home.webp",
    "alt": "Pillo mobile home",
    "device": "mobile",
    "width": 380,
    "height": 822
  },
  {
    "src": "/templates/pillo/screenshots/mobile-features.webp",
    "alt": "Pillo mobile features",
    "device": "mobile",
    "width": 380,
    "height": 822
  },
  {
    "src": "/templates/pillo/screenshots/mobile-pricing.webp",
    "alt": "Pillo mobile pricing",
    "device": "mobile",
    "width": 380,
    "height": 822
  },
  {
    "src": "/templates/pillo/screenshots/mobile-404.webp",
    "alt": "Pillo mobile 404",
    "device": "mobile",
    "width": 390,
    "height": 844
  }
],
 surfaces:[{id:'site',name:'响应式官网',platform:'pc',locales:['zh','en'],pages:[{slug:'',title:'首页',localizedTitles:{en:'Home'},load:()=>import('./pages/HomePage')},{slug:'pricing',title:'定价',localizedTitles:{en:'Pricing'},load:()=>import('./pages/PricingPage')},{slug:'404',title:'未找到页面',localizedTitles:{en:'Page not found'},load:()=>import('./pages/NotFoundPage')}]}],
}
