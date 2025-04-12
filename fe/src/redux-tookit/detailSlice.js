import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryTypeById } from "../services/CategoryTypeServices";
import { getDocumentById } from "../services/DocumentServices";

export const fetchTypeData = createAsyncThunk(
  "detail/fetchTypeData",
  async (id) => {
    const response = await getCategoryTypeById(id);
    return response;
  }
);

export const fetchDocumentData = createAsyncThunk(
  "detail/fetchDocumentData",
  async (documentId) => {
    const response = await getDocumentById(documentId);
    return response;
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    typeData: {},
    documentData: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTypeData.fulfilled, (state, action) => {
        state.typeData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDocumentData.fulfilled, (state, action) => {
        state.documentData = action.payload;
      });
  },
});

export default detailSlice.reducer;