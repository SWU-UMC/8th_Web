import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  onConfirm: (() => void) | null;
}

const initialState: ModalState = {
  isOpen: false,
  onConfirm: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<() => void>) => {
      state.isOpen = true;
      state.onConfirm = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.onConfirm = null;
    },
    confirmModal: (state) => {
      if (state.onConfirm) {
        state.onConfirm();
      }
      state.isOpen = false;
      state.onConfirm = null;
    },
  },
});

export const { openModal, closeModal, confirmModal } = modalSlice.actions;

export default modalSlice.reducer;