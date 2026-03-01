import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/v1';

export const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

//Request interceptor to add auth token to headers
apiClient.interceptors.request.use(
    (config) => {
        //Get token from local storage or state management
        const token = localStorage.getItem('accessToken');

        if(token && config.headers){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

//Response interceptor to handle errors globally
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry? : boolean};
        
        //If 401 Unauthorized error and request has not been retried yet
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if(!refreshToken){
                    throw new Error('No refresh token available');
                }

                //Call API to refresh tokens
                const response = await axios.post(`${BASE_URL}/auth/admin/refresh`, {
                    refreshToken,
                }, {
                    headers: {
                        'x-device-info': navigator.userAgent || 'Web/Desktop',
                    }
                });

                const {accessToken, refreshToken: newRefreshToken } = response.data.data;
                // Store new tokens in local storage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Retry original request
                if(originalRequest.headers){
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return apiClient(originalRequest);
            }

            catch(refreshError){
                //If token refresh fails, clear tokens and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const get = <T>(url: string, config?: AxiosRequestConfig) => apiClient.get<T>(url, config);
export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => apiClient.post<T>(url, data, config);
export const patch = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
  apiClient.patch<T>(url, data, config);
export const del = <T>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T>(url,config);