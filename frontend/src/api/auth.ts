import axios from 'axios';
import type {LoginDto} from '../types/auth';

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const login = async (dto: LoginDto) => {
    const res = await API.post('/auth/login', dto);
    return res.data;
};

export const register = async (dto: LoginDto) => {
    const res = await API.post('/auth/register', dto);
    return res.data;
};
