import axios from "axios";
import { toast } from "react-toastify";
import { func } from "prop-types";

const baseURL = "http://localhost:3900/api";
const instance = axios.create({ baseURL });

instance.interceptors.response.use(null, (data) => {
    const expectedError =
        data.response && data.response.status >= 400 && data.response.status < 500;
    if (!expectedError) {
        toast.error("An unknown error occurred");
    }

    return Promise.reject(data);
});

function setAuthToken(jwt) {
    instance.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: instance.get,
    post: instance.post,
    delete: instance.delete,
    put: instance.put,
    setAuthToken
};
