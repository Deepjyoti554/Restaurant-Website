export interface staff{
id: string
name: string
email: string
password: string
role: string
shift:string
rating: number
customers: Array<customer>
}


export interface ingredient {
    ingredientId: string
    name: string
    quantity: number
}

export interface item {
    itemId: string
    name: string
    image: string
    description: string
    category: string
    price: number
    rating: number
    quantity: number
    customization: string
    ingredients: ingredient
}

export interface customer {
    id: string
    customerId: string
    name: string
    email: string
    password: string
    role: string
    cart: Array<item>
    status: string
    totalBill: number
    customization: string
}