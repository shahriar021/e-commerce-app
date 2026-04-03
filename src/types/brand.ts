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
  _id: string;
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

// ------
// types/brand.ts

 interface NotificationSettings {
  emailEnabled: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  pushEnabled: boolean;
  rewards: boolean;
  withdrawals: boolean;
}

interface BrandData {
  __t: string;
  __v: number;
  _id: string;
  brandLogo: string[];
  brandName: string;
  confirmedPassword: string;
  countryCode: string;
  coverPhoto: string[];
  createdAt: string;
  email: string;
  failed_attempts: number;
  fcmTokens: object[];
  isDeleted: boolean;
  last_login: string;
  mobile: string;
  notificationSettings: NotificationSettings;
  password: string;
  passwordUpdatedAt: string;
  profile: any[];
  role: string;
  stripe_accounts_id: string;
  stripe_customer_id: string;
  theme: string;
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalReacts: number;
  updatedAt: string;
  userName: string;
}

export interface BrandProfileResponse {
  data: BrandData;
  message: string;
  success: boolean;
}