import { baseApi } from "src/redux/createdApi/baseApi"

const restApi= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        tableList:builder.query({
            query:()=>{
                return {
                    url:"/table",
                    method:"GET"
                }
            }
        }),

        createTableItems:builder.query({
            query:({tId,wId})=>{
                return {
                    url:"/create-from-table",
                    method:"GET",
                    param:{
                        table_id:tId,
                        waiter:wId
                    }
                }
            }
        }),

        createTableItemsWithSaleId:builder.query({
            query:({tId,sId})=>{
                return {
                    url:"/create-from-table",
                    method:"GET",
                    param:{
                        table_id:tId,
                        sale_id:sId
                    }
                }
            }
        }),

        onGoingCustomerList:builder.query({
            query:()=>{
                return {
                method:"GET",    
                url:"/ongoing-sales",
            }
            }
        }),

        orderSubmitApi:builder.mutation({
            query:(output)=>{
                return {
                    method:"POST",
                    url:"/restaurant/sales/store",
                    body:output
                }
            }
        })
    })
})

export const {useTableListQuery,useCreateTableItemsQuery,useCreateTableItemsWithSaleIdQuery,useOnGoingCustomerListQuery,useOrderSubmitApiMutation}=restApi