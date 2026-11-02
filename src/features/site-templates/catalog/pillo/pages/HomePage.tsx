'use client'
import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Journey,HowItWorks,Metrics,Testimonials} from '../components/HomeSections'
import {Pricing} from '../components/Pricing'
import {Faq} from '../components/Faq'
import {Cta} from '../components/Cta'
export default function HomePage(props:SiteTemplatePageProps){return <Shell {...props}><div className="pl-home"><Journey {...props}/><HowItWorks {...props}/><Metrics {...props}/><Testimonials {...props}/><Pricing {...props}/><Faq {...props}/><Cta {...props}/></div></Shell>}
