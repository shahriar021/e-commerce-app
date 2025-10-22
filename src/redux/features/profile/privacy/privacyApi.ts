import { baseApi } from "src/redux/createdApi/baseApi";

const privacyApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({

        getPrivacy:builder.query({

            query:({token,type})=>{

                return {

                    url:`/settings?type=${type}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        })
    })
})

export const {useGetPrivacyQuery}=privacyApi