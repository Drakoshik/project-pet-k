import { useSelector } from 'react-redux';
import type { RootState } from '../../configureStore.ts';

export const useAuth = () => {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );
    const refreshToken = useSelector(
        (state: RootState) => state.auth.refreshToken
    );
    const isAuthChecked = useSelector(
        (state: RootState) => state.auth.isAuthChecked
    );

    return {
        accessToken,
        refreshToken,
        isAuthChecked,
        isAuthenticated: !!accessToken,
    };
};
