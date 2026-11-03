'use client'
import Link from 'next/link'
import {usePathname,useRouter} from 'next/navigation'
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion'
import {createContext,useContext,useEffect,useRef,useState,useSyncExternalStore,type ReactNode,type MouseEvent} from 'react'
import type {SiteTemplatePageProps} from '../../../types'
import {copy} from '../content/copy'
import {brand,asset} from '../config/brand'
import {usePilloHost} from '../host'
import '../theme.css'

type Theme='dark'|'light'
let currentTheme:Theme='dark'
const themeListeners=new Set<()=>void>()
const subscribe=(listener:()=>void)=>{themeListeners.add(listener);return()=>{themeListeners.delete(listener)}}
const snapshot=()=>currentTheme
const serverSnapshot=():Theme=>'dark'
const subscribeVisibility=(listener:()=>void)=>{document.addEventListener('visibilitychange',listener);return()=>document.removeEventListener('visibilitychange',listener)}
const visibilitySnapshot=()=>!document.hidden
const visibleOnServer=()=>true
export function usePageVisible(){return useSyncExternalStore(subscribeVisibility,visibilitySnapshot,visibleOnServer)}
const DemoContext=createContext<()=>void>(()=>{})
export const useDemo=()=>useContext(DemoContext)
export function route(basePath:string,locale:'zh'|'en',slug=''){return `${basePath}${locale==='en'?'/en':''}${slug?'/'+slug:''}`||'/'}
export function Action({children,href,secondary=false,onClick}:{children:ReactNode;href?:string;secondary?:boolean;onClick?:()=>void}) {
 const className=`pl-action${secondary?' pl-action-secondary':''}`
 const text=<span className="pl-action-window"><span>{children}</span><span aria-hidden="true">{children}</span></span>
 return href?<Link className={className} href={href}>{text}</Link>:<button className={className} onClick={onClick} type="button">{text}</button>
}
export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
 const reduced=useReducedMotion()
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:36,filter:'blur(7px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:.15}} transition={{duration:reduced?0:.75,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}
export function Trust({locale='zh'}:Pick<SiteTemplatePageProps,'locale'>){const c=copy[locale];return <div className="pl-trust"><div className="pl-avatars">{[1,2,3,4].map(n=><img key={n} src={asset(`avatar-${n}`)} alt="" width="40" height="40"/>)}</div><div><span className="pl-stars" aria-label="4.9 / 5">★★★★★</span><p>{c.trusted}</p></div></div>}
export function Shell({children,basePath,locale='zh',error=false}:SiteTemplatePageProps&{children:ReactNode;error?:boolean}){
 const c=copy[locale],host=usePilloHost(),pathname=usePathname(),router=useRouter(),reduced=useReducedMotion()
 const theme=useSyncExternalStore(subscribe,snapshot,serverSnapshot)
 const [menu,setMenu]=useState(false),[toast,setToast]=useState(false),[scrolled,setScrolled]=useState(false)
 const toggle=useRef<HTMLButtonElement>(null),menuRef=useRef<HTMLDivElement>(null)
 const name=host.brandName?.[locale]??brand.name[locale]
 const logo=theme==='dark'?host.lightLogo:host.logo
 const nav=[{label:c.home,href:route(basePath,locale)+'#hero'},{label:c.features,href:route(basePath,locale)+'#feature-2-item-1'},{label:c.pricing,href:route(basePath,locale,'pricing')},{label:c.testimonials,href:route(basePath,locale)+'#testimonials'}]
 const targetLocale=locale==='zh'?'en':'zh'
 const page=pathname.replace(basePath,'').replace(/^\/en(?=\/|$)/,'').replace(/^\//,'')
 const languageHref=route(basePath,targetLocale,page)
 function changeLanguage(e:MouseEvent<HTMLAnchorElement>){e.preventDefault();router.push(languageHref+window.location.search+window.location.hash)}
 useEffect(()=>{
  const update=()=>setScrolled(window.scrollY>40)
  update();window.addEventListener('scroll',update,{passive:true})
  return()=>window.removeEventListener('scroll',update)
 },[])
 useEffect(()=>{
  const html=document.documentElement,previous=html.getAttribute('data-pillo'),previousLang=html.lang
  html.setAttribute('data-pillo',theme);html.lang=locale==='zh'?'zh-CN':'en'
  if(process.env.NODE_ENV==='development')console.debug('[pillo] route/theme',{pathname,locale,theme})
  return()=>{if(previous===null)html.removeAttribute('data-pillo');else html.setAttribute('data-pillo',previous);html.lang=previousLang}
 },[theme,locale,pathname])
 useEffect(()=>{
  if(!toast)return
  const timer=setTimeout(()=>setToast(false),4500);return()=>clearTimeout(timer)
 },[toast])
 useEffect(()=>{
  if(!menu)return
  const old=document.body.style.overflow;document.body.style.overflow='hidden'
  const first=menuRef.current?.querySelector<HTMLAnchorElement>('a');first?.focus()
  function key(e:KeyboardEvent){
   if(e.key==='Escape'){setMenu(false);toggle.current?.focus()}
   if(e.key==='Tab'){
    const items=menuRef.current?.querySelectorAll<HTMLElement>('a, button');if(!items?.length)return
    if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items[items.length-1].focus()}
    else if(!e.shiftKey&&document.activeElement===items[items.length-1]){e.preventDefault();items[0].focus()}
   }
  }
  document.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',key)}
 },[menu])
 const showDemo=()=>{setToast(true);if(process.env.NODE_ENV==='development')console.debug('[pillo] demo download clicked',{locale})}
 return <DemoContext.Provider value={showDemo}><div className="pillo" data-theme={theme} lang={locale==='zh'?'zh-CN':'en'}>
  <a className="pl-skip" href="#pl-main">{locale==='zh'?'跳到主要内容':'Skip to content'}</a>
  <header className="pl-header" data-scrolled={scrolled}><div className="pl-container pl-header-inner">
   <Link className="pl-brand" href={route(basePath,locale)}>{logo?<img src={logo} alt=""/>:<span className="pl-brand-icon" aria-hidden="true"/>}<span>{name}</span></Link>
   <nav className="pl-desktop-nav" aria-label={locale==='zh'?'主导航':'Main navigation'}>{nav.map(n=><Link key={n.label} href={n.href}>{n.label}</Link>)}</nav>
   <div className="pl-tools"><Link className="pl-language" href={languageHref} onClick={changeLanguage} aria-label={c.language}>{locale==='zh'?'EN':'中文'}</Link><button className="pl-theme-toggle" type="button" role="switch" aria-checked={theme==='dark'} aria-label={theme==='dark'?c.light:c.dark} onClick={()=>{currentTheme=theme==='dark'?'light':'dark';themeListeners.forEach(l=>l())}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button><button ref={toggle} className="pl-menu-toggle" type="button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="pl-menu" aria-label={menu?c.close:c.menu}><span/><span/></button></div>
  </div></header>
  <AnimatePresence>{menu&&<motion.div ref={menuRef} className="pl-mobile-menu" id="pl-menu" role="dialog" aria-modal="true" aria-label={c.menu} initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:reduced?0:.35}}>{nav.map((n,i)=><motion.div key={n.label} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:reduced?0:i*.06}}><Link href={n.href} onClick={()=>setMenu(false)}>{n.label}</Link></motion.div>)}<Link href={languageHref} onClick={e=>{setMenu(false);changeLanguage(e)}}>{locale==='zh'?'English':'简体中文'}</Link><button type="button" onClick={()=>{setMenu(false);toggle.current?.focus()}}>{c.close}</button></motion.div>}</AnimatePresence>
  <motion.main id="pl-main" key={pathname} initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:.35}}>{children}</motion.main>
  {!error&&<footer className="pl-footer"><img className="pl-footer-image" src={asset('footer')} alt=""/><div className="pl-container pl-footer-content"><Link className="pl-footer-wordmark" href={route(basePath,locale)}>{name}</Link><p>{c.footer}</p><nav aria-label={locale==='zh'?'页脚导航':'Footer navigation'}>{nav.map(n=><Link key={n.label} href={n.href}>{n.label}</Link>)}<Link href={route(basePath,locale,'404')}>404</Link>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}</nav><div className="pl-footer-bottom"><span>© {brand.year} {name}</span>{host.filing}</div></div></footer>}
  {host.marketplaceHref&&<Link className="pl-marketplace" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]}>{host.lightLogo&&<img src={host.lightLogo} alt=""/>}<span>{name}</span></Link>}
  <AnimatePresence>{toast&&<motion.div role="status" className="pl-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}>{c.demo}<button onClick={()=>setToast(false)} aria-label={c.close}>×</button></motion.div>}</AnimatePresence>
 </div></DemoContext.Provider>
}
