import { baseApi } from "src/redux/createdApi/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSetupIntent: builder.query({
            query: (token) => {
                return {
                    url: `/save_card/setup`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                };
            },
        }),

        postPayment: builder.mutation({
            query: ({ token, body }) => {
                return {
                    url: `/payment/card`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body,
                };
            },
        }),

        postPaymentToStripe: builder.mutation({
            query: ({ token, body }) => {

                return {

                    url: `/payment-sheet`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "POST",
                    body
                }
            }
        }),


        postWithdraw: builder.mutation({
            query: ({ token, body }) => {

                return {
                    url: `/withdraw/withdraw`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body
                }
            }
        }),

        initialPostWithdraw: builder.mutation({
            query: (token) => {
                return {
                    url: `/withdraw/onboarding/initiate`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        }),

        getWithdrawOnboardingStatus: builder.query<any, { token: string; stripe_account_id: string }>({
            query: ({ token, stripe_account_id }) => ({
                url: `/withdraw/onboarding/status`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),


        // ----------reward

        initialPostReward: builder.mutation({
            query: (token) => {
                return {
                    url: `/reward/onboarding/initiate`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        }),

        getRewardOnboardingStatus: builder.query<any, { token: string; stripe_account_id: string }>({
            query: ({ token, stripe_account_id }) => ({
                url: `/reward/onboarding/status`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),

        postReward: builder.mutation({
            query: ( token ) => {

                return {
                    url: `/reward/redeem`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            }
        }),

        getRewardBalance: builder.query({
            query: ( token ) => ({
                url: `/reward/balance`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),

        getRewardHistory: builder.query({
            query: ( token ) => ({
                url: `/reward/history`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),


    }),
});

export const { usePostPaymentMutation, useGetSetupIntentQuery, usePostPaymentToStripeMutation, usePostWithdrawMutation, useInitialPostWithdrawMutation,useGetWithdrawOnboardingStatusQuery,
    useInitialPostRewardMutation,useGetRewardOnboardingStatusQuery,usePostRewardMutation,useGetRewardBalanceQuery,useGetRewardHistoryQuery } = paymentApi;