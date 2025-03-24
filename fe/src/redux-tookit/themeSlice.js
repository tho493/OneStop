import { createSlice } from "@reduxjs/toolkit";

const themes = ["light", "dark"];

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: themes[0],
    themes,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === themes[0] ? themes[1] : themes[0];
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;