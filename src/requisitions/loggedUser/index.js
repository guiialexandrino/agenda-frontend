import http from '../base/baseUrl.js';
import getHeaders from '../base/getHeader';

export default {
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
};
