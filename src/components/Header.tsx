'use client';
import { useEffect, useRef, useState } from 'react';
import { Search, UserRound, ShoppingBag, Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import { brands } from '@/data/brands';
import { categories } from '@/data/categories';
import ru from '@/locales/ru.json';
type Panel = 'menu' | 'search' | 'account' | 'cart' | 'language' | null;
export function Header() {
 const [panel, setPanel] = useState<Panel>(null);
 const [query, setQuery] = useState('');
 const [scrolled, setScrolled] = useState(false);
 const dialog = useRef<HTMLDialogElement>(null);
 const trigger = useRef<HTMLElement | null>(null);
 useEffect(() => { const scroll = () => setScrolled(window.scrollY > 20); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
 useEffect(() => {
  const el = dialog.current; if (!el) return;
  if (panel) { if (!el.open) { trigger.current = document.activeElement as HTMLElement; el.showModal(); } document.body.style.overflow = 'hidden'; }
  else { el.close(); document.body.style.overflow = ''; trigger.current?.focus(); }
  return () => { document.body.style.overflow = ''; };
 }, [panel]);
 const close = () => setPanel(null);
 const results = query.trim() ? products.filter(p => `${p.name} ${p.brand} ${p.category} ${p.type}`.toLowerCase().includes(query.trim().toLowerCase())) : products;
 return <>
 <div className="announcement">{ru.announcement}<span>Казахстан · Алматы</span></div>
 <header className={scrolled ? 'header scrolled' : 'header'}>
  <a className="wordmark" href="#home" aria-label="KristaVeda Naturals — главная">KristaVeda<span>N A T U R A L S</span></a>
  <nav className="desktop-nav" aria-label="Основная навигация">
   <a href="#home" className="active">Главная</a>
   <div className="nav-group"><button aria-haspopup="true">Коллекции <ChevronDown size={12}/></button><div className="dropdown">{categories.map(c => <a href="#categories" key={c.image}>{c.name}<ArrowUpRight size={14}/></a>)}</div></div>
   <div className="nav-group"><button aria-haspopup="true">Наши бренды <ChevronDown size={12}/></button><div className="dropdown">{brands.map(b => <a href={`#${b.image}`} key={b.name}>{b.name}<ArrowUpRight size={14}/></a>)}</div></div>
   <a href="#philosophy">О нас</a><a href="#partnership">Сотрудничество</a><a href="#contact">Контакты</a>
  </nav>
  <div className="header-actions"><button aria-label={ru.search} onClick={() => setPanel('search')}><Search/></button><button className="desktop-action" aria-label="Личный кабинет" onClick={() => setPanel('account')}><UserRound/></button><button aria-label="Корзина, 0 товаров" onClick={() => setPanel('cart')}><ShoppingBag/><sup>0</sup></button><button className="language desktop-action" onClick={() => setPanel('language')}>RU<ChevronDown size={11}/></button><button className="mobile-toggle" aria-label={ru.menu} onClick={() => setPanel('menu')}><Menu/></button></div>
 </header>
 <dialog ref={dialog} className={`panel ${panel === 'menu' ? 'menu-panel' : ''}`} onKeyDown={e => { if(e.key === 'Escape') {e.preventDefault();close();} }} onCancel={close} onClick={e => { if(e.target === e.currentTarget) close(); }} aria-labelledby="panel-title">
 <div className="panel-inner"><button className="panel-close" onClick={close} aria-label={ru.close}><X/></button>
 {panel === 'menu' && <><h2 id="panel-title">KristaVeda</h2><nav aria-label="Мобильная навигация">{[['Главная','home'],['Коллекции','categories'],['Наши бренды','brands'],['О нас','philosophy'],['Сотрудничество','partnership'],['Контакты','contact']].map(([label,id]) => <a onClick={close} key={id} href={`#${id}`}>{label}<ArrowUpRight size={20}/></a>)}</nav><button className="text-link" onClick={() => setPanel('language')}>RU / EN / KZ</button></>}
 {panel === 'search' && <><p className="eyebrow">Ваша коллекция ухода</p><h2 id="panel-title">Найдите свой ритуал</h2><label className="sr-only" htmlFor="search">Название продукта или бренда</label><input autoFocus id="search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Название продукта или бренда"/><div className="search-results" aria-live="polite">{results.length ? results.map(p => <a key={p.id} href={`#${p.id}`} onClick={() => { window.dispatchEvent(new CustomEvent("kristaveda:product", { detail: p.id })); close(); }}><span><small>{p.brand}</small>{p.name}</span><ArrowUpRight size={20}/></a>) : <p>Ничего не найдено. Попробуйте «шампунь» или «тмин».</p>}</div></>}
 {panel === 'language' && <><h2 id="panel-title">Язык сайта</h2><p>Русский — текущий язык.</p><p>English и Қазақша появятся после редакционной проверки переводов.</p><button className="button" onClick={close}>Продолжить на русском</button></>}
 {panel === 'cart' && <><ShoppingBag size={32}/><h2 id="panel-title">Ваша корзина пуста</h2><p>Онлайн-покупки появятся после запуска магазина. Пока познакомьтесь с коллекцией и уточните наличие у нашей команды.</p><a className="button" href="#products" onClick={close}>Смотреть коллекцию <ArrowUpRight size={16}/></a></>}
 {panel === 'account' && <><h2 id="panel-title">Рады знакомству</h2><p>Личный кабинет появится с запуском магазина. По вопросам продукции и заказов свяжитесь с нашей командой.</p><a className="button" href="mailto:info@kristaveda.com">Написать нам <ArrowUpRight size={16}/></a></>}
 </div></dialog></>;
}
