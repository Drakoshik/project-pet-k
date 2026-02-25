import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';
import {
    setAccessToken,
    setRefreshToken,
} from '../store/features/auth/authSlice.ts';
import { store } from '../store/configureStore.ts';

interface CustomAxiosInstance extends AxiosInstance {
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

const apiClient: CustomAxiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    baseURL: 'http://localhost:3000',
}) as CustomAxiosInstance;

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    <T>(response: AxiosResponse<T>): T => {
        return response.data;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            store.dispatch(setAccessToken(''));
            store.dispatch(setRefreshToken(''));
        }
        return Promise.reject(error);
    }
);

export default apiClient;
