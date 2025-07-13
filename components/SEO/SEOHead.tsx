import { Metadata } from 'next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/logo.svg',
  url,
}: SEOHeadProps): Metadata {
  const baseUrl = 'https://sidra-honey-shop.vercel.app';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    'honey',
    'natural honey',
    'premium honey',
    'organic honey',
    'pure honey',
    'honey products',
    'health benefits',
    'sustainable honey',
    'local honey',
    'Sidra honey',
    'عسل طبيعي',
    'عسل صافي',
    'منتجات العسل',
    'فوائد العسل الصحية'
  ];

  const finalKeywords = [...defaultKeywords, ...keywords];

  const metadata: Metadata = {
    title: title ? `${title} | Sidra Honey Shop` : 'Sidra Honey Shop - Premium Natural Honey Products',
    description: description || 'Discover premium natural honey products from Sidra Honey Shop. Fresh, pure, and sustainably sourced honey with health benefits.',
    keywords: finalKeywords,
    openGraph: {
      url: fullUrl,
      title: title || 'Sidra Honey Shop - Premium Natural Honey Products',
      description: description || 'Discover premium natural honey products from Sidra Honey Shop. Fresh, pure, and sustainably sourced honey with health benefits.',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title || 'Sidra Honey Shop',
        },
      ],
      siteName: 'Sidra Honey Shop',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sidrahoneyshop',
      creator: '@sidrahoneyshop',
      title: title || 'Sidra Honey Shop - Premium Natural Honey Products',
      description: description || 'Discover premium natural honey products from Sidra Honey Shop. Fresh, pure, and sustainably sourced honey with health benefits.',
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };

  return metadata;
}

export function generateStructuredData({
  url,
}: SEOHeadProps) {
  const baseUrl = 'https://sidra-honey-shop.vercel.app';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sidra Honey Shop',
    description: 'Premium natural honey products with health benefits',
    url: fullUrl,
  };
}

export function SEOHead(props: SEOHeadProps) {
  const structuredData = generateStructuredData(props);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
} 