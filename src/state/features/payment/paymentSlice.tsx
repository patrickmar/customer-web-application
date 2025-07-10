import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentService from "./paymentService";
import { IBank } from "@/app/profile/Interface";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFullLoading: false,
  message: "",
};

// create Bank Card
export const createBankCard = createAsyncThunk(
  "payment/createBankCard",
  async (data: IBank, thunkAPI) => {
    try {
      const res = await paymentService.createBankCard(data);
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch cards
export const fetchCards = createAsyncThunk(
  "payment/fetchCards",
  async (_, thunkAPI) => {
    try {
      return await paymentService.fetchCards();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (value: any, thunkAPI) => {
    try {
      return await paymentService.verifyPayment(
        value.reference,
        value.savecard
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isFullLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBankCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBankCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(createBankCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      })
      .addCase(fetchCards.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      });
  },
});
export const { reset } = paymentSlice.actions;

export default paymentSlice.reducer;
