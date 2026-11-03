'use client'
import {useRef,useState} from 'react'
import {AnimatePresence,motion,useMotionValueEvent,useReducedMotion,useScroll,useTransform} from 'framer-motion'
import type {SiteTemplatePageProps} from '../../../types'
import {copy} from '../content/copy'
import {pricing} from '../config/brand'
import {motionScene} from '../config/motion'
import {Action,Reveal,route,useDemo} from './Shell'

function Plan({locale='zh',basePath,plus,yearly=false,full=false}:SiteTemplatePageProps&{plus:boolean;yearly?:boolean;full?:boolean}){
 const c=copy[locale],demo=useDemo(),reduced=useReducedMotion()
 const description=plus?c.plusDesc:c.freeDesc
 return <><div className="pl-plan-paper"><div className="pl-plan-label"><span>{plus?c.plus:c.free}</span>{plus&&<small>{c.popular}</small>}</div><h3>{locale==='en'&&!full?description.replaceAll('\n',' '):description}</h3><div className="pl-price" aria-live="polite"><AnimatePresence mode="wait"><motion.strong key={String(yearly)+plus} initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.18}}>${plus?(yearly?pricing.yearly:pricing.monthly):0}</motion.strong></AnimatePresence><span>{plus&&yearly?c.year:c.month}</span></div>{plus&&yearly&&<p className="pl-year-equivalent"><strong>${pricing.yearlyMonthly}</strong> {c.month}</p>}{full?<Action onClick={demo}>{plus?c.choosePlus:c.getStarted}</Action>:<Action href={route(basePath,locale,'pricing')}>{plus?c.choosePlus:c.getStarted}</Action>}</div><ul className="pl-plan-features">{(plus?c.plusFeatures:c.freeFeatures).map(s=><li key={s}><span aria-hidden="true">✓</span>{s}</li>)}</ul></>
}

/** 首页价格是独立滚动场景；定价内页复用同一方案内容，不复用首页的叠放运动。 */
function HomePricing({locale='zh',basePath}:SiteTemplatePageProps){
 const root=useRef<HTMLElement>(null),c=copy[locale],reduced=useReducedMotion()
 const [cardsVisible,setCardsVisible]=useState(false),[compareVisible,setCompareVisible]=useState(false)
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end end']})
 const spread=useTransform(scrollYProgress,[...motionScene.pricingStops],[...motionScene.pricingSpread])
 const left=useTransform(spread,value=>`calc(${value*50}% + ${value*10}px)`)
 const right=useTransform(spread,value=>`calc(${-value*50}% - ${value*10}px)`)
 const headingY=useTransform(scrollYProgress,[0,.6,1],['calc(50vh - 28px)','8vh','8vh'])
 const headingLeft=useTransform(scrollYProgress,[0,.5,1],['0vw','-20vw','0vw'])
 const headingRight=useTransform(scrollYProgress,[0,.5,1],['0vw','20vw','0vw'])
 const cardsY=useTransform(scrollYProgress,[0,.18,.55,1],['110vh','65vh','26vh','26vh'])
 // 显隐使用离散阶段，避免原生滚动时间线把 opacity 的局部区间误映射到整页。
 useMotionValueEvent(scrollYProgress,'change',value=>{setCardsVisible(value>.12);setCompareVisible(value>.75)})
 return <section ref={root} className="pl-pricing pl-pricing-home pl-container" id="pricing" data-static={!!reduced}><div className="pl-pricing-stage">
  <motion.h2 className="pl-pricing-scene-title" style={reduced?{}:{y:headingY}}><motion.span style={reduced?{}:{x:headingLeft}}>{c.plansTitle}</motion.span><motion.span style={reduced?{}:{x:headingRight}}>{c.plansSub}</motion.span></motion.h2>
  <div className="pl-pricing-compare" data-visible={compareVisible}><Action secondary href={route(basePath,locale,'pricing')+'#compare-plans'}>{c.compare}</Action></div>
  <motion.div className="pl-plan-grid" data-visible={cardsVisible} style={reduced?{}:{y:cardsY}}>{[false,true].map(plus=><motion.article key={String(plus)} className={`pl-plan ${plus?'pl-plan-plus':''}`} style={reduced?{}:{x:plus?right:left}}><Plan locale={locale} basePath={basePath} plus={plus}/></motion.article>)}</motion.div>
 </div></section>
}
export function Pricing(props:SiteTemplatePageProps&{full?:boolean}){return props.full?<FullPricing {...props}/>:<HomePricing {...props}/>}
function FullPricing({locale='zh',basePath}:SiteTemplatePageProps){
 const c=copy[locale],reduced=useReducedMotion(),[yearly,setYearly]=useState(false)
 return <section className="pl-pricing pl-pricing-full pl-container" id="pricing"><Reveal className="pl-pricing-heading"><h1>{c.pricingTitle}</h1><p>{c.pricingIntro}</p><div className="pl-billing" aria-label={locale==='zh'?'计费周期':'Billing period'}>{[false,true].map(value=><button key={String(value)} type="button" aria-pressed={yearly===value} onClick={()=>setYearly(value)}>{yearly===value&&<motion.span layoutId="pl-billing-pill" className="pl-billing-pill" transition={{type:'spring',bounce:.15,duration:reduced?0:.4}}/>}<span>{value?c.yearly:c.monthly}{value&&<small>{c.save}</small>}</span></button>)}</div></Reveal><div className="pl-plan-grid">{[false,true].map(plus=><Reveal key={String(plus)} className={`pl-plan ${plus?'pl-plan-plus':''}`} delay={plus?.12:0}><Plan locale={locale} basePath={basePath} plus={plus} yearly={yearly} full/></Reveal>)}</div></section>
}
export function Comparison({locale='zh'}:Pick<SiteTemplatePageProps,'locale'>){const c=copy[locale],demo=useDemo();return <section className="pl-comparison pl-container" id="compare-plans"><Reveal><h2>{c.comparisonTitle}</h2></Reveal><div className="pl-table-container" tabIndex={0} role="region" aria-label={c.compare}><table><thead><tr><th scope="col">{c.features}</th><th scope="col">Plus</th><th scope="col">{c.free}</th></tr></thead><tbody>{c.comparisonFeatures.map((feature,i)=><tr key={feature}><th scope="row">{feature}</th><td><span aria-label={c.included}>✓</span>{i===6&&<small>{c.upToFour}</small>}</td><td>{i===2?c.oneRoutine:i<2?<span aria-label={c.included}>✓</span>:<span aria-label={c.notIncluded}>—</span>}</td></tr>)}</tbody><tfoot><tr><td/><td><Action onClick={demo}>{c.choosePlus}</Action></td><td><Action onClick={demo} secondary>{c.getStarted}</Action></td></tr></tfoot></table></div></section>}
