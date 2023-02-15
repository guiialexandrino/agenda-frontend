import axios from 'axios';

export const url = 'http://localhost:80';
export const upload = `${url}/uploads`;

const baseUrl = axios.create({ baseURL: url });

export default baseUrl;
