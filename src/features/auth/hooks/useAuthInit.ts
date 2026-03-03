import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTokenRefresh } from './useTokenRefresh';
import { jwtDecode } from 'jwt-decode';

export const useAuthInit = () => {
    const navigate = useNavigate();
    const { accessToken, setAuth, logout } = useAuthStore();
    const { scheduleRefresh } = useTokenRefresh();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!token || !refreshToken) {
            // No tokes, user needs to login
            if (window.location.pathname !== '/login') {
                navigate('/login');
            }

            return;
        }

        try {
            const decoded = jwtDecode<{
                exp: number
            }>(token);

            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                //Token expired, try to refresh
                // The API interceptor will handle this on next request
                // Or we could trigger refresh here
                scheduleRefresh(token);
            } else {
                // Token is valid, restore session
                const userDecoded = jwtDecode<{
                    sub: string;
                    email: string;
                    userType: string;
                    roles: string[];
                    permissions: string[];
                }>(token);

                const user = {
                    id: userDecoded.sub,
                    email: userDecoded.email,
                    firstName: '',
                    lastName: '',
                    userType: userDecoded.userType as 'admin',
                    roles: userDecoded.roles,
                    permissions: userDecoded.permissions,
                };

                const expiresIn = Math.floor((decoded.exp * 1000 - Date.now()) / 1000);

                setAuth({
                    accessToken: token,
                    refreshToken: refreshToken,
                    expiresIn: expiresIn > 0 ? expiresIn : 900,
                }, user);

                // Schedule token refresh
                scheduleRefresh(token);

            }
        } catch (error) {
            console.error('Failed to initialize auth: ', error);
            logout();
            navigate('/login');
        }
    }, []);
}