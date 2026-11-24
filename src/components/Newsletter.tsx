'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
export function Newsletter() {
 const [email,setEmail] = useState(''); const [message,setMessage] = useState('');
 return <section className="newsletter section"><div><p className="eyebrow">Письма о красоте</p><h2>Чуть больше<br/><em>естественного.</em></h2><p>Истории продуктов, ритуалы ухода и новости KristaVeda.</p></div><form noValidate onSubmit={e => {e.preventDefault(); setMessage(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Подписка пока не подключена. Ваш адрес не сохранён. Напишите нам: info@kristaveda.com.' : 'Введите корректный адрес электронной почты.');}}><label htmlFor="email">Ваш адрес электронной почты</label><div className="email-field"><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e=> {setEmail(e.target.value);setMessage('');}} aria-describedby="subscription-note subscription-feedback" aria-invalid={message.startsWith('Введите')}/><button type="submit" aria-label="Подписаться"><ArrowRight size={22}/></button></div><p id="subscription-note">Подписка станет доступна после запуска рассылки.</p><p id="subscription-feedback" role="status">{message}</p></form></section>;
}
