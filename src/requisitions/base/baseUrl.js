import axios from 'axios';

/*For local and https */

export const url = 'http://localhost:80';
export const upload = `${url}/uploads`;
const baseUrl = axios.create({ baseURL: url });

/* For Netlify Build -> Comment the lines above! */

// export const upload = `connect/uploads`;
// const baseUrl = axios.create({ baseURL: 'connect' });

export default baseUrl;
