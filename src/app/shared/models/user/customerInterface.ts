export interface ingredient {
    ingredientId: string
    name: string
    quantity: number
}

// export interface ingredient {
//     ingredientId: string
//     name: Egg
//     quantity: 100 - 3
// }

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

interface order {
    id: string
    customerId: string,
    items: Array<item>
    totalPrice: number
    status: string
    customization: string
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