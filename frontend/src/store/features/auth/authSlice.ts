import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthChecked: boolean;
}

const loadTokensFromLocalStorage = (): Partial<AuthState> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        console.log('Local storage token:', {
            accessToken: accessToken,
            refreshToken: refreshToken,
        });

        return {
            accessToken: accessToken || null,
            refreshToken: refreshToken || null,
        };
    } catch (error) {
        console.error(error);
        return {};
    }
};

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isAuthChecked: false,
    ...loadTokensFromLocalStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action) {
            console.log(`Setting access token: ${action.payload}`);
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        clearAccessToken(state) {
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },
        setRefreshToken(state, action) {
            console.log(`Setting refresh token: ${action.payload}`);
            state.refreshToken = action.payload;
            localStorage.setItem('refreshToken', action.payload);
        },
        clearRefreshToken(state) {
            state.refreshToken = null;
        },
        setAuthChecked(state, action) {
            state.isAuthChecked = action.payload;
            localStorage.removeItem('refreshToken');
        },
    },
});

export const {
    setRefreshToken,
    clearRefreshToken,
    setAuthChecked,
    clearAccessToken,
    setAccessToken,
} = authSlice.actions;
export default authSlice.reducer;
