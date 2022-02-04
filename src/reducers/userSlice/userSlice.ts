import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@Store/store';
import { User } from '@Pages/home.types';
import { DEFAULT_CALORIES_LIMIT } from 'src/constant/config';


const initialState: User = {
    name: '',
    role: null,
    userId: '',
    calorieLimit: DEFAULT_CALORIES_LIMIT,
};

export const counterSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            const { payload } = action;
            state.name = payload.name;
            state.role = payload.role;
            state.userId = payload.userId;
            state.calorieLimit = Number(payload.calorieLimit);
        },
        resetUserStore: state => {
            state.name = '';
            state.role = null;
            state.userId = '';
            state.calorieLimit = DEFAULT_CALORIES_LIMIT;
        },

    },
});

export const {
    updateUser,
    resetUserStore,
} = counterSlice.actions;

export const selectName = (state: RootState) => state.user.name;
export const selectUser = (state: RootState) => state.user;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectRole = (state: RootState) => state.user.role; 
export const selectCalorieLimit = (state: RootState) => state.user.calorieLimit; 

export default counterSlice.reducer;