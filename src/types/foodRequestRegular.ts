export type dayType = {
    id:string,
    name:string
}

export type foodSelectType={
    id:string,
    name:string
}

export type ProductType ={
    id:number,
    name:string,
    sale_price:string
    price:string,
    type:string
}

export interface RoomType{
    id:number,
    room_number:number
}

export interface CartModalProps{
  visible:boolean,
  onClose:()=>void,
  data:ProductType[],
  mealType:string | undefined,
  room:RoomType[],
  reqType:string
}

export interface Quantity{
    [key:string]:number
}

export interface paymentMethodType{
    id:number,
    name:string
}

export interface FoodList {
    id: number;
    room_id: number | null;
    hotel_guest_id: string;
    hotel_guest_name: string;
    product_ids: string[];
    products: string[];
    set_menu_ids: string[];
    set_menus: string[];
    sales_qty: string[];
    sales_price: string[];
    item_price: string[];
    subtotal: string;
    meal_type_id: string;
    meal_type: string;
    request_type: string;
    payment_type_with_without: string;
    status: string;
    admin_rejection_comments: string | null;
    emp_rejection_comments: string | null;
    created_at: string; // Can be converted to Date when needed
    updated_at: string; // Can be converted to Date when needed
    is_meal: string;
    date: string | null;
    qty: string;
    guest_names: string; // Looks like a JSON stringified array, might need parsing
    attachments: string | null;
    is_requisition: string;
  }
  

  export type FoodStatusChooseType ={
    id:number,
    name:string
  }

  export type FoodStatusModal={
    visible:boolean,
    onClose:()=>void,
    itemId:string
  }

