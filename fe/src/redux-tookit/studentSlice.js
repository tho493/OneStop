import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentsServices } from "../services/StudentServices";

export const getAllStudents = createAsyncThunk("students/getAll", async () => {
  const response = await StudentsServices();
  return response;
});

export const createStudents = createAsyncThunk("students/createStudents", async() => {
  
})

const studentSlice = createSlice({
  name: "student",
  initialState: {
    loading: false,
    students: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default studentSlice.reducer;
