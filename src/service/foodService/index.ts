import { FoodEntry } from "@Pages/addFood.types";
import axios from "@Service/core/axios";

export const saveFoodEntry = (data: FoodEntry) => {
    return axios
        .post('/tracker/addFood', { ...data })
}

export const editFoodEntry = (data: FoodEntry) => {
    return axios
        .post('/tracker/editUserFoodEntry', { ...data })
}

export const deleteFoodEntry = (data: FoodEntry) => {
    return axios
        .post('/tracker/deleteUserFoodEntry', { ...data })
}

export const addOtherUserFoodEntry = (data: FoodEntry) => {
    return axios
        .post('/tracker/addOtherUserFoodEntry', { ...data })
}

