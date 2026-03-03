export type RootStackParamList = {
  // Core
  "Home": undefined;
  "Feed": undefined;
  "Setting": undefined;

  // Auth / Onboarding
  "BottomScreen": { brand?: string } | undefined;

  // Brand
  "Brand": undefined;
  "Brand Details": { id: string };        // changed from orderId to id
  "Brand Products": { ID: string };
  "Brand Profile": undefined;
  "See all brands": undefined;
  "Other/brand profile": { upID: string };

  // Cart & Payment
  "Cart Page": { id?: string } | undefined;
  "Payment screen": { total: string; shiping?: string }; // shiping made optional

  // Orders
  "Order History": { id: string };
  "Order Details": { id: string };
  "OrderHistoryDetails": { orderId: string };
  "Order List": undefined;

  // Products
  "Product Details": { ID?: string } | undefined;
  "See all products": { id: string };
  "All Products": undefined;
  "Add Products": undefined;
  "Edit Products": { id: string };
  "Details Product": { id: string };

  // Profile
  "Profile": undefined;
  "Seller Profile": undefined;
  "Edit Profile": undefined;
  "Change Password": undefined;
  "My Favourite": undefined;
  "Address": undefined;
  "Privacy": undefined;
  "Terms": undefined;

  // Earning / Finance
  "Reward": undefined;
  "Transaction": undefined;
  "Withdraw": undefined;

  // Search
  "Search Page": { search: string };
  "Search Result": undefined;

  // Misc
  "Notification": undefined;
  "Review": { id: string };
  "Products": undefined;
};