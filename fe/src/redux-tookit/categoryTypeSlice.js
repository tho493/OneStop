import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoryType } from "../services/CategoryTypeServices";

export const getAllCategoryType = createAsyncThunk("categoryType/getCategoryType", async () => {
    const response = await getCategoryType();
    return response;
  }
);

const categoryTypeSlice = createSlice({
  name: "categoryType",
  initialState: {
    loading: false,
    categoryTypes: [],
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAllCategoryType.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllCategoryType.fulfilled, (state, action) => {
            state.categoryTypes = action.payload;
            state.loading = false;
        })
        .addCase(getAllCategoryType.rejected, (state) => {
            state.loading = false;
        })
  },
});

export default categoryTypeSlice.reducer;
