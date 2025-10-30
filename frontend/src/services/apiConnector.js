import axios from "axios";

// Load base URL from env
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000/api/v1";

// Create an axios instance with the base URL
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Generic API connector
export const apiConnector = async (method, url, bodyData = null, headers = null, params = null) => {
    try {
        const response = await axiosInstance({
            method: method,
            url: url,       // url will be appended to BASE_URL
            data: bodyData,
            headers: headers,
            params: params,
        });
        return response;
    } catch (error) {
        console.error("API CONNECTOR ERROR -->", error);
        throw error;
    }
};
