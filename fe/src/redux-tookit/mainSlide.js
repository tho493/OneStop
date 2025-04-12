import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const filterMain = createAsyncThunk(
  "filter/filterMain",
  async ({ data, searchText }) => {
    console.log(data)
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    return filteredData;
  }
);

const MainSlice = createSlice({
  name: "main",
  initialState: {
    loading: false,
    filteredData: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterMain.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterMain.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredData = action.payload;
      })
      .addCase(filterMain.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default MainSlice.reducer;