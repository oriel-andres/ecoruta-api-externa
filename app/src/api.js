// INTEGRADOR · api.js (semana 12)
// La dirección de la API propia se escribe en un solo lugar.
// Todas las páginas la importan desde aquí:
//   import { API_URL } from "../api.js";
//   fetch(`${API_URL}/rutas`)
// Si la dirección cambia (otro puerto, la API del curso de Backend),
// se cambia solo esta línea y no veinte fetch repartidos por el código.
export const API_URL = "http://localhost:3001";
