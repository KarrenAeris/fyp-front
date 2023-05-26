import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  costs: [],
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    formOrder: (state, action) => {
      state.costs = [...action.payload];
    }
  },
})

export const { formOrder } = orderSlice.actions

export default orderSlice.reducer