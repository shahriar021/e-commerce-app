// import { baseApi } from "src/redux/createdApi/baseApi";

// const productApi=baseApi.injectEndpoints({   
//     endpoints:(builder)=>({
//         productListBrandIdWise:builder.query({

//             query:({token,id,limit})=>{

//                 return{
//                     url:`/product?brandId=${id}&limit=${limit}`,
//                     method:"GET",
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     }
//                 }
//             }
//         }),

//         getProductIdWise:builder.query({

//             query:({token,id})=>{

//                 return{
//                     url:`/product?_id=${id}`,
//                     method:"GET",
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     }
//                 }
//             }
//         }),

//         getSpecificProductBasedOnId:builder.query({

//             query:({token,id})=>{

//                 return {
//                     url:`/product?_id=${id}`,
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     },
//                     method:"GET"
//                 }
//             }
//         }),


//     })
// })

// export const {useProductListBrandIdWiseQuery,useGetProductIdWiseQuery,useGetSpecificProductBasedOnIdQuery}=productApi



import { baseApi } from "src/redux/createdApi/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        productListBrandIdWise: builder.query({
            query: ({ token, id, limit }) => {
                return {
                    url: `/product?brandId=${id}&limit=${limit}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            providesTags:['product']
        }),

        getProductIdWise: builder.query({
            query: ({ token, id }) => {
                return {
                    url: `/product?_id=${id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),

        getSpecificProductBasedOnId: builder.query({
            query: ({ token, id }) => {
                return {
                    url: `/product?_id=${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                };
            },
        }),

        uploadProduct: builder.mutation({
            query: ({ token, formData }) => {
                return {
                    url: `/product`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                };
            },
            invalidatesTags:['product']
        }),

        deleteProduct: builder.mutation({
            query: ({ token, id }) => {
                return {
                    url: `/product/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            invalidatesTags:['product']
        }),

        updateProduct:builder.mutation({
            query:({token,id,body})=>{
                return{
                    url:`/product/${id}`,
                    method:"PATCH",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    body
                }
            },
            invalidatesTags:['product']
        })
    }),
});

export const {
    useProductListBrandIdWiseQuery,
    useGetProductIdWiseQuery,
    useGetSpecificProductBasedOnIdQuery,
    useUploadProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productApi;
