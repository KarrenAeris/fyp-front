import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import { quotesSlice } from './slices/quotesSlice'
import { orderSlice } from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    quotes: quotesSlice.reducer,
    order: orderSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})