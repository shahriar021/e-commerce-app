import { baseApi } from "src/redux/createdApi/baseApi";

const brandApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        featureBrands:builder.query({
            query:({token,limit})=>{
                    console.log(limit,"in redux.")
                return {
                    url:`/stats/brandlist?limit=${limit}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    limit:limit
                }
            }
        })
    })
})

export const {useFeatureBrandsQuery}=brandApi;