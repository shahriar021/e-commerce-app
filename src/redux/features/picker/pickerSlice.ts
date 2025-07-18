import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPicker = {
  openPickerId: string | null;
};

const initialState: TPicker = {
  openPickerId: null, // No picker open initially
};

const pickerSlice = createSlice({
  name: "picker",
  initialState,
  reducers: {
    alterOverlay: (state, action: PayloadAction<string | null>) => {
      // Toggle the currently open picker
      state.openPickerId =
        state.openPickerId === action.payload ? null : action.payload;
    },
  },
});

export const { alterOverlay } = pickerSlice.actions;
export default pickerSlice.reducer;