export interface LaundryItem {
    id: number;
    trackingID: string;
    room_id: number;
    room_number: number;
    service_user_id: number | null;
    service_user_name: string | null;
    company_id: number;
    company_name: string;
    created_by: number;
    created_by_name: string;
    updated_by: number;
    updated_by_name: string;
    laundry_item_id: string; // stored as JSON string: '["30", "31"]'
    laundry_item_name: string[]; // e.g., ["T-Shirt", "Polo"]
    laundry_item_amount: number[]; // e.g., [2, 2]
    date_time: string; // ISO datetime string
    status: string;
    requirement: string | null;
    cloth_details: string | null;
    created_at: string; // ISO datetime string
    updated_at: string; // ISO datetime string
    total_payable: string; // stored as string, e.g., "640.00"
    total_paid: string; // e.g., "0.00"
    total_due: string; // e.g., "640.00"
  }
  