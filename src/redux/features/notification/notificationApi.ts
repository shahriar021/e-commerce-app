import { baseApi } from "src/redux/createdApi/baseApi";

const notificationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getNotification:builder.query({
            query:()=>{
                return {
                    url:"/notifications",
                    method:"GET"
                }
            }
        })
    })
})

export const {useGetNotificationQuery}=notificationApi