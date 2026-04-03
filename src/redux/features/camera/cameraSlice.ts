import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CameraState {
  capturedImageUri: string | null;
  source: "feed" | "product" | "profile" | "cover" | null;
  modalId: string | null; // ADD THIS
}

const initialState: CameraState = {
  capturedImageUri: null,
  source: null,
  modalId: null, // ADD THIS
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setCapturedImage: (
      state,
      action: PayloadAction<{ uri: string; source: "feed" | "product" | "profile" | "cover"; modalId: string }>
    ) => {
      state.capturedImageUri = action.payload.uri;
      state.source = action.payload.source;
      state.modalId = action.payload.modalId; // ADD THIS
    },
    clearCapturedImage: (state) => {
      state.capturedImageUri = null;
      state.source = null;
      state.modalId = null; // ADD THIS
    },
  },
});

export const { setCapturedImage, clearCapturedImage } = cameraSlice.actions;
export default cameraSlice.reducer;