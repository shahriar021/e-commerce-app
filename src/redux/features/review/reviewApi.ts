import { baseApi } from "src/redux/createdApi/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getALlReviewBasedOnId: builder.query({

            query: ({ token, id, limit }) => {
                console.log(token, id, limit, "in redux.")

                return {
                    url: `/review?productId=${id}&limit=${limit}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
        })
    })
})

export const { useGetALlReviewBasedOnIdQuery } = reviewApi