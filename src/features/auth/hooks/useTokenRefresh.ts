import { useEffect, useRef } from "react";
import { useAuthStore } from "../stores/authStore";
import { jwtDecode } from "jwt-decode";
import { authApi } from "../api/authApi";

const TOKEN_REFRESH_BUFFER = 60 * 1000; // 1 minute

export const useTokenRefresh = () => {
    const { accessToken, refreshToken, setAuth } = useAuthStore();
    const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    const scheduleRefresh = (token: string) => {
        try {
            const decoded = jwtDecode<{ exp: number }>(token);
            const currentTime = Date.now();
            const expiryTime = decoded.exp * 1000;
            const timeUntilExpiry = expiryTime - currentTime;

            // Schedule the refresh a bit before the token expires
            const refreshTime = timeUntilExpiry - TOKEN_REFRESH_BUFFER;

            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            if (refreshTime <= 0) {
                // Token already expired or about to expire — refresh immediately
                performRefresh();
                return;
            }

            // Schedule refresh for when the token is about to expire
            refreshTimeoutRef.current = setTimeout(() => {
                performRefresh();
            }, refreshTime);
        } catch (error) {
            console.error("Failed to decode token: ", error);
        }
    };

    const performRefresh = async () => {
        const currentRefreshToken = useAuthStore.getState().refreshToken;
        if (!currentRefreshToken) {
            console.error('No refresh token available');
            return;
        }

        try {
            const response = await authApi.refreshToken(currentRefreshToken);
            const { accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn } = response.data.data;

            const decoded = jwtDecode<{
                sub: string;
                email: string;
                userType: string;
                roles: string[];
                permissions: string[];
            }>(newAccessToken);

            const user = {
                id: decoded.sub,
                email: decoded.email,
                firstName: '', // You can extract this from the token if available
                lastName: '', // You can extract this from the token if available
                userType: decoded.userType as 'admin',
                roles: decoded.roles,
                permissions: decoded.permissions,
            };

            setAuth({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn,
            }, user);

            // Schedule the next refresh
            scheduleRefresh(newAccessToken);
        } catch (error) {
            console.error("Token refresh error: ", error);

            // Don't Logout immediately, let the API interceptor handle 401s
        }
    };

    useEffect(() => {
        if (accessToken) {
            scheduleRefresh(accessToken);
        }

        // Cleanup on unmount
        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, [accessToken]);

    return { scheduleRefresh };
}
