import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://sidra-honey-shop.vercel.app/sitemap.xml',
    host: 'https://sidra-honey-shop.vercel.app',
  };
} 