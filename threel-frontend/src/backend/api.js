import axios from 'axios';

const threel_api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
});

export default threel_api;
