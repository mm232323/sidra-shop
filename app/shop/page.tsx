import Title from "@/components/layout/Title";
import ShopProductsManager from "@/components/shop/ShopProductsManager";
import { GetProducts } from "@/util/admin-apis";
import React from "react";
import { Metadata } from "next";
import { generateMetadata } from "@/components/SEO/SEOHead";

export const metadata: Metadata = generateMetadata({
  title: "Honey Products Shop",
  description: "Browse our premium collection of natural honey products. From pure organic honey to specialty varieties, discover the finest quality honey with exceptional health benefits. Free delivery available.",
  keywords: [
    "honey shop",
    "honey products",
    "natural honey",
    "organic honey",
    "pure honey",
    "honey varieties",
    "premium honey",
    "honey collection",
    "buy honey online",
    "honey store",
    "متجر العسل",
    "منتجات العسل",
    "عسل طبيعي",
    "عسل عضوي",
    "عسل صافي",
    "أنواع العسل"
  ],
  url: "/shop",
  type: "website",
});

const ShopPage: React.FC = async () => {
  
  const products = await GetProducts();
  return (
    <main>
      <Title>السوق</Title>
      <ShopProductsManager products={products} />
    </main>
  );
};

export default ShopPage;
