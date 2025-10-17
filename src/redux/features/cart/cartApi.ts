import { baseApi } from "src/redux/createdApi/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        postAddToCart:builder.mutation({

            query:({token,data})=>{

                return{
                    url:"/cart",
                    method:"POST",
                    body:data,
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            invalidatesTags:['getCart']
        }),

        getAddToCart:builder.query({

            query:(token)=>{

                return {
                    url:`/cart`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            providesTags:['getCart']
        })
    })
})

export const {usePostAddToCartMutation,useGetAddToCartQuery}=cartApi

