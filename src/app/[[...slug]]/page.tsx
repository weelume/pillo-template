import {notFound} from 'next/navigation'
import {pilloTemplate} from '../../features/site-templates/catalog/pillo/meta'
export default async function Page({params}:{params:Promise<{slug?:string[]}>}){const parts=(await params).slug??[];const locale=parts[0]==='en'?'en':'zh';const slug=(locale==='en'?parts.slice(1):parts).join('/');const page=pilloTemplate.surfaces[0].pages.find(p=>p.slug===slug);if(!page)notFound();const {default:View}=await page.load();return <View locale={locale} basePath=""/>}
