import axios from "axios";
import { toast } from 'react-toastify';

const baseURL = "http://localhost:3900/api";
const instance = axios.create({ baseURL });

instance.interceptors.response.use(null, response => {
    const expectedError = response && response.status >= 400 && response.status < 500;
    if (!expectedError) {
        toast.error('An unknown error occurred');
    }

    return Promise.reject(response);
});

export default {
    get: instance.get,
    post: instance.post,
    delete: instance.delete,
    put: instance.put
};
