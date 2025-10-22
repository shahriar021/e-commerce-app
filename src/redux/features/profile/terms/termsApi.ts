import { baseApi } from "src/redux/createdApi/baseApi";

const termsApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({

        getTerms:builder.query({

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

export const {useGetTermsQuery}=termsApi