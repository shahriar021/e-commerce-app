import { baseApi } from "src/redux/createdApi/baseApi";

const orderApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({

        getBrandOrderList:builder.query({

            query:({token,limit})=>{

                return {
                    url:`/order/?limit=${limit}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        })
    })
})

export const {useGetBrandOrderListQuery}=orderApi