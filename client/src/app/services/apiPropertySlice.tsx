import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";
import { IProperty, IPropertyPayload } from "../../interfaces";

interface IPropertyResponse {
  message: string;
}
interface ICreatePropertyResponse extends IPropertyResponse {}
interface IDeletePropertyResponse extends IPropertyResponse {}
interface IUpdatePropertyResponse extends IPropertyResponse {}

export const apiPropertySlice = createApi({
  reducerPath: "properties",
  tagTypes: ["Properties"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false, 
  keepUnusedDataFor: 300,  
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/properties/`,
    headers: {
      Authorization: `Bearer ${CookieService.get("access")}`,
    },
  }),

  endpoints: (builder) => ({
    getProperties: builder.query<
      IPropertyPayload,
      { type?: string; sortBy?: string }
    >({
      query: ({ type, sortBy }) => {
        return {
          url: "",
          params: {
            type,
            ordering: sortBy,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.properties.map(
                ({ id }) => ({ type: "Properties", id } as const)
              ),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),
    // * Create Property
    createProperty: builder.mutation<
      ICreatePropertyResponse,
      Partial<IProperty> | FormData
    >({
      query: (property) => {
        return {
          url: `/`,
          method: "POST",
          body: property,
        };
      },
      invalidatesTags: [{ type: "Properties", id: "LIST" }],
    }),
    // * Update Property by id
    updateProperty: builder.mutation<
      IUpdatePropertyResponse,
      { id: string; property: Partial<IProperty> | FormData }
    >({
      query: ({ id, property }) => {
        return {
          url: `/${id}/`,
          method: "PUT",
          body: property,
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) { 
        const patchResult = dispatch(
          apiPropertySlice.util.updateQueryData(
            "getProperties",
            undefined,
            (draft) => {
              const PropertyToUpdate = draft?.properties.find(
                (p) => p.id === id
              );
              if (PropertyToUpdate) {
                Object.assign(PropertyToUpdate, patch);
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
      invalidatesTags: [{ type: "Properties", id: "LIST" }],
    }),
    // * Delete Property by id
    deleteProperty: builder.mutation<IDeletePropertyResponse, string>({
      query: (id: string) => {
        return {
          url: `/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Properties", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = apiPropertySlice;
