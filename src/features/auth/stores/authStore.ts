import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, AuthTokens, AuthState } from '../types/auth';

interface AuthStore extends AuthState {
    // Actions
    setAuth: (tokens: AuthTokens, user: User) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;

    // Getters
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,

            // Set full auth data (login/register success)
            setAuth: (tokens, user) => {
                // Store in localStorage for API client
                localStorage.setItem('accessToken', tokens.accessToken);
                localStorage.setItem('refreshToken', tokens.refreshToken);

                set({
                    user,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            // Update access token (after refresh)
            setAccessToken: (accessToken) => {
                localStorage.setItem('accessToken', accessToken);
                set({ accessToken });
            },

            // Update refresh token
            setRefreshToken: (refreshToken) => {
                localStorage.setItem('refreshToken', refreshToken);
                set({ refreshToken });
            },

            // Logout - clear everything
            logout: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            // Set loading state
            setLoading: (isLoading) => set({ isLoading }),

            // Getters for tokens
            getAccessToken: () => get().accessToken || localStorage.getItem('accessToken'),
            getRefreshToken: () => get().refreshToken || localStorage.getItem('refreshToken'),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);