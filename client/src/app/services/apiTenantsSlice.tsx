import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";
import { ITenants, ITenantsPayload } from "../../interfaces";

interface ITenantResponse {
  message: string;
}
interface ICreateTenantResponse extends ITenantResponse {}
interface IDeleteTenantResponse extends ITenantResponse {}
interface IUpdateTenantResponse extends ITenantResponse {}

export const apiTenantsSlice = createApi({
  reducerPath: "tenants",
  tagTypes: ["Tenants"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false,  
  keepUnusedDataFor: 300,  
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/tenants/`,
    headers: {
      Authorization: `Bearer ${CookieService.get("access")}`,
    },
  }),

  endpoints: (builder) => ({
    getTenants: builder.query<ITenantsPayload, void>({
      query: () => {
        return {
          url: ``,
          // params: ,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.tenants.map(
                ({ id }) => ({ type: "Tenants", id } as const)
              ),
              { type: "Tenants", id: "LIST" },
            ]
          : [{ type: "Tenants", id: "LIST" }],
    }),
    // * Create Tenants
    createTenants: builder.mutation<
      ICreateTenantResponse,
      Partial<ITenants> | FormData
    >({
      query: (tenants) => {
        return {
          url: `/`,
          method: "POST",
          body: tenants,
        };
      },
      invalidatesTags: [{ type: "Tenants", id: "LIST" }],
    }),
    // * Update Tenants by id
    updateTenants: builder.mutation<
      IUpdateTenantResponse,
      { id: string; tenant: Partial<ITenants> | FormData }
    >({
      query: ({ id, tenant }) => {
        return {
          url: `/${id}/`,
          method: "PUT",
          body: tenant,
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) { 
        const patchResult = dispatch(
          apiTenantsSlice.util.updateQueryData(
            "getTenants",
            undefined,
            (draft) => {
              const TenantsToUpdate = draft?.tenants.find(
                (p) => p.id === id
              );
              if (TenantsToUpdate) {
                Object.assign(TenantsToUpdate, patch);
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
      invalidatesTags: [{ type: "Tenants", id: "LIST" }],
    }),
    // * Delete Tenants by id
    deleteTenants: builder.mutation<IDeleteTenantResponse, string>({
      query: (id: string) => {
        return {
          url: `/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Tenants", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useCreateTenantsMutation,
  useUpdateTenantsMutation,
  useDeleteTenantsMutation,
} = apiTenantsSlice;
