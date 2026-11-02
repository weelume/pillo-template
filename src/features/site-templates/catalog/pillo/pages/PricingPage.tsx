'use client'
import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Pricing,Comparison} from '../components/Pricing'
import {Faq} from '../components/Faq'
import {Cta} from '../components/Cta'
export default function PricingPage(props:SiteTemplatePageProps){return <Shell {...props}><Pricing {...props} full/><Comparison {...props}/><Faq {...props} pricing/><Cta {...props}/></Shell>}
