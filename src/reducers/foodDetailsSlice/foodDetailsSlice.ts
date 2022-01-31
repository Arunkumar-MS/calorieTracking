import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@Store/store';
import { FoodEntry } from '@Pages/addFood.types';

interface State {
    foodEntryList: FoodEntry[] | [];
}

const initialState: State = {
    foodEntryList: [],
};

const foodDetailSlice = createSlice({
    name: 'foodDetail',
    initialState,

    reducers: {
        updateEntry: (state, action: PayloadAction<FoodEntry[]>) => {
            const { payload } = action;
            state.foodEntryList = payload;
        },
        remove: (state, action: PayloadAction<FoodEntry[]>) => {
            const { payload } = action;
            state.foodEntryList = payload;
        },
    },
});

export const {
    updateEntry,
    remove,
} = foodDetailSlice.actions;

export const selectFoodEntryList = (state: RootState) => state.foodEntry.foodEntryList

export default foodDetailSlice.reducer;