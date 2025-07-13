import { MetadataRoute } from 'next';
import { GetProducts } from '@/util/admin-apis';
import { GetNews } from '@/util/admin-apis';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sidra-honey-shop.vercel.app';
  
  // Get dynamic data
  const products = await GetProducts();
  const news = await GetNews();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/shop/${product._id}`,
    lastModified: new Date(product.updatedAt || product.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // News pages
  const newsPages = news.map((article) => ({
    url: `${baseUrl}/news/${article._id}`,
    lastModified: new Date(article.updatedAt || article.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...newsPages];
} 