import { RootState } from "@/app/store";
import axiosInstance from "@/config";
import { IErrorResponse } from "@/interfaces";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { connectionType } from "@/schema";
import { showToast } from "@/utils/toastUtils";

interface registerState {
  loading: boolean;
  message: string | null;
  error: string | null;
}
const initialState: registerState = {
  loading: false,
  message: null,
  error: null,
};

export const userRegister = createAsyncThunk<
  string,
  connectionType,
  { rejectValue: string }
>("register/userRegister", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axiosInstance.post("/user/register/", user);
    return data.message;
  } catch (error) {
    const err = error as AxiosError<IErrorResponse>;
    const errorMessage = err.response?.data?.detail || "server error";
    return rejectWithValue(errorMessage);
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        userRegister.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
          state.error = null;
          showToast({ message: action.payload, type: "success" });
        }
      )
      .addCase(
        userRegister.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.message = null;
          state.error = action.payload ?? "Unknown error occurred";
          showToast({ message: state.error, type: "error" });
        }
      );
  },
});

export const registerSelector = ({ register }: RootState) => register;
export default registerSlice.reducer;
