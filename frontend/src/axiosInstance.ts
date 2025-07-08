import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Configuration for the Axios instance
const createAxiosInstance = (): AxiosInstance => {
    // Extract the subdomain from window.location.host (e.g., 'pramakant.localhost:8080' -> 'pramakant')
    const host = window.location.host; // e.g., 'pramakant.localhost:8080'
    const parts = host.split('.');
    const subdomain = parts.length > 2 && parts[0].match(/^[a-zA-Z0-9-]{1,63}$/) ? parts[0] : null;

    // Construct the base URL for the backend API (using port 8888)
    const baseURL = subdomain
        ? `http://${subdomain}.localhost:8888/api` // e.g., 'http://pramakant.localhost:8888/api'
        : 'http://localhost:8888/api'; // Fallback for no subdomain

    const instance = axios.create({
        baseURL,
        timeout: 10000, // 10-second timeout
        headers: {
            'Content-Type': 'application/json',
            // Add 'Authorization' header if using Bearer token
            // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        withCredentials: true, // Enable cookies for CORS with credentials
    });

    // Request interceptor to log or modify requests
    instance.interceptors.request.use(
        (config) => {
            console.log(`Sending request to: ${config.baseURL}${config.url}`);
            return config;
        },
        (error: AxiosError) => {
            console.error('Request error:', error);
            return Promise.reject(error);
        },
    );

    // Response interceptor to handle errors
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            if (error.response?.status === 404) {
                console.error('Admin profile not found:', error.response.data);
            } else if (error.response?.status === 403) {
                console.error('CORS or authorization error:', error.response.data);
            } else {
                console.error('API error:', error.message);
            }
            return Promise.reject(error);
        },
    );

    return instance;
};
export default createAxiosInstance;