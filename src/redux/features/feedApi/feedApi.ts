import { baseApi } from "src/redux/createdApi/baseApi";

const feedApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({

        getAllPost:builder.query({

            query:({token,limit})=>{
                return{

                    url:`/post?limit=${limit}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            providesTags:['feedPost']
        }),

        postFeedPost:builder.mutation({

            query:(token)=>{

                return{
                    url:`/post`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        }),

        // getAllComments:builder.query({

        //     query:({token,pId})=>{

        //         return {

        //             url:`/comments?postId=${pId}`,
        //             method:"GET",
        //             headers:{
        //                 Authorization:`Bearer ${token}`
        //             }
        //         }
        //     }
        // }) may b for later

        postCommentBasedOnId:builder.mutation({

            query:({token,pId,info})=>{

                return{

                    url:`/comments/${pId}`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    body:info
                }
            },
            invalidatesTags:['feedPost']
        })
    })
})

export const{useGetAllPostQuery,usePostCommentBasedOnIdMutation,usePostFeedPostMutation}=feedApi;