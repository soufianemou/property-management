import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/connexion/loginSlice";
import lregisterReducer from "./features/connexion/registerSlice";
import { useDispatch } from "react-redux";
import { apiPropertySlice } from "./services/apiPropertySlice";
import { apiTenantsSlice } from "./services/apiTenantsSlice";
import { apiPayementSlice } from "./services/apiPayementSlice";
 
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: lregisterReducer,
    [apiPropertySlice.reducerPath]: apiPropertySlice.reducer,
    [apiTenantsSlice.reducerPath]: apiTenantsSlice.reducer,
    [apiPayementSlice.reducerPath]: apiPayementSlice.reducer,
  },
  // cache, polling, invalidate cache
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiPropertySlice.middleware,
      apiTenantsSlice.middleware,
      apiPayementSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
