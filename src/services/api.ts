import axios from 'axios';

// Usando emulador

// const api = axios.create({
//   baseURL: 'http://10.0.2.2:3333',
// });

// Usando device

const api = axios.create({
  baseURL: 'https://inventory-api-pjo7.onrender.com',
});

export default api;
