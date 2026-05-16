import { baseApi } from "src/redux/createdApi/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getALlReviewBasedOnId: builder.query({

            query: ({ token, id, limit }) => {

                return {
                    url: `/review?productId=${id}&limit=${limit}`,
                    method: "GET",
                    headers: token ? {
                        Authorization: `Bearer ${token}`,
                    } : {},
                }
            },
            providesTags:['review']
        }),

        postReviewBasedOnId:builder.mutation({

            query:({token,id,formData})=>{

                return {
                    url:`/review/${id}`,
                    method:"POST",
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    body:formData
                }
            },
            invalidatesTags:['review']
        })
    })
})

export const { useGetALlReviewBasedOnIdQuery , usePostReviewBasedOnIdMutation} = reviewApi