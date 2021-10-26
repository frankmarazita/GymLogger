import axios from 'axios';
import session from './session';

const API_URL = process.env.REACT_APP_API_URL

const preRoute = '/api'

axios.interceptors.request.use((config) => {
    config.url = preRoute + config.url
    const token = session.getToken()
    if (token) {
        config.headers.token = token;
    }
    return config;
}, (error) => Promise.reject(error));

axios.defaults.baseURL = API_URL;

export default axios;