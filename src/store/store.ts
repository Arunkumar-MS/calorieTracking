import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import userSlice from "@Reducers/userSlice/userSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;