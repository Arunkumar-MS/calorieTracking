type Role = 'admin' | 'user' | null;

export interface User {
    name: string;
    userId: string;
    role: Role;
}

export interface Props {
    user: User;
}