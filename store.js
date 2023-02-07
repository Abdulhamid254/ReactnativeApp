import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basketSlice';
import restaurantReducer from './features/restaurantSlice';


export const store = configureStore({
    //here we are connecting the basket slice to the overall global store
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});