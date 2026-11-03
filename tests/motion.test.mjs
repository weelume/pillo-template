import {test} from 'node:test'
import assert from 'node:assert/strict'
import {motionScene,phoneScreenAt} from '../src/features/site-templates/catalog/pillo/config/motion.ts'

test('连续滚动依次经过欢迎、闹钟、追踪和放松，向上滚动能恢复上一界面',()=>{
 const samples=[0,.25,.55,.85,.55,.25,0]
 assert.deepEqual(samples.map(phoneScreenAt),['welcome','alarm','tracking','routine','tracking','alarm','welcome'])
})

test('首页价格卡先叠放停留，再沿单调的滚动区间分开',()=>{
 assert.ok(motionScene.pricingSpread[2]>.9)
 assert.equal(motionScene.pricingSpread.at(-1),0)
 assert.ok(motionScene.pricingStops.every((value,i,values)=>i===0||value>values[i-1]))
 assert.ok(motionScene.pricingSpread.every((value,i,values)=>i===0||value<=values[i-1]))
})
