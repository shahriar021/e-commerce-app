export interface BrandItem {
  _id: string;
  brandLogo: any[]; // Adjust the type of brandLogo based on the actual data
  brandName: string;
  theme: string;
}

export interface AllProduct {
  brandId: string;
  category: string;
  colors: string[]; // Array of color hex codes
  createdAt: string;
  discountPrice: number;
  id: string;
  inStock: boolean;
  isDeleted: boolean;
  measurement: any[]; // Adjust based on actual structure
  price: number;
  productImages: string[]; // Array of image URLs
  productName: string;
  saleTag: boolean;
  shippingNote: string;
  shortDescription: string;
  stripe_price_id: string;
  stripe_product_id: string;
  totalQuantity: number;
  updatedAt: string;
}

export interface SizeData {
  _id: string;
  chest: string;
  heightRange: string;
  hips: string;
  size: string;
  waist: string;
}