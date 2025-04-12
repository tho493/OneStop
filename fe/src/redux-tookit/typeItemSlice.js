import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTypeItem } from "../services/TypeItemServices";

export const getAllTypeItem = createAsyncThunk("getType/getAllTypeItem", async() => {
    const response = await getTypeItem();
    return response;
})

const typeItemSlice = createSlice({
    name: 'typeItem',
    initialState: {
        loading: false,
        typeItems: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTypeItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTypeItem.fulfilled, (state, action) => {
                state.typeItems = action.payload;
                state.loading = false;
            })
            .addCase(getAllTypeItem.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default typeItemSlice.reducer