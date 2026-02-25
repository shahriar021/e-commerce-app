//for all products list

export interface Measurement {
  [key: string]: any; // share the actual measurement object shape if you have it
}

export interface Product {
  brandId: string;
  category: string;
  colors: string[];
  createdAt?: string;
  discountPrice: number;
  id: string;
  inStock: boolean;
  isDeleted: boolean;
  measurement: Measurement[];
  price: number;
  productImages: string[];
  productName: string;
  saleTag: boolean;
  shippingNote: string;
  shortDescription: string;
  stripe_price_id: string;
  stripe_product_id: string;
  totalQuantity: number;
  updatedAt: string;
}

export interface ProductListResponse {
  data: {
    product: Product[];
  };
  message: string;
  success: boolean;
}