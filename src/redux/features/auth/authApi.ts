import { baseApi } from "src/redux/createdApi/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (loginData) => {
                console.log(loginData,"api login data")
                return {
                url: "/auth/login",
                method: "POST",
                body: loginData
                }
            }
        }),

        // sign up as user
        signUpUser: builder.mutation({
            query: (userBody) => {
                
                return {
                    url: "/auth/signup",
                    method: "POST",
                    body: userBody
                }

            }
        }),

        forgetPassword:builder.mutation({
            query:(data)=>{

                return {
                    url:"/auth/forget_password",
                    method:"POST",
                    body:data
                }
            }
        }),

        otpVerify:builder.mutation({
            query:(data)=>{
                return{
                    url:"/auth/verify_otp",
                    method:"POST",
                    body:data
                }
            }
        }),

        resetPassword:builder.mutation({
            query:({info,atoken})=>{
                console.log(info,"data")
                console.log(atoken,"token")
                return {
                    url:"/auth/reset_password",
                    method:"PUT",
                    headers:{
                        Authorization:`Bearer ${atoken}`
                    },
                     body: info.data,
                }
            }
        })


    })
})

export const { useLoginMutation, useSignUpUserMutation,useForgetPasswordMutation,useOtpVerifyMutation,useResetPasswordMutation } = authApi