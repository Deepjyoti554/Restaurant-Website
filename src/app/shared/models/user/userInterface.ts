interface ingredient{
    ingredientId : string
    name : string
    quantity : number
}

interface item{
    itemId : string
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

export interface order{
    id: string
    customerId: string,
    items: Array<item>
    totalPrice: number
    status: string
    customization: string
}