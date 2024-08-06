import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    text: "",
  },
  reducers: {
    changeTextFilter(state, action) {
      state.text = action.payload;
    },
  },
});

export const selectTextFilter = (state) => state.filters.text;

export const { changeTextFilter } = slice.actions;

export default slice.reducer;
