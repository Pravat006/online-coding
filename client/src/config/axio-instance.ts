import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// Define our own interface for Axios errors
interface AxiosErrorResponse<T> {
    status?: number;
    data?: T | undefined;
}

interface AxiosErrorType extends Error {
    response?: AxiosErrorResponse<unknown>;
    isAxiosError?: boolean;
}


export interface ApiResponse<T> {
    data: T | undefined;
    error?: string;
    statusCode?: number;
}

const formdataConfig = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
};

const jsonConfig = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
};

const defaultConfig = {
    withCredentials: true,
};

const axioInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

// Add a request interceptor to include auth state in headers
axioInstance.interceptors.request.use(
    (config) => {
        const authState = useAuthStore.getState();
        // Only add this header if we have auth state
        if (authState.isAuthenticated && authState.user) {
            config.headers = config.headers || {};
            // Add a custom header that indicates we're already authenticated
            // This allows the backend to skip redundant session checks
            config.headers["X-Auth-Status"] = "authenticated";
            config.headers["X-User-ID"] = authState.user.id;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors and retry requests
axioInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore.getState();


        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/user/data')
        ) {
            originalRequest._retry = true;

            try {
                // If we're already in the process of checking auth, don't trigger another check
                if (!authStore.isLoading) {
                    await authStore.checkAuth();
                }

                // Only retry if authentication was successful
                if (authStore.isAuthenticated && authStore.user) {
                    // Add auth headers to the retried request
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers["X-Auth-Status"] = "authenticated";
                    originalRequest.headers["X-User-ID"] = authStore.user.id;

                    // Retry the original request with the new auth
                    return axioInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Auth refresh failed:", refreshError);
            }
        }

        return Promise.reject(error);
    }
);

class AxiosService {
    async get<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await axioInstance.get<T>(url, defaultConfig);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    async post<T>(url: string, data: Record<string, unknown> | FormData = {}): Promise<ApiResponse<T>> {
        try {
            const config = data instanceof FormData ? formdataConfig : jsonConfig;
            const response = await axioInstance.post<T>(url, data, config);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    async patch<T>(url: string, data: Record<string, unknown> | FormData): Promise<ApiResponse<T>> {
        try {
            const config = data instanceof FormData ? formdataConfig : jsonConfig;
            const response = await axioInstance.patch<T>(url, data, config);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    async delete<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await axioInstance.delete<T>(url, defaultConfig);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error);
        }
    }

    private handleError<T>(error: unknown): ApiResponse<T> {
        if (error instanceof Error) {
            console.error(`API Error: ${error.message}`);

            // Handle axios error
            const axiosError = error as AxiosErrorType; // Cast to our custom type
            return {
                error: error.message,
                statusCode: axiosError.response?.status,
                data: axiosError.response?.data as T | undefined,
            };
        }

        return {
            error: 'Unknown error occurred',
            data: undefined
        };
    }
}

export default new AxiosService();
