// types/earning.ts

export interface EarningGraphItem {
  earnings: number;
  month: string;
}

export interface EarningGraphResponse {
  data: EarningGraphItem[];
  message: string;
  success: boolean;
}

export interface EarningStatsData {
  available: number;
  monthlyEarning: number;
  totalEarning: number;
  totalPending: number;
}

export interface EarningStatsResponse {
  data: EarningStatsData;
  message: string;
  success: boolean;
}

export interface TransactionItem {
  cartProductId: string;
  earning: number;
  earningStatus: "paid" | "pending";
  createdAt: string;
}

export interface TransactionMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface TransactionResponse {
  data: {
    data: TransactionItem[];
    meta: TransactionMeta;
  };
  message: string;
  success: boolean;
}