// const API_URL = 'http://demo9184597.mockable.io';
const API_URL = '/api';
const API_URL2 = 'http://demo7078211.mockable.io/';
const API_URL3 = 'http://demo0527245.mockable.io/';

const API_SERVICES = {
  users: `${API_URL}/users`,
  roles: `${API_URL}/roles`,
  material: `${API_URL}/materiales`,
  // inventario: `${API_URL}/inventarios`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { API_SERVICES, fetcher };