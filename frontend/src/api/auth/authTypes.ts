export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    secondName?: string;
}

export interface AuthResponse {
    success: true;
    data: {
        accessToken: '';
        refreshToken: '';
    };
}
