import axios from 'axios';
import session from './session';

const API_URL = process.env.REACT_APP_API_URL

const preRoute = '/api';

axios.interceptors.request.use((config) => {
    const token = session.getToken()
    if (token) {
        config.headers.token = token;
    }
    return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            session.deleteToken();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        } else if (error.response.status === 403) {
            window.location.href = '/error/403';
        } else if (error.response.status === 404) {
            window.location.href = '/error/404';
        }
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = API_URL + preRoute;

export default axios;