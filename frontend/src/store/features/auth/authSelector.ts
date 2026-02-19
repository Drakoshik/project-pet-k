import { useSelector } from 'react-redux';

export const useAuth = () => {
    const accessToken = useSelector((state: any) => state.auth.accessToken);
    const isAuthChecked = useSelector((state: any) => state.auth.isAuthChecked);

    return {
        accessToken,
        isAuthChecked,
        isAuthenticated: !!accessToken,
    };
};
