type RedemptionItem = {
  pointsRedeemed: number;
  amount: number;
  updatedAt: string;
  status: string;
  id?: string | number;
};

export type RewardProps = {
  activeTab: "Pending" | "Activity";
  redemptions?: RedemptionItem[];
  redeemLoading: boolean;
  onRedeem: () => void;
};