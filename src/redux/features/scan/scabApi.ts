import { baseApi } from "src/redux/createdApi/baseApi";

const scanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getScanImage: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/stats/scan`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type, let fetch handle it
        },
        body: formData,
      }),
    }),

    getSearchProductByText: builder.query({
      query: ({ token, text }) => {
        return {
          url: `/product?searchTerm=${text}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
      },
    }),
  }),
});

export const {useGetScanImageMutation,useGetSearchProductByTextQuery}=scanApi