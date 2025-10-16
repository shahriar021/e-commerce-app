import { baseApi } from "src/redux/createdApi/baseApi";

const productApi=baseApi.injectEndpoints({   
    endpoints:(builder)=>({
        productListBrandIdWise:builder.query({

            query:({token,id,limit})=>{
                   
                return{
                    url:`/product?brandId=${id}&limit=${limit}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        }),

        getProductIdWise:builder.query({

            query:({token,id})=>{

                return{
                    url:`/product?_id=${id}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        }),

        getSpecificProductBasedOnId:builder.query({

            query:({token,id})=>{

                return {
                    url:`/product?_id=${id}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"GET"
                }
            }
        })
    })
})

export const {useProductListBrandIdWiseQuery,useGetProductIdWiseQuery,useGetSpecificProductBasedOnIdQuery}=productApi