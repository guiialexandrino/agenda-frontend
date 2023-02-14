import http from '../base/baseUrl.js';
import getHeaders from '../base/getHeader';

export default {
  async verifyAuthToken() {
    const path = '/api/verifyAuthToken';
    let req = '';
    try {
      req = await http.get(path, await getHeaders());
    } catch (e) {
      return e;
    }

    return req.data;
  },

  async viewContacts() {
    const path = '/api/viewContacts';
    let req = '';
    try {
      req = await http.get(path, await getHeaders());
    } catch (e) {
      return e;
    }

    return req.data;
  },

  async addContact(name, email, number) {
    const path = `/api/addContact`;
    let req = '';
    try {
      req = await http.post(
        path,
        { name: name, email: email, number: number },
        await getHeaders()
      );
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async editContact(id, name, email, number) {
    const path = `/api/editContact/${id}`;
    let req = '';
    try {
      req = await http.put(
        path,
        { name: name, email: email, number: number },
        await getHeaders()
      );
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async deleteContact(id) {
    const path = `/api/deleteContact/${id}`;
    let req = '';
    try {
      req = await http.delete(path, await getHeaders());
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async uploadAvatar(formData) {
    const path = `/api/uploadAvatar`;
    let req = '';
    try {
      req = await http.put(path, formData, await getHeaders());
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async restoreAvatar() {
    const path = `/api/restoreAvatar`;
    let req = '';
    try {
      req = await http.put(path, null, await getHeaders());
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },

  async editProfile(data) {
    const path = `/api/editProfile`;
    let req = '';
    try {
      req = await http.put(path, { ...data }, await getHeaders());
    } catch (e) {
      return e.response.data;
    }

    return req.data;
  },
};
