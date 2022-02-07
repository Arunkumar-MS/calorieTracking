import { Role } from "@Pages/home.types"
import axios from "@Service/core/axios"

export interface AddUser {
    name: string;
    emailId: string;
    createdDate: number;
    token?: string;
    calorieLimit: number;
    password?: string
    role: Role;
}

export const createUser = (data: AddUser) => {
    return axios
        .post('/user/addUser', { ...data })
}