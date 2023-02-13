import localforage from 'localforage';

export default async function getHeaders() {
  const header = await localforage.getItem('user');
  return {
    headers: { 'authorization-token': header.authKey },
  };
}
