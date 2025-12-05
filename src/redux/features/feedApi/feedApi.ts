import { baseApi } from "src/redux/createdApi/baseApi";

const feedApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({

        getAllPost:builder.query({

            query:({token,limit,tag})=>{
                return{

                    url:`/post?limit=${limit}&tags=${tag}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            providesTags:['feedPost']
        }),

        getUploaderProfile:builder.query({

            query:({token,id})=>{
                return{

                    url:`profile/${id}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            
        }),

        postFeedPost:builder.mutation({

            query:({token,formData})=>{

                return{
                    url:`/post`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    body:formData
                }
            },
            invalidatesTags:['feedPost']
        }),

        getComments:builder.query({
            query:({token,pid})=>{
                return{
                    url:`/comments?postId=${pid}`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        }),

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
        }),

        postLike:builder.mutation({

            query:({token,id})=>{

                return{
                    url:`/react/${id}`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
            invalidatesTags:['feedPost']
        }),

        postSave:builder.mutation({

            query:({token,id})=>{

                return{
                    url:`/savepost/${id}`,
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            },
        }),

        getFeedFilter:builder.query({
            query:(token)=>{
                return{
                    url:`/stats/feedFilterlist`,
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            }
        })
    })
})

export const{useGetAllPostQuery,usePostCommentBasedOnIdMutation,usePostFeedPostMutation,usePostLikeMutation,usePostSaveMutation,useGetUploaderProfileQuery,useGetFeedFilterQuery,useGetCommentsQuery}=feedApi;