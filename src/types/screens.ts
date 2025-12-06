

export type RootStackParamList={
    Home:undefined,
    "Cart Page":{id?:string} | undefined,
    "Brand":undefined,
    "Feed":undefined,
    "Brand Details": { id: string },
    "See all products": { id: string },
    "Review": { id: string },
    "Brand Products": { ID: string },
    "Payment screen":{ total:string, shiping:string},
    "Product Details": { ID?: string } | undefined,
    "See all brands": undefined,

}