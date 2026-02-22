import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
} from './authTypes.ts';
import apiClient from '../client.ts';

export const authApi = {
    register: (data: RegisterData): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/registration', data);
    },

    login: (credentials: LoginCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/login', credentials);
    },

    refreshToken: (refreshToken: string): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/refreshToken', {
            refreshToken,
        });
    },
};
