import { baseApi } from "src/redux/createdApi/baseApi";

const brandHome = baseApi.injectEndpoints({

    endpoints:(builder)=>({
        getBrandHomeStats:builder.query({

            query:(token)=>{

                return {

                    url:`/stats/orders`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    mehod:"GET"
                }
            }
        }),

        getBrandHomeGraph:builder.query({

            query:({token,year})=>{

                return {

                    url:`/graph/orders?year=${year}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"GET"
                }
            }
        })
    })
})

export const {useGetBrandHomeStatsQuery,useGetBrandHomeGraphQuery}=brandHome;