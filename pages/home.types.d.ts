type Role = 'admin' | 'user' | null;

export interface User {
    name: string;
    userId: string;
    role: Role;
    calorieLimit: number;
}

export interface Props {
    user: User;
}