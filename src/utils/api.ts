import axios from "axios";
import { BASE_URL } from "../constants";

export const apiCall = async (
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body?: object
) => {
    try {
        return await axios({
            url: BASE_URL + path,
            method,
            data: body,
            withCredentials: true,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};