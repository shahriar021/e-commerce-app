import { baseApi } from "src/redux/createdApi/baseApi";

const favouriteApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getFavProduct: builder.query({

            query: ( token ) => {
                return {
                    url: `/favourite/product`,
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            providesTags:['favProduct']
        }),

        postFavProduct: builder.mutation({
            query:({token,id})=>{

                return {
                    url:`/favourite/post/${id}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    method:"POST"
                }
            },
            invalidatesTags:['favProduct']
        })
    })
})

export const {useGetFavProductQuery,usePostFavProductMutation}=favouriteApi;