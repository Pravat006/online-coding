import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Configuration objects with proper typing
const formdataConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
};

const jsonConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};

const defaultConfig: AxiosRequestConfig = {
    withCredentials: true,
};

// Create axios instance
const axioInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

// Improved response type with error handling
interface ApiResponse<T> {
    data: T | undefined;
    error?: string;
    statusCode?: number;
}

class Axios {
    async get<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axioInstance.get<T>(url, defaultConfig);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error as AxiosError<T>);
        }
    }

    async post<T>(url: string, data: Record<string, unknown> | FormData = {}): Promise<ApiResponse<T>> {
        try {
            const config = data instanceof FormData ? formdataConfig : jsonConfig;
            const response: AxiosResponse<T> = await axioInstance.post<T>(url, data, config);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error as AxiosError<T>);
        }
    }

    async patch<T>(url: string, data: Record<string, unknown> | FormData): Promise<ApiResponse<T>> {
        try {
            const config = data instanceof FormData ? formdataConfig : jsonConfig;
            const response: AxiosResponse<T> = await axioInstance.patch<T>(url, data, config);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error as AxiosError<T>);
        }
    }

    async delete<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axioInstance.delete<T>(url, defaultConfig);
            return { data: response.data };
        } catch (error) {
            return this.handleError<T>(error as AxiosError<T>);
        }
    }

    private handleError<T>(error: AxiosError<T>): ApiResponse<T> {
        console.error(`API Error: ${error.message}`);
        return {
            error: error.message,
            statusCode: error.response?.status,
            data: error.response?.data as T | undefined
        };
    }
}

export default new Axios();
