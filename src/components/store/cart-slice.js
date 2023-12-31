import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exsitingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!exsitingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
        exsitingItem.quantity++;
        exsitingItem.totalPrice = exsitingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const exsitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (exsitingItem.quantity === 1) {
        state.item = state.items.filter((item) => item.id !== id);
      } else {
        exsitingItem.quantity--;
        exsitingItem.totalPrice = exsitingItem.totalPrice - exsitingItem.price;
      }
    }
  }
});
export const cartActions = cartSlice.actions;

export default cartSlice;
