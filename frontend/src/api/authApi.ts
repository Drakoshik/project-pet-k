import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
} from './authTypes.ts';
import apiClient from './client.ts';

export const authApi = {
    register: (data: RegisterData) =>
        apiClient.post<AuthResponse>('/auth/registration', data),

    login: (credentials: LoginCredentials) =>
        apiClient.post<AuthResponse>('/auth/login', credentials),

    // logout: () => apiClient.post('/auth/logout'),

    refreshToken: (email: string) =>
        apiClient.post('/auth/refreshToken', { email }),
};
