import http from '../base/baseUrl.js';
import localforage from 'localforage';

export default {
  async register(data) {
    const path = '/enter/register';
    let req = '';
    try {
      req = await http.post(path, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async login(data) {
    const path = '/enter/login';
    let req = '';
    try {
      req = await http.post(path, {
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      return e.response.data;
    }

    if (req.data.success) {
      await localforage.setItem('user', req.data.data);
    }

    return req.data;
  },
};
