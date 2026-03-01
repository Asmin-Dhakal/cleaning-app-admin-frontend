import { apiClient } from "../../../shared/api/apiClient";
import type {
    LoginCredentials,
    SignupData,
    AuthResponse,
    SessionResponse,
} from '../types/auth.ts';

const BASE_URL ='/auth/admin';

export const authApi = {
    // Register new admin user
    register: (data: SignupData) => apiClient.post<AuthResponse>(`${BASE_URL}/register`,data,{
        headers: {
            'x-device-info': navigator.userAgent || 'Web/Desktop',
        },
    }),
    
    // Login Admin user
    login: (credentials: LoginCredentials) => apiClient.post<AuthResponse>(`${BASE_URL}/login`, credentials,{
        headers: {
            'x-device-info': navigator.userAgent || 'Web/Desktop',
        },
    }),

    // Refresh access token using refresh token
    refreshToken: (refreshToken: string) => apiClient.post<AuthResponse>(`${BASE_URL}/refresh`,
        {refreshToken},
        {
            headers: {
                'x-device-info': navigator.userAgent || 'Web/Desktop',
            },
        }
    ),

    // Logout current session by invalidating refresh token
    logout: (accessToken: string, refreshToken: string) => apiClient.post(`${BASE_URL}/logout`,
        {refreshToken},
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type' : 'application/json',
            },
        }
    ),

    // Get all active sessions for the logged in user
    getSessions: (accessToken: string) => apiClient.get<SessionResponse>(`${BASE_URL}/sessions`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }),
};