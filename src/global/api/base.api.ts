import axios from 'axios';

const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_APP;

export const baseApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': backendUrl,
    'Access-Control-Allow-Headers': 'Authorization, X-Custom-Header',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    mode: 'cors',
  },
});
