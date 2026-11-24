import Image from 'next/image';
import { images } from '@/lib/images';
export function Art({ name, className = '', priority = false }: { name: string; className?: string; priority?: boolean }) {
 const asset = images[name];
 return <div className={`art ${asset.placeholder ? 'art-placeholder' : 'art-photo'} ${asset.fit === 'contain' ? 'art-contain' : ''} ${className}`}><Image src={asset.src} alt={asset.alt} fill priority={priority} sizes={priority ? '(max-width: 767px) 100vw, 55vw' : '(max-width: 767px) 80vw, 40vw'} style={{ objectFit: asset.fit ?? 'cover', objectPosition: asset.position }} />{asset.placeholder && <span className="art-note">Ботанический эскиз</span>}</div>;
}
