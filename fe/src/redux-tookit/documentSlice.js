import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocuments } from "../services/DocumentServices";

export const getAllDocuments = createAsyncThunk("documents/getAll", async () => {
  const response = await getDocuments();
  return response;
});


const documentSlice = createSlice({
  name: "document",
  initialState: {
    loading: false,
    documents: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(getAllDocuments.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default documentSlice.reducer;
