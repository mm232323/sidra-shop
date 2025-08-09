import { Metadata } from "next";
import ProductPageContent from "@/components/shop/ProductPageContent";
import { GetProducts } from "@/util/admin-apis";
import { GetUser } from "@/util/auth-apis";
import { ProductType, userData } from "@/util/types";
import { getServerSession } from "next-auth";
import React from "react";

export async function generateMetadata({ params }): Promise<Metadata> {
  const resolvedParams = await params;
  const products: ProductType[] = await GetProducts();
  const product = products.find((prod) => prod._id == resolvedParams.prodId);
  
  return {
    title: product ? `${product.name} - Sidra Shop` : "المنتج - Sidra Shop",
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const products: ProductType[] = await GetProducts();
  const product = products.find((prod) => prod._id == resolvedParams.prodId);
  const session = await getServerSession();
  let user = null;
  if (session?.user) {
    user = (await GetUser(session?.user?.email as string, true)) as userData;
  }
  product.mainImgs.sort()
  return (
    <main>
      <ProductPageContent
        product={product}
        user={user}
        resolvedParams={resolvedParams}
      />
    </main>
  );
}
