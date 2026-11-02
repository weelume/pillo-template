import type {ReactNode} from 'react'
import './globals.css'
export const metadata={title:'Pillo · 睡眠与健康',description:'自动睡眠追踪、睡前放松与温柔唤醒'}
export default function Layout({children}:{children:ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
