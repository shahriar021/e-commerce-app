import { baseApi } from "src/redux/createdApi/baseApi";

const notificationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getNotification:builder.query({
            query:(token)=>{
                return {
                    url:"/notification",
                    method:"GET",
                     headers:{
                        Authorization:`Bearer ${token}`
                    },
                }
            }
        }),

         postNotificationRegister:builder.mutation({
            query:({token,body})=>{
                return {
                    url:"/user/fcm/register",
                    method:"Post",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    body
                }
            }
        })
    })
})

export const {useGetNotificationQuery,usePostNotificationRegisterMutation}=notificationApi