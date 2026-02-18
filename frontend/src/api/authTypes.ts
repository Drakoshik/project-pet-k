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
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MTM0MzIyMSwiZXhwIjoxNzcxOTQ4MDIxfQ.simX3SpiTw1s2E9nRHmr85d7qabFB3h7tQVBllTrWqA';
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MTM0MzIyMSwiZXhwIjoxNzczOTM1MjIxfQ.MwXtYIgCsYwzVbYh59BtM_qfd8pPvNXSZgWgkrM9ofo';
    };
}
