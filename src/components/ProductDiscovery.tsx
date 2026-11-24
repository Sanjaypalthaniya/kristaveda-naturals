'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react';
import { products, type Product } from '@/data/products';
import { categories } from '@/data/categories';
import { Art } from './Art';
const filters=[{id:'all',label:'Все'},{id:'hair',label:'Для волос'},{id:'body',label:'Для тела'},{id:'deodorants',label:'Дезодоранты'}];

export function ProductDiscovery(){
 const [filter,setFilter]=useState('all');
 const [expanded,setExpanded]=useState(false);
 const [selected,setSelected]=useState<Product|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const trigger=useRef<HTMLElement|null>(null);
 const visible=products.filter(p=>filter==='all'?expanded||p.featured:p.family===filter);
 useEffect(()=>{
  const reveal=(id:string)=>{if(!products.some(p=>p.id===id))return;setFilter('all');setExpanded(true);requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));};
  const hashChange=()=>reveal(location.hash.slice(1));
  const selectProduct=(e:Event)=>reveal((e as CustomEvent<string>).detail);
  window.addEventListener('hashchange',hashChange);window.addEventListener('kristaveda:product',selectProduct);
  return()=>{window.removeEventListener('hashchange',hashChange);window.removeEventListener('kristaveda:product',selectProduct);};
 },[]);
 useEffect(()=>{const el=dialog.current;if(!el)return;if(selected){trigger.current=document.activeElement as HTMLElement;el.showModal();document.body.style.overflow='hidden';}else{el.close();document.body.style.overflow='';trigger.current?.focus();}return()=>{document.body.style.overflow='';};},[selected]);
 return <>
 <section id="categories" className="section categories">
  <div className="section-top"><div><p className="eyebrow"><span>01</span>Коллекции заботы</p><h2>Ваш ритуал.<br/><em>Ваше настроение.</em></h2></div><div className="section-side"><p>От первого шага утром<br/>до маленькой паузы для себя.</p><div className="carousel-controls"><button aria-label="Предыдущие категории" onClick={()=>document.getElementById('category-track')?.scrollBy({left:-320,behavior:'smooth'})}><ArrowLeft size={18}/></button><button aria-label="Следующие категории" onClick={()=>document.getElementById('category-track')?.scrollBy({left:320,behavior:'smooth'})}><ArrowRight size={18}/></button></div></div></div>
  <div className="category-track" id="category-track">{categories.filter(c=>c.photographic).map((c,i)=><a href="#products" className={'category-card category-'+i} key={c.image} onClick={()=>{setFilter(c.filter);setExpanded(true);}}><div className="category-image"><Art name={c.image}/><span className="category-index">0{i+1} / {c.brand}</span><span className="round-arrow"><ArrowUpRight size={21}/></span></div><div className="category-title"><h3>{c.name}</h3><span>Открыть</span></div><p>{c.detail}</p></a>)}</div>
  <div className="category-extras">{categories.filter(c=>!c.photographic).map(c=><a key={c.image} className={'category-extra '+c.image} href={'#'+(c.image==='beauty'?'ilashveda':'golecha')}><span className="category-extra-brand">{c.brand}</span><span><strong>{c.name}</strong><small>{c.detail}</small></span><ArrowUpRight size={23}/></a>)}</div>
 </section>
 <section id="products" className="section products">
  <div className="section-top"><div><p className="eyebrow"><span>02</span>Знакомство с коллекцией</p><h2>Маленькие ритуалы.<br/><em>Большая любовь к себе.</em></h2></div><p className="section-side">Шампуни, мыло и минеральный уход.<br/>Выберите то, с чего начнётся ваш день.</p></div>
  <div className="collection-toolbar"><div className="filter-tabs" aria-label="Фильтр продукции">{filters.map(f=><button key={f.id} aria-pressed={filter===f.id} onClick={()=>{setFilter(f.id);setExpanded(false);}}>{f.label}{f.id!=='all'&&<sup>{products.filter(p=>p.family===f.id).length}</sup>}</button>)}</div><span className="collection-count" aria-live="polite">{visible.length} в подборке</span></div>
  <div className="product-grid">{visible.map(p=><article id={p.id} className={'product-card product-'+p.family} key={p.id}><div className="product-art"><Art name={p.image}/><span className="product-badge">{p.family==='hair'?'Для волос':p.family==='body'?'Для тела':'Ежедневный уход'}</span><button className="product-quick" onClick={()=>setSelected(p)} aria-label={'Быстрый просмотр: '+p.name}><Plus size={22}/></button></div><div className="product-meta"><span>{p.brand}</span>{p.size&&<span>{p.size}</span>}</div><p className="product-type">{p.type}</p><h3>{p.title}</h3><button className="text-link product-details" onClick={()=>setSelected(p)} aria-label={'Подробнее: '+p.name}>Подробнее <ArrowUpRight size={16}/></button></article>)}</div>
  {filter==='all'&&!expanded&&<div className="collection-more"><button className="button button-outline" onClick={()=>setExpanded(true)}>Вся подборка <span>{products.length}</span><ArrowDown size={17}/></button><p>Каждый продукт — со своим характером.</p></div>}
 </section>
 <dialog ref={dialog} className="panel product-dialog" aria-labelledby="product-dialog-title" onCancel={()=>setSelected(null)} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();setSelected(null);}}} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}>{selected&&<div className="quickview"><button className="panel-close" onClick={()=>setSelected(null)} aria-label="Закрыть продукт"><X/></button><Art name={selected.image}/><div className="quickview-copy"><p className="eyebrow">{selected.brand}</p><p className="product-type">{selected.type}{selected.size&&' · '+selected.size}</p><h2 id="product-dialog-title">{selected.title}</h2><p>{selected.description}</p><dl><div><dt>Бренд</dt><dd>{selected.brand}</dd></div><div><dt>Категория</dt><dd>{selected.category}</dd></div>{selected.size&&<div><dt>Объём / вес</dt><dd>{selected.size}</dd></div>}</dl><a href={'mailto:info@kristaveda.com?subject='+encodeURIComponent(selected.name)} className="button">Уточнить наличие <ArrowUpRight size={17}/></a></div></div>}</dialog>
 </>;
}
