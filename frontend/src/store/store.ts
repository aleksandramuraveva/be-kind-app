import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import goodDeedsReducer from './goodDeedsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
     goodDeeds: goodDeedsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
