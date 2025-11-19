import { baseApi } from "src/redux/createdApi/baseApi";

const getRewardApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTotalReward:builder.query({
            query:(token)=>{
                return{
                    url:`/reward`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        })
    })
})

export const {useGetTotalRewardQuery}=getRewardApi