import { baseApi } from "src/redux/createdApi/baseApi";

const productApi=baseApi.injectEndpoints({   
    endpoints:(builder)=>({
        productListBrandIdWise:builder.query({

            query:({token,id,limit})=>{
                    console.log(id,"in redux.")
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
        })
    })
})

export const {useProductListBrandIdWiseQuery,useGetProductIdWiseQuery}=productApi