import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // quotes: {},
  files: [],
}

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes: (state, action) => {
      state.quotes = { ...state.quotes, [action.payload.name]: action.payload.value }
    },
    setQuotesFiles: (state, action) => {
      state.files = [ ...state.files, action.payload ]
    },
    deleteQuotesFiles: (state, action) =>{
      state.files = state.files.filter(e => e.name != action.payload)
    }
  },
})

export const { setQuotes, setQuotesFiles, deleteQuotesFiles } = quotesSlice.actions

export default quotesSlice.reducer