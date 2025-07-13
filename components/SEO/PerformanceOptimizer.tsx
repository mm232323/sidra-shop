import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  preloadUrls?: string[];
  prefetchUrls?: string[];
}

export function PerformanceOptimizer({ 
  preloadUrls = [], 
  prefetchUrls = [] 
}: PerformanceOptimizerProps) {
  useEffect(() => {
    // Preload critical resources
    preloadUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = url.endsWith('.css') ? 'style' : 
                url.endsWith('.js') ? 'script' : 
                url.endsWith('.woff2') ? 'font' : 'image';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Prefetch non-critical resources
    prefetchUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Add performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', entry.value);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

    // Add service worker registration for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Add structured data for better SEO
    const addStructuredData = () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Sidra Honey Shop',
        url: 'https://sidra-honey-shop.vercel.app',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://sidra-honey-shop.vercel.app/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    addStructuredData();

    // Cleanup function
    return () => {
      // Remove preload/prefetch links on unmount
      const links = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
      links.forEach(link => {
        if (preloadUrls.includes(link.getAttribute('href') || '') || 
            prefetchUrls.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, [preloadUrls, prefetchUrls]);

  return null;
}

// Hook for lazy loading images
export function useLazyLoading() {
  useEffect(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => {
      images.forEach(img => imageObserver.unobserve(img));
    };
  }, []);
}

// Hook for preloading critical resources
export function usePreloadCritical() {
  useEffect(() => {
    const criticalResources = [
      '/logo.svg',
      '/favicon.ico',
      '/home/featureImg.png',
      '/home/newsImg.png',
      '/home/shopImg.png'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.svg') || resource.endsWith('.png') || resource.endsWith('.jpg') ? 'image' : 'fetch';
      document.head.appendChild(link);
    });
  }, []);
} 