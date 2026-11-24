import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {return [{url:'https://kristaveda.com/',changeFrequency:'monthly',priority:1,alternates:{languages:{'ru-KZ':'https://kristaveda.com/'}}}]}
