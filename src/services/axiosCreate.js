import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APIURL;
//'http://localhost:8080/api';
console.log(`BASE_URL = ${BASE_URL}`)

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});