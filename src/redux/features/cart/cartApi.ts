import { baseApi } from "src/redux/createdApi/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postAddToCart: builder.mutation({
            query: ({ token, data }) => {
                return {
                    url: "/cart",
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            invalidatesTags: ["getCart"],
        }),

        getAddToCart: builder.query({
            query: (token) => {
                return {
                    url: `/cart`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            providesTags: ["getCart"],
        }),

        updateCart: builder.mutation({
            query: ({ token, body, id }) => {
                console.log(id, "in redux");
                return {
                    url: `/cart/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body,
                    method: "PATCH",
                };
            },
            invalidatesTags: ["getCart"],
        }),

        deleteCartItem:builder.mutation({
            query:({token,id})=>{
                return{
                    url:`/cart/${id}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"DELETE"
                }
            },
            invalidatesTags: ["getCart"],
        })
    }),
});

export const {
    usePostAddToCartMutation,
    useGetAddToCartQuery,
    useUpdateCartMutation,
    useDeleteCartItemMutation
} = cartApi;
