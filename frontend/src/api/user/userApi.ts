import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
} from '../auth/authTypes.ts';
import apiClient from '../client.ts';
import type { UserResponse, UsersResponse } from './userTypes.ts';

export const userApi = {
    getUsers: (): Promise<UsersResponse> => {
        return apiClient.get<UsersResponse>('/users');
    },
};
