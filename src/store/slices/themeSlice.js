import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: "light" },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;

      document.body.classList.remove("bg-light", "text-dark", "bg-dark", "text-light");

      if(action.payload === "light") {
        document.body.classList.add("bg-light", "text-dark");
      } else if(action.payload === "dark") {
        document.body.classList.add("bg-dark", "text-light");
      }
    },
  },
})

export const { setTheme } = themeSlice.actions
export const selectTheme = (state) => state.theme.theme
export default themeSlice.reducer
