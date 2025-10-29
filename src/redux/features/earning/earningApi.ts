import { baseApi } from "src/redux/createdApi/baseApi";

const earningApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGraph: builder.query({
            query: (token) => {
                return {
                    url: `/graph/earnings`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                };
            },
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
        }),
    }),
});

export const { useGetGraphQuery, useGetEarningStatsQuery } = earningApi;