import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../configureStore.ts';

interface AuthState {
    accessToken: string | null;
    isAuthChecked: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthChecked: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            console.log(action.payload);
            state.accessToken = action.payload;
        },
        clearToken(state) {
            state.accessToken = null;
        },
        setAuthChecked(state, action) {
            state.isAuthChecked = action.payload;
        },
    },
});

export const { setToken, clearToken, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
