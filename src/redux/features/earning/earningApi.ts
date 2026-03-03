import { baseApi } from "src/redux/createdApi/baseApi";
import { TransactionResponse } from "src/types/earning";

const earningApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGraph: builder.query({
            query: ({token,year}) => {
                return {
                    url: `/graph/earnings?year=${year}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                };
            },
            providesTags:['earningGraph']
        }),

        getEarningStats: builder.query({
            query: (token) => {
                return {
                    url: `earnings/stats`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                };
            },
            providesTags:['earningStats']
        }),

        getTransaction: builder.query({
            query: (token) => {
                return {
                    url: `/order/transaction`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            providesTags:['earningTransaction']
        }),
    }),
});

export const { useGetGraphQuery, useGetEarningStatsQuery,useGetTransactionQuery } = earningApi;