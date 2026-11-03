'use client'
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion'
import {asset,brand} from '../config/brand'
import {copy} from '../content/copy'
import {phoneCopy} from '../content/phone'
import {usePilloHost,usePilloText} from '../host'
import type {TemplateLocale} from '../../../types'
export type Screen='welcome'|'alarm'|'tracking'|'routine'
function PhoneIcon({kind}:{kind:'moon'|'sliders'|'waves'|'breathing'|'story'|'home'|'profile'}){
 const paths={moon:'M18 15A8 8 0 0 1 9 4a8 8 0 1 0 9 11Z',sliders:'M6 3v4m0 6v8M12 3v10m0 6v2M18 3v2m0 6v10M3 7h6v6H3Zm6 6h6v6H9Zm6-8h6v6h-6Z',waves:'M3 7c3-4 5 4 9 0s6 3 9 0M3 12c3-4 5 4 9 0s6 3 9 0M3 17c3-4 5 4 9 0s6 3 9 0',breathing:'M3 8h11c6 0 6-6 1-5M3 12h15c5 0 5 7 0 6M3 16h7c5 0 5 6 1 5',story:'M5 3h14v18H5ZM8 7h8M8 11h8M8 15h5',home:'m3 10 9-7 9 7M6 9v12h12V9m-9 12v-7h6v7',profile:'M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M4 22c0-10 16-10 16 0'}
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]}/></svg>
}
/** 使用相同的屏幕坐标系绘制可翻译界面，避免设备缩放时字重、图标和面板比例失真。 */
export function Phone({screen='welcome',locale='zh'}:{screen?:Screen;locale?:TemplateLocale}){
 const c=copy[locale],p=phoneCopy[locale],host=usePilloHost(),text=usePilloText(locale),reduced=useReducedMotion()
 const name=host.brandName?.[locale]??brand.name[locale]
 const background={welcome:'phone-texture',alarm:'fabric',tracking:'hydrangea',routine:'peony'}[screen]
 return <div className="pl-phone" data-screen={screen} aria-label={screen==='welcome'?c.sleepTracker:c[screen]}>
  <div className="pl-phone-screen"><AnimatePresence initial={false}>{screen!=='welcome'&&<motion.img key={background} className="pl-phone-background" src={asset(background)} alt="" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.4}}/>}</AnimatePresence>
   <AnimatePresence mode="sync"><motion.div className={`pl-phone-ui pl-phone-${screen}`} key={screen} initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.35}}>
    {screen==='welcome'?<div className="pl-phone-welcome-content"><div className="pl-phone-name" data-long={name.length>6}>{name}</div><div className="pl-phone-chips"><span className="pl-phone-chip"><b>✦</b>{c.sleepTracker}</span><span className="pl-phone-chip pl-phone-chip-icon"><PhoneIcon kind="moon"/></span><span className="pl-phone-chip pl-phone-chip-icon"><PhoneIcon kind="sliders"/></span></div><p className="pl-phone-glass">{text(c.welcome)}</p></div>:<>
     <div className={`pl-phone-nav ${screen==='alarm'?'pl-phone-nav-centered':''}`}>{screen==='alarm'&&<span className="pl-phone-back" aria-hidden="true">‹</span>}<strong>{c[screen]}</strong>{screen==='alarm'?<span className="pl-phone-more">···</span>:<small>{screen==='tracking'?p.date:p.subtitle}</small>}</div>
     {screen==='alarm'&&<div className="pl-phone-lower"><div className="pl-phone-glass pl-alarm-time"><small>{c.wake}</small><strong>7:24 <small>{locale==='zh'?'上午':'AM'}</small></strong><small>{p.lightest}</small></div><div className="pl-phone-glass"><div className="pl-phone-row"><strong>{c.window}</strong><small>7:00 – 7:30</small></div><div className="pl-fake-slider"><i/></div><p className="pl-phone-helper">{text(p.windowHelp)}</p></div><div className="pl-phone-glass pl-phone-settings"><div className="pl-phone-row"><span><i className="pl-phone-app-icon"><PhoneIcon kind="waves"/></i>{c.sound}</span><small aria-hidden="true">›</small></div><div className="pl-phone-row"><span><i className="pl-phone-app-icon"><PhoneIcon kind="sliders"/></i>{c.vibration}</span><i className="pl-fake-switch"/></div></div><div className="pl-phone-cta">{c.saveAlarm}</div></div>}
     {screen==='tracking'&&<div className="pl-phone-lower"><div className="pl-phone-glass pl-score"><div className="pl-score-ring"><strong>88</strong><small>{p.optimal}</small></div><div className="pl-score-legend"><small>{c.score}</small>{p.stages.map((stage,i)=><span key={stage}><i style={{opacity:1-i*.2}}/>{stage}</span>)}</div></div><div className="pl-phone-stat-grid"><div className="pl-phone-glass"><small>{p.total}</small><strong>{p.sleep}</strong><span>● ━━━━━━ ○</span></div><div className="pl-phone-glass"><small>{p.bed}</small><strong>{p.inBed}</strong><span>● ━━━━━━ ○</span></div></div><div className="pl-phone-glass"><small>{p.week}</small><div className="pl-chart">{[45,62,80,51,44,76,57].map((value,i)=><span key={i} data-active={i===2||i===5} style={{height:`${value}%`}}/>)}</div></div><div className="pl-phone-bottom-nav">{p.nav.map((label,i)=><span key={label}><PhoneIcon kind={(['home','sliders','moon','profile'] as const)[i]}/><small>{label}</small></span>)}</div></div>}
     {screen==='routine'&&<div className="pl-phone-lower"><div className="pl-phone-glass pl-routine-progress"><div className="pl-phone-row"><strong>{p.step}</strong><small>{p.remaining}</small></div><div><i/></div></div>{([{icon:'waves',title:p.waves,description:p.ambient,status:p.done},{icon:'breathing',title:p.breathing,description:p.technique,status:p.now},{icon:'story',title:p.story,description:p.voice,status:p.next}] as const).map((item,i)=><div className="pl-phone-glass pl-routine-item" key={item.icon}><i className="pl-phone-app-icon"><PhoneIcon kind={item.icon}/></i><div><strong>{item.title}</strong><small>{item.description}</small></div><span data-current={i===1}>{item.status}</span></div>)}<div className="pl-phone-cta">{p.continue}</div></div>}
    </>}
   </motion.div></AnimatePresence>
  </div><img className="pl-phone-frame" src={asset('phone-frame')} alt=""/>
 </div>
}
