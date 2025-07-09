import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Configuration for the Axios instance
const createAxiosInstance = (): AxiosInstance => {
    // hostname (e.g., 'pramakant.localhost' or 'localhost')
    // Extract the host (e.g., 'pramakant.localhost:8080' or 'localhost:8080')
    const host = window.location.hostname; // e.g., 'pramakant.localhost' or 'localhost'
    const parts = host.split('.');
    // Consider a subdomain if host has at least two parts and first part is not 'localhost'
    const subdomain = parts.length >= 2 && parts[0] !== 'localhost' && parts[0].match(/^[a-zA-Z0-9-]{1,63}$/)
        ? parts[0]
        : null;

    console.log(`Detected host: ${host}`);
    console.log(`Detected subdomain: ${subdomain}`);

    // Construct the base URL for the backend API (using port 8888)
    const baseURL = `http://127.0.0.1:8888/api`
    const instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            ...(subdomain && { 'x-subdomain': subdomain }),
          },
        withCredentials: true,
    });

    // Request interceptor
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

    // Response interceptor
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