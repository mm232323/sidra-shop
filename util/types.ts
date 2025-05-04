export interface SignupFormData {
    name: string,
    phone: string,
    password: string
}

export interface userData extends SignupFormData {
    userId: string,
    cart: string[],
    messages: string[],
    address: string,
}
export interface updateFormData {
    name: string,
    phone: string,
    address: string
}

export interface ProductType {
    _id:string,
    name:string,
    price:string[],
    weight:string[],
    type:string,
    imgUrl:string,
    designUrl:string,
    comments:CommentType[]
}

export interface CommentType {
    title:string,
    comment:string,
    rating:number,
    username:string,
    date:string
}

export interface NewsType {
    _id:string,
    title:string,
    text:string,
    imgUrl:string,
    reactions:string[],
    comments:string[],
    date:Date;
}