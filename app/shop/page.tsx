import { Metadata } from "next";
import Title from "@/components/layout/Title";
import ShopProductsManager from "@/components/shop/ShopProductsManager";
import { GetProducts } from "@/util/admin-apis";
import React from "react";

export const metadata: Metadata = {
  title: "المتجر - Sidra Shop"
};

export default async function Shop() {
  const products = await GetProducts();
  return (
    <main>
      <Title>السوق</Title>
      <ShopProductsManager products={products} />
    </main>
  );
};
