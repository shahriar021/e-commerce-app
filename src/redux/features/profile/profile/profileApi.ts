import { baseApi } from "src/redux/createdApi/baseApi";

const profileApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({

        getProfile:builder.query({

            query:(token)=>{

                return{

                    url:`/profile`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"GET"
                }
            },
            providesTags:['profile']
        }),

        updateProfile:builder.mutation({

            query:({token,formData})=>{

                return{

                    url:`/user`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"PATCH",
                    body:formData
                }
            },
            invalidatesTags:['profile']
        }),

        getLookbook:builder.query({

            query:({token,limit})=>{
                console.log(limit,"in redux")
                return{
                    url:`/savepost?limit=${limit}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"GET"
                }
            }
        }),

        getIndividualPost:builder.query({
            
            query:({token,uid,limit})=>{

                return{
                    url:`/post?uploaderId=${uid}&limit=${limit}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"GET"
                }
            }
        }),

        updateBrandProfile:builder.mutation({

            query:({token,formData})=>{

                return{

                    url:`/brand`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"PATCH",
                    body:formData
                }
            },
            invalidatesTags:['profile']
        }),

        orderHistory:builder.query({
            query:(token)=>{
                return{
                    url:`/order`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },

                }
            }
        })
    })
})

export const {useGetProfileQuery,useUpdateProfileMutation,useGetLookbookQuery,useGetIndividualPostQuery,useUpdateBrandProfileMutation,useOrderHistoryQuery}=profileApi