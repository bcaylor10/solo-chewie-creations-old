import { combineReducers } from '@reduxjs/toolkit';

import siteSlice from './site';

const rootReducer = combineReducers({
    site: siteSlice,
});

export default rootReducer;