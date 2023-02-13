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
};
