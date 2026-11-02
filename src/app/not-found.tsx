'use client'
import {usePathname} from 'next/navigation'
import NotFoundPage from '../features/site-templates/catalog/pillo/pages/NotFoundPage'
export default function NotFound(){const locale=usePathname().split('/')[1]==='en'?'en':'zh';return <NotFoundPage basePath="" locale={locale}/>}
