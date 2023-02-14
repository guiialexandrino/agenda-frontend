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

  async lostPassword(email) {
    const path = '/enter/lostPassword';
    let req = '';
    try {
      req = await http.post(path, {
        email: email,
      });
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async checkSecret(userId) {
    const path = `/enter/checkSecret/${userId}`;
    let req = '';
    try {
      req = await http.get(path);
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async validateToken(userId, token) {
    const path = '/enter/validateToken';
    let req = '';
    try {
      req = await http.post(path, {
        id: userId,
        token: token,
      });
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async newPassword(userId, token, newPassword) {
    const path = '/enter/newPassword';
    let req = '';
    try {
      req = await http.post(path, {
        id: userId,
        token: token,
        password: newPassword,
      });
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },
};
