

export type SettingItem = {
  icon: string; 
  label: string;
  route: string; 
};


export interface MyFav {
  createdAt: string;
  ownerId: string;
  ownerType: string;
  product: {
    _id: string;
    brandId: string;
    category: string;
    colors: string[]; // Assuming this is an array of colors
    discountPrice: number;
    inStock: boolean;
    isDeleted: boolean;
    measurement: any[]; // Update this based on the actual measurement structure
    price: number;
    productImages: string[]; // Array of image URLs
    productName: string;
    shippingNote: string;
    shortDescription: string;
    updatedAt: string;
  };
  productId: string;
}


interface OrderItem {
  productName: string;
  productImages: string[];
  quantity: number;
  size: string;
  sellerStatus?: string;
  price:number
}

export interface Order {
  _id: string;
  items: OrderItem[] | null;
   createdAt: string;
  userId: string;
  userType: string;
}


interface UserProfile {
  __t: string; // Type of the user, e.g., "User"
  __v: number; // Version
  _id: string; // User ID
  about: string; // About the user
  confirmedPassword: string; // Confirmed password
  countryCode: string; // Country code for the phone number
  coverPhoto: string[]; // Array of cover photo URLs
  createdAt: string; // ISO string timestamp
  email: string; // User email
  failed_attempts: number; // Number of failed login attempts
  favouriteStyles: string[]; // Array of favourite styles
  firstName: string; // User's first name
  hometown: string; // User's hometown
  isDeleted: boolean; // Whether the account is deleted
  lastName: string; // User's last name
  last_login: string; // Last login timestamp
  mobile: string; // Mobile number
  password: string; // Hashed password
  passwordUpdatedAt: string; // Password last updated timestamp
  profile: string[]; // Array of profile image URLs
  role: string; // User role, e.g., "User"
  stripe_customer_id: string; // Stripe customer ID
  theme: string; // User's theme
  totalFollowers: number; // Total followers
  totalFollowing: number; // Total following
  totalPosts: number; // Total posts
  totalReacts: number; // Total reactions
  updatedAt: string; // Last updated timestamp
  userName: string; // User's username
  brandName:string;
  brandStory:string;
  brandLogo: string[];
}

// Define an interface for the response
export interface ProfileResponse {
  data: UserProfile; // The profile data
  message: string; // Message indicating the success of the operation
  success: boolean; // Whether the request was successful
}