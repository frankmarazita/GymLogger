import axios from 'axios';
import session from './session';

const API_URL = process.env.REACT_APP_API_URL

axios.interceptors.request.use((config) => {
    const token = session.getToken()
    if (token) {
        config.headers.token = token;
    }
    return config;
}, (error) => Promise.reject(error));

axios.defaults.baseURL = API_URL;

export default axios;