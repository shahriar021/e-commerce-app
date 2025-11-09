import { baseApi } from "src/redux/createdApi/baseApi";

const scanApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({
        getScanImage:builder.mutation({
            
            query:({token,body})=>{

                return{
                    url:`/stats/scan`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    body
                }
            }
        }),

        getSearchProductByText:builder.query({
            query:({token,text})=>{
                return{
                    url:`/product?searchTerm=${text}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"GET"
                }
            }
        })
    })
})

export const {useGetScanImageMutation,useGetSearchProductByTextQuery}=scanApi