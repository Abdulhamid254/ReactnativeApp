import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //our initial global state here is an empty array
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        //findind the item in the basket that matches with the ID
        (item) => item.id === action.payload.id
      );
       //creating copy of the basket
      let newBasket = [...state.items];
       //modifying the basket
      if (index >= 0) {
        newBasket.splice(index,1);
      } else {
        console.warn(
            `Cant remove product(id : ${action.payload.id}) as its not in basket`
        );
      }
      //replacing the removed basket with the new basket
      state.items = newBasket;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions
//the selector here helps us to acess the global store hence pulling the items out of the basket
export const selectBasketItems = (state) => state.basket.items;

//creating some sort of filter fxn to help us with increase a specific row only on our basket
export const selectBasketItemsWithId = (state, id) =>
    state.basket.items.filter((item)=> item.id === id);
    //another helper function to help us with the totalling of the price
    export const selectBasketTotal = (state) => state.basket.items.reduce((total,item)=>
     total += item.price,0)

export default basketSlice.reducer