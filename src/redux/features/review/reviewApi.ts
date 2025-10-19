import { baseApi } from "src/redux/createdApi/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getALlReviewBasedOnId: builder.query({

            query: ({ token, id, limit }) => {
                console.log(token, id, limit, ".")

                return {
                    url: `/review?productId=${id}&limit=${limit}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
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
            }
        })
    })
})

export const { useGetALlReviewBasedOnIdQuery , usePostReviewBasedOnIdMutation} = reviewApi