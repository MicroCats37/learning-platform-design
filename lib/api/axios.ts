import axios from 'axios';

// Creamos la instancia de Axios
const api = axios.create({
  // Aquí consumimos tu variable de entorno
  // Si por alguna razón no existe, usará localhost como respaldo
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;