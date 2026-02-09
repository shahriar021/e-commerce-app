

export type RootStackParamList={
    Home:undefined,
    "Cart Page":{id?:string} | undefined,
    "Brand":undefined,
    "Feed":undefined,
    "Brand Details": { orderId: string },
    "Order History": { id: string },
    "Order Details": { id: string },
    "OrderHistoryDetails": { orderId: string };
    "See all products": { id: string },
    "Review": { id: string },
    "Brand Products": { ID: string },
    "Payment screen":{ total:string, shiping:string},
    "Product Details": { ID?: string } | undefined,
    "See all brands": undefined,
    "Other/brand profile": { upID: string };
    "Setting":undefined
}