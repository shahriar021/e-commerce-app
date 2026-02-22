export interface ImageObject {
  assetId: string | null;
  base64: string | null;
  duration: number | null;
  exif: any | null;
  fileName: string;
  fileSize: number;
  height: number;
  mimeType: string;
  rotation: number | null;
  type: string;
  uri: string;
  width: number;
}

export interface ImageFile {
  name: string;
  type: string;
  uri: string;
}

// Measurement inside product
export interface Measurement {
  _id: string;
  size: string; // e.g. "m", "l"
  chest: number;
  waist: number;
  hips: number;
  heightRange: number;
}

// Single Product
export interface Product {
  _id: string;
  brandId: string;
  stripe_product_id: string;
  productName: string;
  shortDescription: string;
  productImages: string[];
  colors: string[];
  category: string;
  measurement: Measurement[];
  totalQuantity: number;
  price: number;
  stripe_price_id: string;
  discountPrice: number;
  saleTag: boolean;
  shippingNote: string;
  __v: number;
  updatedAt: string; // ISO date
  inStock: boolean;
  isDeleted: boolean;
}

// API Response
export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

