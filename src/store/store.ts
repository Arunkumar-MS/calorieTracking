import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import userSlice from "@Reducers/userSlice/userSlice";
import foodDetailSlice from '@Reducers/foodDetailsSlice/foodDetailsSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    user: userSlice,
    foodEntry: foodDetailSlice,
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