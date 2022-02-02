import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@Store/store';
import { FoodEntry } from '@Pages/addFood.types';
import startOfDay from 'date-fns/startOfDay';
import getUnixTime from "date-fns/getUnixTime";

interface State {
    foodEntryList: FoodEntry[] | [];
    allFoodEntryList: FoodEntry[] | [];
}

const initialState: State = {
    foodEntryList: [],
    allFoodEntryList: [],
};

const foodDetailSlice = createSlice({
    name: 'foodDetail',
    initialState,

    reducers: {
        updateEntry: (state, action: PayloadAction<FoodEntry[]>) => {
            const { payload } = action;
            state.foodEntryList = payload;
        },
        updateAllFoodEntry: (state, action: PayloadAction<FoodEntry[]>) => {
            const { payload } = action;
            state.allFoodEntryList = payload;
        },
        resetfoodDetailsStore: (state) => {
           state.foodEntryList = [];
           state.allFoodEntryList = [];
        },
    },
});

export const {
    updateAllFoodEntry,
    updateEntry,
    resetfoodDetailsStore,
} = foodDetailSlice.actions;

export const selectFoodEntryList = (state: RootState) => state.foodEntry.foodEntryList

export const selectAllFoodEntryList = (state: RootState) => state.foodEntry.allFoodEntryList;

export const selectTodaysEntryList = (state: RootState) => {
    const startOfTheDay = getUnixTime(startOfDay(new Date()));
    return state.foodEntry.foodEntryList.filter((item)=> item.addedDate >= startOfTheDay);
}




export default foodDetailSlice.reducer;