import { baseApi } from "src/redux/createdApi/baseApi";

const followApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postFollow:builder.mutation({

            query:({token,id})=>{
                return {
                    url:`/follow/${id}`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        })
    })
})


export const {usePostFollowMutation}=followApi