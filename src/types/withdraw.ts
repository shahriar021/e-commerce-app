export type WithdrawInitResponse = {
    success: boolean;
    message?: string;
    data?: {
        onboarding_url?: string;
        stripe_account_id?: string;
        instructions?: {
            step1?: string;
            step2?: string;
            step3?: string;
        };
    };
};