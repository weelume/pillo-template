'use client'
import {useEffect,useRef,useState} from 'react'
import {motion,useInView,useMotionValueEvent,useReducedMotion,useScroll,useTransform} from 'framer-motion'
import type {SiteTemplatePageProps} from '../../../types'
import {copy} from '../content/copy'
import {usePilloText} from '../host'
import {asset} from '../config/brand'
import {phoneScreenAt} from '../config/motion'
import {Action,Reveal,route,Trust,usePageVisible} from './Shell'
import {Phone,type Screen} from './Phone'

function WordCycle({locale='zh'}:Pick<SiteTemplatePageProps,'locale'>){
 const c=copy[locale],reduced=useReducedMotion(),[word,setWord]=useState<string>(c.words[0]),root=useRef<HTMLSpanElement>(null),visible=useInView(root)
 useEffect(()=>{
  if(reduced||!visible)return
  let index=0,length=c.words[0].length,deleting=true,timer:ReturnType<typeof setTimeout>
  const tick=()=>{
   if(document.hidden){timer=setTimeout(tick,250);return}
   const text=c.words[index]
   length+=deleting?-1:1;setWord(text.slice(0,length))
   let delay=deleting?65:105
   if(length===0){index=(index+1)%c.words.length;deleting=false;delay=200}
   else if(length===text.length){deleting=true;delay=2300}
   timer=setTimeout(tick,delay)
  }
  timer=setTimeout(tick,2300);return()=>clearTimeout(timer)
 },[reduced,visible,c.words])
 return <span className="pl-word-cycle" ref={root}><span>{reduced?c.words[0]:word}</span></span>
}
function FeatureText({index,locale='zh'}:{index:number}&Pick<SiteTemplatePageProps,'locale'>){
 const c=copy[locale],root=useRef<HTMLDivElement>(null),reduced=useReducedMotion(),text=usePilloText(locale)
 const {scrollYProgress}=useScroll({target:root,offset:['start end','end start']})
 const opacity=useTransform(scrollYProgress,[0,.22,.72,1],[0,1,1,0]),y=useTransform(scrollYProgress,[0,.3,.7,1],[40,0,0,-40])
 const feature=c.featuresData[index]
 return <article ref={root} className="pl-feature pl-container" id={`feature-2-item-${index+1}`}><motion.div className="pl-feature-copy" style={reduced?{}:{opacity,y}}><h2>{feature.title}</h2><p>{text(feature.body)}</p></motion.div><div className="pl-mobile-phone"><Phone screen={feature.screen as Screen} locale={locale}/></div></article>
}
export function Journey({locale='zh',basePath}:SiteTemplatePageProps){
 const root=useRef<HTMLDivElement>(null),c=copy[locale],reduced=useReducedMotion(),text=usePilloText(locale),[screen,setScreen]=useState<Screen>('welcome')
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end end']})
 // 一个连续的滚动场景控制手机的位移和界面；不另建滚动容器或劫持滚轮。
 const x=useTransform(scrollYProgress,[0,.16,.24,1],['56.5vw','14.5vw','14.5vw','14.5vw'])
 const y=useTransform(scrollYProgress,[0,.2,1],['10.5vh','0vh','0vh'])
 const scale=useTransform(scrollYProgress,[0,.2,1],[1,.8,.8])
 const backgroundY=useTransform(scrollYProgress,[0,.23],['0%','22%'])
 useMotionValueEvent(scrollYProgress,'change',v=>{const next=phoneScreenAt(v);setScreen(previous=>previous===next?previous:next)})
 return <div className="pl-journey" ref={root}><section className="pl-hero" id="hero"><motion.img className="pl-hero-background" src={asset('hero')} alt={locale==='zh'?'暖光透过橙色花瓣':'Orange poppy petals glowing in warm backlight'} style={reduced?{}:{y:backgroundY}}/><div className="pl-hero-shade"/><div className="pl-container pl-hero-layout"><div className="pl-hero-copy"><motion.h1 initial={reduced?false:{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1]}}>{c.hero}<WordCycle locale={locale}/></motion.h1><Reveal delay={.15}><p>{text(c.intro)}</p><div className="pl-actions"><Action href={route(basePath,locale)+'#cta'}>{c.start}</Action><Action secondary href={route(basePath,locale,'pricing')}>{c.viewPricing}</Action></div><Trust locale={locale}/></Reveal></div></div><div className="pl-hero-phone-mobile"><Phone locale={locale}/></div></section>
 <div className="pl-journey-phone-layer" aria-hidden="true"><div className="pl-journey-phone-sticky"><motion.div className="pl-journey-phone" style={reduced?{x:'16vw'}:{x,y,scale}}><Phone locale={locale} screen={screen}/></motion.div></div></div>
 {[0,1,2].map(i=><FeatureText key={i} locale={locale} index={i}/>)}</div>
}
export function HowItWorks({locale='zh'}:Pick<SiteTemplatePageProps,'locale'>){
 const c=copy[locale],root=useRef<HTMLElement>(null),reduced=useReducedMotion(),text=usePilloText(locale)
 const {scrollYProgress}=useScroll({target:root,offset:['start end','end start']})
 const rotate=useTransform(scrollYProgress,[0,.5,1],[-3,0,3]),y=useTransform(scrollYProgress,[0,1],[45,-35])
 return <section className="pl-how pl-container" id="how-it-works" ref={root}><Reveal className="pl-centered"><p className="pl-eyebrow">{c.howLabel}</p><h2>{c.howTitle}</h2></Reveal><div className="pl-how-stage"><div className="pl-hand-crop"><motion.img className="pl-hand" src={asset('hand')} alt={locale==='zh'?'手持显示橙色花朵的手机':'Hand holding a phone with an orange flower'} style={reduced?{}:{rotate,y}}/></div>{c.steps.map((step,i)=><Reveal key={step.title} className={`pl-step pl-step-${i}`} delay={i*.13}><h3>{c.step} {i+1} — {step.title}</h3><p>{text(step.body)}</p></Reveal>)}</div></section>
}
export function Metrics({locale='zh'}:Pick<SiteTemplatePageProps,'locale'>){const c=copy[locale],root=useRef<HTMLElement>(null),visible=useInView(root),pageVisible=usePageVisible();return <section ref={root} className="pl-metrics" id="metrics" tabIndex={0} data-running={visible&&pageVisible} aria-label={locale==='zh'?'用户好眠数据':'Sleep statistics'}>{[0,1].map(row=><div className={`pl-marquee pl-marquee-${row}`} key={row}><div className="pl-marquee-track">{[0,1,2,3].map(repeat=><div className="pl-marquee-group" aria-hidden={repeat>0} key={repeat}>{c.metrics.map((metric,i)=><div className="pl-metric" key={metric}><img src={asset(['hydrangea','fabric','peony'][(i+row)%3])} alt=""/><span>{c.metrics[(i+row)%c.metrics.length]}</span></div>)}</div>)}</div></div>)}</section>}
export function Testimonials({locale='zh'}:Pick<SiteTemplatePageProps,'locale'>){
 const c=copy[locale],root=useRef<HTMLElement>(null),reduced=useReducedMotion(),text=usePilloText(locale)
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end end']})
 const x=useTransform(scrollYProgress,[0,1],['0vw',`-${c.reviews.length*100}vw`])
 // 原站用纵向原生滚动驱动四幕横向故事，文字和人物照片同时移动。
 return <section className="pl-testimonials" id="testimonials" ref={root}><div className="pl-testimonials-sticky"><motion.div className="pl-testimonials-track" style={reduced?{}:{x}}><div className="pl-testimonials-panel"><div className="pl-testimonials-intro pl-container"><div><p className="pl-eyebrow">{c.peopleLabel}</p><h2>{c.peopleTitle}</h2><p className="pl-muted">{text(c.peopleIntro)}</p></div></div></div>{c.reviews.map((review,index)=><article className="pl-testimonials-panel" key={review.name}><div className={`pl-review-card${index%2?' pl-review-card-reversed':''}`}><div><blockquote>“{text(review.quote)}”</blockquote><p><strong>{review.name}</strong><span>, {review.role}</span></p></div><picture className="pl-review-portrait"><source media="(max-width:700px)" srcSet={asset(review.image+'-mobile')}/><img src={asset(review.image)} alt={review.name}/></picture></div></article>)}</motion.div></div></section>
}
