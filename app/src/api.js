// En desarrollo (npm run dev) la API propia corre en este computador.
// En la versión publicada (npm run build) no hay API propia: GitHub Pages
// no ejecuta json-server. Se usa una dirección que no existe a propósito
// (.invalid nunca responde), para que cada vista muestre su mensaje de error
// sin intentar conectarse a localhost desde internet.
export const EN_PUBLICACION = import.meta.env.PROD;

export const API_URL = EN_PUBLICACION
  ? "https://api-propia.invalid"
  : "http://localhost:3001";
  console.log("EN_PUBLICACION:", EN_PUBLICACION, "API_URL:", API_URL);