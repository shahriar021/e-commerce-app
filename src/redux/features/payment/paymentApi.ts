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

        postPaymentToStripe:builder.mutation({
            query:({token,body})=>{

                return{

                    url:`/payment-sheet`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"POST",
                    body
                }
            }
        })
    }),
});

export const { usePostPaymentMutation, useGetSetupIntentQuery ,usePostPaymentToStripeMutation} = paymentApi;