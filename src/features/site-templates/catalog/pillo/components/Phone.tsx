'use client'
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion'
import {asset,brand} from '../config/brand'
import {copy} from '../content/copy'
import {usePilloHost} from '../host'
import type {TemplateLocale} from '../../../types'
export type Screen='welcome'|'alarm'|'tracking'|'routine'
/** 界面示意用真实文字绘制，保证品牌注入和双语覆盖，而非把英文截图当成中文界面。 */
export function Phone({screen='welcome',locale='zh'}:{screen?:Screen;locale?:TemplateLocale}){
 const c=copy[locale],host=usePilloHost(),reduced=useReducedMotion()
 return <div className="pl-phone" data-screen={screen} aria-label={screen==='welcome'?c.sleepTracker:c[screen]}>
  <div className="pl-phone-screen"><img className="pl-phone-background" src={asset(screen==='alarm'?'hero':screen==='tracking'?'hydrangea':'phone-texture')} alt=""/>
   <AnimatePresence mode="sync"><motion.div className={`pl-phone-ui pl-phone-${screen}`} key={screen} initial={reduced?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:reduced?0:.45}}>
    {screen==='welcome'?<div className="pl-phone-welcome-content"><div className="pl-phone-name">{host.brandName?.[locale]??brand.name[locale]}</div><div className="pl-phone-chip">✦ {c.sleepTracker} <span>☾</span></div><p className="pl-phone-glass">{c.welcome.replaceAll('Pillo',host.brandName?.[locale]??brand.name[locale])}</p></div>:<>
     <div className="pl-phone-nav">{c[screen]}<span>•••</span></div>
     {screen==='alarm'&&<div className="pl-phone-lower"><div className="pl-phone-glass pl-alarm-time"><small>{c.wake}</small><strong>7:24 <small>AM</small></strong><small>{locale==='zh'?'选择睡眠周期中的轻盈时刻':'Lightest point in your sleep cycle'}</small></div><div className="pl-phone-glass"><div className="pl-phone-row">{c.window}<small>7:00 – 7:30</small></div><div className="pl-fake-slider"><i/></div></div><div className="pl-phone-glass"><div className="pl-phone-row">{c.sound}<span>♪</span></div><div className="pl-phone-row">{c.vibration}<i className="pl-fake-switch"/></div></div><div className="pl-phone-cta">{c.saveAlarm}</div></div>}
     {screen==='tracking'&&<div className="pl-phone-lower"><div className="pl-phone-glass pl-score"><small>{c.score}</small><strong>88<small>/100</small></strong><span>{c.duration} · {c.hours}</span></div><div className="pl-phone-glass"><small>{c.week}</small><div className="pl-chart">{[53,72,64,80,59,92,88].map((v,i)=><span key={i} style={{height:`${v}%`}}/>)}</div><div className="pl-phone-row"><small>{locale==='zh'?'周一':'Mon'}</small><small>{locale==='zh'?'周日':'Sun'}</small></div></div><div className="pl-phone-glass"><span>{c.night}</span><div className="pl-sleep-stages"/><small>{c.stage} · {locale==='zh'?'1 小时 45 分':'1h 45m'}</small></div></div>}
     {screen==='routine'&&<div className="pl-routine-content"><p>{c.breathing}</p><motion.div className="pl-breath-circle" animate={reduced?{}:{scale:[.8,1.12,.8],opacity:[.55,1,.55]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}/><h3>{c.breathe}</h3><p>4 – 7 – 8</p><div className="pl-phone-glass">{c.next}</div></div>}
    </>}
   </motion.div></AnimatePresence>
  </div><img className="pl-phone-frame" src={asset('phone-frame')} alt=""/><span className="pl-phone-island"/>
 </div>
}
