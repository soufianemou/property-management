import { RootState } from "@/app/store";
import axiosInstance from "@/config";
import { IErrorResponse, ILoginPayload } from "@/interfaces";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { connectionType } from "@/schema";

interface loginState {
  loading: boolean;
  data: ILoginPayload | null;
  error: string | null;
}
const initialState: loginState = {
  loading: false,
  data: null,
  error: null,
};

export const userLogin = createAsyncThunk<
  ILoginPayload,
  connectionType,
  { rejectValue: string }
>("login/userLogin", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axiosInstance.post("/login/", user);
    return data;
  } catch (error) {
    const err = error as AxiosError<IErrorResponse>;
    const errorMessage = err.response?.data?.detail || "server error";
    return rejectWithValue(errorMessage);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<ILoginPayload>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(
        userLogin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.data = null;
          state.error = action.payload ?? "Unknown error occurred";
        }
      );
  },
});

export const loginSelector = ({ login }: RootState) => login;
export default loginSlice.reducer;
