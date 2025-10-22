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
        })
    })
})

export const {useGetProfileQuery,useUpdateProfileMutation}=profileApi