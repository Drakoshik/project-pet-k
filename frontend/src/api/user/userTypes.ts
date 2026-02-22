export interface UserResponse {
    id: number;
    email: string;
    name: string;
    secondName?: string;
}

export interface UsersResponse {
    users: UserResponse[];
}
