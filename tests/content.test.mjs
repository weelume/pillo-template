import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile,readdir} from 'node:fs/promises'
import {copy} from '../src/features/site-templates/catalog/pillo/content/copy.ts'
import {pricing} from '../src/features/site-templates/catalog/pillo/config/brand.ts'
import {pilloTemplate} from '../src/features/site-templates/catalog/pillo/meta.ts'

function shape(value){
 if(Array.isArray(value))return value.map(shape)
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,shape(item)]))
 return typeof value
}
test('所有可编辑内容的双语结构完整对应',()=>{
 assert.deepEqual(shape(copy.zh),shape(copy.en))
 for(const locale of ['zh','en']){
  assert.equal(copy[locale].comparisonFeatures.length,8)
  assert.deepEqual(copy[locale].featuresData.map(item=>item.screen),['alarm','tracking','routine'])
  assert.ok(copy[locale].faq.every(item=>item.q.trim()&&item.a.trim()))
 }
})
test('年付金额与月均展示一致且不会高于逐月付费',()=>{
 assert.ok(pricing.yearly<pricing.monthly*12)
 assert.ok(Math.abs(pricing.yearly/12-pricing.yearlyMonthly)<.01)
})
test('运行图片与来源记录均为可交付的本地真实文件',async()=>{
 const root=new URL('../',import.meta.url),sources=JSON.parse(await readFile(new URL('.tpl/docs/asset-sources.json',root),'utf8'))
 const names=await readdir(new URL('public/templates/pillo/images/',root))
 for(const name of names){
  const path='public/templates/pillo/images/'+name
  const bytes=await readFile(new URL(path,root))
  assert.ok(bytes.length>100,`${name} 不能是空素材或远程指针`)
  assert.ok(sources.some(item=>item.file===path),`${name} 缺少来源`)
 }
})
test('运行时截图与协议元数据一致并提供三端各四张真实图片',async()=>{
 const metadata=JSON.parse(await readFile(new URL('../.tpl/template.json',import.meta.url),'utf8'))
 const expected=metadata.screenshots.map(({src,alt,device,width,height})=>({src:'/templates/pillo/screenshots/'+src.split('/').at(-1),alt,device,width,height}))
 assert.deepEqual(pilloTemplate.screenshots,expected)
 for(const device of ['desktop','tablet','mobile'])assert.equal(pilloTemplate.screenshots.filter(shot=>shot.device===device).length,4)
})
