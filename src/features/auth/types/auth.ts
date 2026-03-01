export interface User {
    id: string;
    email: string;
    fristName: string;
    lastName: string;
    phone?: string;
    userType: 'admin';
    roles: string[];
    premissions: string[];
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
}

export interface AuthResponse {
    message: string;
    data: AuthTokens;
}

export interface Session {
    id: string,
    deviceInfo: string;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
}

export interface SessionResponse {
    message: string,
    data: Session[];
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}