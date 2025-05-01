'use server'

import { GetProduct } from "./admin-apis"
import { CommentType } from "./types"

export const SendToCart = async (state: boolean, productId: string, userNumber: string, weightIdx: number, quant?: number) => {
    const product = await GetProduct(productId)
    const weight = product.weight[weightIdx]
    const res = await fetch(`${process.env.SERVER_HOST}/user/handle-cart`, {
        method: 'POST',
        body: JSON.stringify({ state, productId, userNumber, weight, quant }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return data
}

export const SendToFav = async (state: boolean, productId: string, userNumber: string) => {
    const res = await fetch(`${process.env.SERVER_HOST}/user/handle-fav`, {
        method: 'POST',
        body: JSON.stringify({ state, productId, userNumber }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
}

export const PostQuantity = async (props: unknown) => {
    const res = await fetch(`${process.env.SERVER_HOST}/user/handle-quant`, {
        method: 'POST',
        body: JSON.stringify({ props }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const message = await res.json()
    console.log(message)
}

export const SubmitOrder = async (phone: string) => {
    const res = await fetch(`${process.env.SERVER_HOST}/user/submit-order`, {
        method: 'POST',
        body: JSON.stringify({ phone }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const message = await res.json()
    console.log(message)
}

export const SendComment = async (prodId: string, comment: CommentType) => {
    const res = await fetch(`${process.env.SERVER_HOST}/user/set-comment`, {
        method: 'POST',
        body: JSON.stringify({ comment, prodId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const message = await res.json()
    console.log(message)
}

export const SendReaction = async (blogId:string,phone:string,isIncluded:boolean) => {
    const res = await fetch(`${process.env.SERVER_HOST}/user/send-reaction`, {
        method:'POST',
        body:JSON.stringify({blogId,phone,isIncluded}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const message = await res.json()
    console.log(message)
}

export const SetBlogComment = async (blogId:string,comment:string,phone:string) => {
    const res = await fetch(`${process.env.SERVER_HOST}/user/set-blog-comment`, {
        method:'POST',
        body:JSON.stringify({blogId,comment,phone}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const message = await res.json()
    console.log(message)
}