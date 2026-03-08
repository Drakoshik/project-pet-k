import apiClient from '../client.ts';
import type { UsersResponse } from './userTypes.ts';

export const userApi = {
    getUsers: (): Promise<UsersResponse> => {
        return apiClient.get<UsersResponse>('/users');
    },
};
