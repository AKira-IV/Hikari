// src/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto por la URL del backend
});

export default api;
