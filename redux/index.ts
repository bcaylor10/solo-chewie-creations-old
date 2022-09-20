// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';

import siteSlice from './site';
import cartSlice from './cart';
import userSlice from './user';

const rootReducer = combineReducers({
    site: siteSlice,
    cart: cartSlice,
    user: userSlice
});

export default rootReducer;