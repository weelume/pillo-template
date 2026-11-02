'use client'
import {useState} from 'react'
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion'
import type {TemplateLocale} from '../../../types'
import {copy} from '../content/copy'
import {usePilloText} from '../host'
import {Reveal} from './Shell'
export function Faq({locale='zh',pricing=false}:{locale?:TemplateLocale;pricing?:boolean}){
 const c=copy[locale],questions=pricing?c.pricingFaq:c.faq,[open,setOpen]=useState<number|null>(null),reduced=useReducedMotion(),text=usePilloText(locale)
 return <section className="pl-faq pl-container" id="faq"><Reveal><p className="pl-eyebrow">FAQ</p><h2>{c.faqTitle}</h2><p className="pl-muted">{text(c.faqIntro)}</p></Reveal><div className="pl-questions">{questions.map((q,i)=><div className="pl-question" key={q.q}><h3><button type="button" aria-expanded={open===i} aria-controls={`pl-answer-${i}`} onClick={()=>{setOpen(open===i?null:i);if(process.env.NODE_ENV==='development')console.debug('[pillo] FAQ',{question:i,open:open!==i})}}>{text(q.q)}<motion.span aria-hidden="true" animate={{rotate:open===i?45:0}} transition={{duration:.25}}>+</motion.span></button></h3><AnimatePresence initial={false}>{open===i&&<motion.div id={`pl-answer-${i}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.35,ease:[.22,1,.36,1]}}><p>{text(q.a)}</p></motion.div>}</AnimatePresence></div>)}</div></section>
}
