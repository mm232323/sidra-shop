'use server'

import { ProductType } from "./types"

export async function GetProducts() {
    const res = await fetch(`${process.env.SERVER_HOST}/admin/products`)
    const products = await res.json()
    return products.products
}

export async function GetProduct(prodId:string):Promise<ProductType> {
    const res = await fetch(`${process.env.SERVER_HOST}/admin/product/${prodId}`)
    const product = await res.json()
    return product.product
}

export async function GetNews() {
    const res = await fetch(`${process.env.SERVER_HOST}/admin/get-news`);
    const { news } = await res.json();
    return news
}