import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";
import { IPayementInfoPayload, IPayementInfo} from "../../interfaces";

interface IPayementResponse {
  message: string;
}
interface ICreatePayementResponse extends IPayementResponse {}
interface IDeletePayementResponse extends IPayementResponse {}
interface IUpdatePayementResponse extends IPayementResponse {}

export const apiPayementSlice = createApi({
  reducerPath: "payements",
  tagTypes: ["Payements"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false, 
  keepUnusedDataFor: 300, 
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/payments/`,
    headers: {
      Authorization: `Bearer ${CookieService.get("access")}`,
    },
  }),

  endpoints: (builder) => ({
    getPayementsInfo: builder.query<IPayementInfoPayload, void>({
      query: () => {
        return {
          url: ``,
          // params: ,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.payments.map(
                ({ id }) => ({ type: "Payements", id } as const)
              ),
              { type: "Payements", id: "LIST" },
            ]
          : [{ type: "Payements", id: "LIST" }],
    }),
    // * Create Payement
    createPayement: builder.mutation<
      ICreatePayementResponse,
      Partial<IPayementInfo> | FormData
    >({
      query: (payement) => {
        return {
          url: `/`,
          method: "POST",
          body: payement,
        };
      },
      invalidatesTags: [{ type: "Payements", id: "LIST" }],
    }),
    // * Update Payement by id
    updatePayement: builder.mutation<
      IUpdatePayementResponse,
      { id: string; payement: Partial<IPayementInfo> | FormData }
    >({
      query: ({ id, payement }) => {
        return {
          url: `/${id}/`,
          method: "PUT",
          body: payement,
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // const queryParams = { page: 1, pageSize: 10, sortBy: "desc" };
        const patchResult = dispatch(
          apiPayementSlice.util.updateQueryData(
            "getPayementsInfo",
            undefined,
            (draft) => {
              const PayementToUpdate = draft?.payments.find(
                (p) => p.id === id
              );
              if (PayementToUpdate) {
                Object.assign(PayementToUpdate, patch);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Payements", id: "LIST" }],
    }),
    // * Delete Payement by id
    deletePayement: builder.mutation<IDeletePayementResponse, string>({
      query: (id: string) => {
        return {
          url: `/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Payements", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPayementsInfoQuery,
  useCreatePayementMutation,
  useUpdatePayementMutation,
  useDeletePayementMutation,
} = apiPayementSlice;
