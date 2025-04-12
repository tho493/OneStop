import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfo, login } from "../services/AuthServices";

export const loginAuth = createAsyncThunk("login/loginAuth", async({params, messageApi, navigate}) => {
    const response = await login(params);
    if (response.token) {
      localStorage.setItem("token", response.token);
      if(response.type === "admin") {
        navigate("/admin");
      } else if(response.type === "user") {
        navigate("/");
      }
      return response;
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
})

export const getInfoUser = createAsyncThunk("login/getInfoUser", async(_, {rejectWithValue}) => {
  const token = localStorage.getItem("token");
  if(token) {
    const response = await getInfo(token);
    return response.json();
  }
  return rejectWithValue('Token không tồn tại');
})

export const checkAuth = createAsyncThunk("login/checkAuth", async() => {
  const token = localStorage.getItem("token");
  if(token) {
    return true;
  } else {
    return false;
  }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        type: "",
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.type = action.payload.type;
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
                localStorage.removeItem("token");
            })
            .addCase(checkAuth.pending, (state) => {
              state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
              state.loading = false;
              state.isAuthenticated = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
              state.isAuthenticated =  action.payload;
              localStorage.removeItem("token");
            })
            .addCase(getInfoUser.pending, (state) => {
              state.loading = true;
            })
            .addCase(getInfoUser.fulfilled, (state, action) => {
              state.loading = false;
              state.user = action.payload;
            })
            .addCase(getInfoUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
    }
})

export default authSlice.reducer;