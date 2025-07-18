import { baseApi } from "src/redux/createdApi/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(loginData)=>({
                url:"/login",
                method:"POST",
                body:loginData
            })
        })
    })
})

export const {useLoginMutation}=authApi