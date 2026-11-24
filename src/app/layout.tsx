import type { Metadata } from 'next';
import { Lora, Manrope } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';
const serif = Lora({ subsets: ['latin','cyrillic'], weight: ['400','500'], style: ['normal','italic'], variable: '--font-serif', display: 'swap' });
const sans = Manrope({ subsets: ['latin','cyrillic'], variable: '--font-sans', display: 'swap' });
export const metadata: Metadata = {
 metadataBase: new URL('https://kristaveda.com'), title: 'KristaVeda Naturals — природная красота и уход в Казахстане',
 description: 'Откройте мир KristaVeda: уход за волосами, кожей и телом, минеральные дезодоранты, косметика и хна. Бренды KRISTAVEDA, KAERS, iLashVeda и Golecha в Алматы.',
 alternates: { canonical: '/', languages: { 'ru-KZ': '/', 'x-default': '/' } },
 openGraph: { type: 'website', locale: 'ru_KZ', siteName: 'KristaVeda Naturals', url: '/', title: 'KristaVeda Naturals — природа, красота, гармония', description: 'Ботаническое вдохновение и продуманный уход каждый день.', images: [{url: '/images/og-preview.png',width:1200,height:630,alt:'KristaVeda Naturals'}] },
 twitter: { card: 'summary_large_image', title: 'KristaVeda Naturals', description: 'Природа. Красота. Гармония.', images: ['/images/og-preview.png'] }, robots: { index: true, follow: true },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="ru" className={`${serif.variable} ${sans.variable}`}><body><a className="skip-link" href="#main">Перейти к содержимому</a><Header/>{children}<Footer/></body></html>}
