// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';

import siteSlice from './site';
import cartSlice from './cart';

const rootReducer = combineReducers({
    site: siteSlice,
    cart: cartSlice
});

export default rootReducer;