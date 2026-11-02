'use client'
import type {SiteTemplatePageProps} from '../../../types'
import {copy} from '../content/copy'
import {usePilloText} from '../host'
import {Action,Reveal,route,Trust,useDemo} from './Shell'
export function Cta({locale='zh',basePath}:SiteTemplatePageProps){const c=copy[locale],demo=useDemo(),text=usePilloText(locale);return <section className="pl-cta pl-container" id="cta"><Reveal><Trust locale={locale}/><h2>{c.ctaTitle}</h2><p>{text(c.ctaIntro)}</p><div className="pl-actions"><Action onClick={demo}>{text(c.download)}</Action><Action href={route(basePath,locale,'pricing')} secondary>{c.viewPricing}</Action></div></Reveal></section>}
