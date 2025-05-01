import Title from "@/components/layout/Title";
import ShopProductsManager from "@/components/shop/ShopProductsManager";
import { GetProducts } from "@/util/admin-apis";
import React from "react";
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
