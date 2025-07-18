export interface Meal {
    id: number;
    room_id: number | null;
    hotel_guest_id: string;
    product_ids: string;
    set_menu_ids: string | null;
    sales_qty: string;
    sales_price: string;
    item_price: string;
    subtotal: string;
    meal_type_id: string;
    request_type: string | null;
    payment_type_with_without: string;
    status: string;
    admin_rejection_comments: string | null;
    emp_rejection_comments: string | null;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    is_meal: string;
    date: string; // YYYY-MM-DD
    qty: string;
    guest_names: string | null;
    attachments: string | null;
    is_requisition: string;
    hotel_guest_name: string;
    product_name: string;
    meal_type_name: string;
    room_number: string | null;
  }
  

  export type MealStatusType = {
    visible: boolean;
    onClose: () => void;
    itemId: string;
  };

  export type MealChooseType={
    id:number,
    name:string
  }

  export type MealType={
    id:number,
    name:string,
    status:string
  }