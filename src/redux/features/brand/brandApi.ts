import { baseApi } from "src/redux/createdApi/baseApi";

const brandApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        featureBrands:builder.query({
            query:({token,limit})=>{
                return {
                    url:`/stats/brandlist?limit=${limit}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    limit:limit
                }
            }
        }),

        getBrandWithId:builder.query({
           query:({token,id})=>{

            return {
                url:`/brand?_id=${id}`,
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                },
                id:id
            }
           }
        })
    })
})

export const {useFeatureBrandsQuery,useGetBrandWithIdQuery}=brandApi; 