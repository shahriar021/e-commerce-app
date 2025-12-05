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
        }),

        getBrandOfTheWeek:builder.query({
           query:(token)=>{

            return {
                url:`/stats/brand_of_the_week`,
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                },
            }
           }
        })
    })
})

export const {useFeatureBrandsQuery,useGetBrandWithIdQuery,useGetBrandOfTheWeekQuery}=brandApi; 