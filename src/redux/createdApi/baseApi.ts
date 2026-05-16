// import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import { RootState } from "../store"
// import { isTokenExpired } from "src/utils/isTokenExpired"
// import { Alert } from "react-native"
// import { useDispatch } from "react-redux"
// import { setToken } from "../features/auth/authSlice"

// const DynamicBaseQRY=async (args:any,api:any,extraOption:any)=>{
//   const baseUrl:string = process.env.EXPO_PUBLIC_BASE_URL

//   const rawBaseQry = fetchBaseQuery({baseUrl ,prepareHeaders:(headers,{getState})=>{
//     const token = (getState() as RootState).auth?.token;
//     const refreshToken = (getState() as RootState).auth.refreshToken;
    
//     if(token){
//         const extractedToken=`Bearer ${token}`

//         headers.set("Authorization",extractedToken)
//     }

//     return headers;
//   }})

//   return rawBaseQry(args,api,extraOption)
// }



// export const baseApi =createApi({
//   reducerPath:"baseApi",
//   baseQuery:DynamicBaseQRY,
//   refetchOnReconnect: true,  
//   refetchOnFocus: true, 
//   tagTypes:['getCart','feedPost','favProduct','profile','product','brandOrderList','specificProfile','earningStats','earningGraph','earningTransaction','review'],
//   endpoints:()=>({})
// })

import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

const DynamicBaseQRY=async (args:any,api:any,extraOption:any)=>{
  const baseUrl:string = process.env.EXPO_PUBLIC_BASE_URL

  const rawBaseQry = fetchBaseQuery({baseUrl ,prepareHeaders:(headers,{getState})=>{
    const token = (getState() as RootState).auth.user?.access_token;
    
    if(token){
        const extractedToken=`Bearer ${token}`

        headers.set("Authorization",extractedToken)
    }

    return headers;
  }})

  return rawBaseQry(args,api,extraOption)
}

export const baseApi =createApi({
  reducerPath:"baseApi",
  baseQuery:DynamicBaseQRY,
  refetchOnReconnect: true,  
  refetchOnFocus: true, 
  tagTypes:['getCart','feedPost','favProduct','profile','product','brandOrderList','specificProfile','earningStats','earningGraph','earningTransaction','review'],
  endpoints:()=>({})
})