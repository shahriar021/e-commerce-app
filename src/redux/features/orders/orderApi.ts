import { baseApi } from "src/redux/createdApi/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrandOrderList: builder.query({
            query: ({ token, limit }) => {
                return {
                    url: `/order/?limit=${limit}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),

        postStatusOrderBrand: builder.mutation({
            query: ({ token, body }) => {
                return {
                    url: `/order/status`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body,
                };
            },
        }),

        getBrandOrderDetails:builder.query({
            query:({token,id})=>{
                return{
                    url:`/order?cartProductId=${id}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        })
    }),
});

export const { useGetBrandOrderListQuery, usePostStatusOrderBrandMutation,useGetBrandOrderDetailsQuery } =
    orderApi;