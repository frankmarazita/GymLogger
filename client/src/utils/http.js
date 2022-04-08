import axios from 'axios';
import session from './session';
import config from '../config/config';

const API_URL = process.env.REACT_APP_API_URL

const preRoute = config.routes.preRoute;

axios.interceptors.request.use((conf) => {
    const token = session.getToken()
    if (token) {
        conf.headers.authorization = `Bearer ${token}`
    }
    return conf;
}, (error) => Promise.reject(error));

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            if (window.location.pathname === '/edit/account/password') {
                return Promise.reject(error);
            } else if (window.location.pathname === '/login') {
                return Promise.reject(error);
            } else if (window.location.pathname === '/edit/account/two-factor') {
                return Promise.reject(error);
            }
            session.deleteToken();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        if (error.response.config.method === 'get') {
            if (error.response.status === 403) {
                window.location.href = '/error/403';
            } else if (error.response.status === 404) {
                window.location.href = '/error/404';
            }
        }
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = API_URL + preRoute;

export default axios;