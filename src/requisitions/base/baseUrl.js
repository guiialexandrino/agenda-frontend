import axios from 'axios';

export const url = 'http://localhost:3333';
export const upload = `${url}/uploads`;

const baseUrl = axios.create({ baseURL: url });

export default baseUrl;
