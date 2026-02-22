import { useSelector } from 'react-redux';

export const useAuth = () => {
    const accessToken = useSelector((state: any) => state.auth.accessToken);
    const refreshToken = useSelector((state: any) => state.auth.refreshToken);
    const isAuthChecked = useSelector((state: any) => state.auth.isAuthChecked);

    return {
        accessToken,
        refreshToken,
        isAuthChecked,
        isAuthenticated: !!accessToken,
    };
};
