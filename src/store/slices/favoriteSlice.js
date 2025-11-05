import { createSlice } from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { items: [] },
  reducers: {
    addToFavorite: (state, action) => {
      const meal = action.payload;

      const exists = state.items.find(item => item.id === meal.id);
      if (!exists) {
        state.items.push(meal); 
      }

    },
    removeFromFavorite: (state, action) => {

      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
})

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export const selectFavoriteItems = (state) => state.favorite.items;

export default favoriteSlice.reducer;
