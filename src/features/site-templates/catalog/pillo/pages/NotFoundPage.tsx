'use client'
import {motion,useReducedMotion} from 'framer-motion'
import type {SiteTemplatePageProps} from '../../../types'
import {Shell,Action,route} from '../components/Shell'
import {copy} from '../content/copy'
import {asset} from '../config/brand'
export default function NotFoundPage({locale='zh',basePath}:SiteTemplatePageProps){const c=copy[locale],reduced=useReducedMotion();return <Shell locale={locale} basePath={basePath} error><section className="pl-not-found"><motion.img src={asset('not-found')} alt="" initial={reduced?false:{scale:1.08}} animate={{scale:1}} transition={{duration:1.4}}/><div className="pl-container"><motion.div initial={reduced?false:{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}><h1>{c.notFound}</h1><p>{c.notFoundIntro}</p><Action href={route(basePath,locale)}>{c.back}</Action></motion.div></div></section></Shell>}
