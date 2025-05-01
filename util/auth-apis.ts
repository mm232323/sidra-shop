'use server'

import { SignupFormData } from "./types"
import bcrypt from 'bcrypt'
export async function CheckExist(phone: string) {
    const res = await fetch(`${process.env.SERVER_HOST}/auth/is-exist`, {
        method: 'POST',
        body: JSON.stringify({ phone }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status == 200) return true
    return false
}

export async function SetUser(user: SignupFormData) {
    const userId = (await bcrypt.hash(user.phone, 10)).replace('/','').replace('.','')
    const data = { userId, ...user, email: '', cart: [], fav: [], messages: [], reviews: [], address: '' }
    const result = await fetch(`${process.env.SERVER_HOST}/auth/set-user`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await result.json()
}

export async function GetUser(phone: string, isAuthed: boolean, password?: string) {
    const result = await fetch(`${process.env.SERVER_HOST}/auth/check-user`, {
        method: 'POST',
        body: JSON.stringify({ phone, password, isAuthed }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const user = await result.json()
    if (isAuthed) return user.user
    return { res: user, status: result.status }
}

export async function UpdateUser(id: string, name: string, phone: string, address: string) {
    const result = await fetch(`${process.env.SERVER_HOST}/auth/update-user`, {
        method: 'PUT',
        body: JSON.stringify({ id, name, phone, address }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    const message = await result.json()
    return message
}