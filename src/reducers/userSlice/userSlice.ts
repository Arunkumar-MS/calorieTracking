import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@Store/store';
import { User } from '@Pages/home';


const initialState: User = {
    name: '',
    role: null,
    userId: '',
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
        },
        remove: state => {
            state = initialState;
        },

    },
});

export const {
    updateUser,
    remove,
} = counterSlice.actions;

export const selectName = (state: RootState) => state.user.name;
export const selectUser = (state: RootState) => state.user;
export const selectRole = (state: RootState) => state.user.role; 

export default counterSlice.reducer;