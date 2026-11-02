'use client'
import {createContext, useContext, type ReactNode} from 'react'
import type {TemplateLocale} from '../../types'
import {brand} from './config/brand'
export interface PilloHostOptions {brandName?: Record<TemplateLocale,string>; logo?: string; lightLogo?: string; marketplaceHref?: string; marketplaceLabel?: Record<TemplateLocale,string>; marketplaceAriaLabel?: Record<TemplateLocale,string>; filing?: ReactNode}
const Context = createContext<PilloHostOptions>({})
/** 平台品牌与备案由消费方注入，通用模板不依赖平台实现。 */
export function PilloHostProvider({children,...options}: PilloHostOptions & {children:ReactNode}) {return <Context.Provider value={options}>{children}</Context.Provider>}
export function usePilloHost() {return useContext(Context)}
export function usePilloText(locale:TemplateLocale){const host=usePilloHost();const name=host.brandName?.[locale]??brand.name[locale];return (text:string)=>text.replaceAll('Pillo',name)}
