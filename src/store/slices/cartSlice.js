import { createSlice ,createSelector} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {

    addToCart: (state, action) => {
      const meal = action.payload;
      const existing = state.items.find((item) => item.id === meal.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...meal, quantity: 1 });
      }
    },


    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },


    increment: (state, action) => {
      const id = action.payload;
      const meal = state.items.find((item) => item.id === id);
      if (meal) meal.quantity += 1;
    },


    decrement: (state, action) => {
      const id = action.payload;
      const meal = state.items.find((item) => item.id === id);
      if (meal && meal.quantity > 1) {
        meal.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },


    reset: (state, action) => {
      const id = action.payload;
      const meal = state.items.find((item) => item.id === id);
      if (meal) meal.quantity = 1;
    },
    clearCart: (state) => {
      state.items = [];
    },

  },
});

export const { addToCart, removeFromCart, increment, decrement, reset, clearCart } =
  cartSlice.actions;

//  Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export default cartSlice.reducer;