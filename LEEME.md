# Ejemplo resuelto (05) · EcoRuta Temuco, semana 12

El repositorio de un equipo al terminar la semana 12, hecho sobre el ejemplo resuelto de la semana 11. Las páginas ya no leen archivos locales: piden sus datos a la API propia, levantada con json-server a partir del contrato firmado en la semana 11.

## Qué hay aquí

```
index.html, estilos.css, img/   El sitio estático, que sigue publicado en GitHub Pages
README.md                       «Cómo levantar la API en local», ahora completo
app/
  db.json                       Datos de la API (rutas, emprendimientos, resenas), mañana
  package.json                  Integrador: json-server 0.17.4 y el script "api"
  public/img/                   Integrador: las imágenes, ahora como archivos (el modelo guarda su ruta)
  src/
    api.js                      Integrador: API_URL, la dirección de la API en un solo lugar
    index.css                   Integrador: estilos de estados, reseñas y formulario
    paginas/
      Inicio.jsx                Encargo A: GET /rutas, tres destacadas
      Emprendimientos.jsx       Encargo A: GET /emprendimientos, filtro por comuna
      Rutas.jsx                 Encargo B: GET /rutas, filtro por dificultad
      DetalleRuta.jsx           Encargo C: GET /rutas/:id, caso 404
    components/
      Resenas.jsx               Encargo D: GET /resenas?rutaId=, DELETE /resenas/:id
      FormularioResena.jsx      Encargo E: POST /resenas, formulario controlado
      TarjetaRuta.jsx           Solo cambió el comentario: imagen ahora es texto
  (se borraron src/datos/ y las imágenes de rutas de src/assets: integración final)
```

Cada archivo que cambió tiene al inicio un comentario que explica qué cambió y por qué.

## Cómo verlo funcionando

Dos terminales, las dos dentro de `app`:

```
npm install        (solo la primera vez)
npm run api        terminal 1 → http://localhost:3001
npm run dev        terminal 2 → http://localhost:5173
```

Prueben:

1. http://localhost:3001/rutas y http://localhost:3001/resenas?rutaId=1 directamente en el navegador.
2. En la aplicación, entrar a Cerro Ñielol, publicar una reseña, recargar la página (la reseña sigue ahí) y borrarla. Miren `db.json` después de cada paso.
3. Detener la API con Ctrl + C y recargar la aplicación: cada página muestra su mensaje de error en vez de quedar en blanco.
4. `#/rutas/99`: «Ruta no encontrada». La consola muestra un 404 de red; es esperado, porque la API respondió que esa ruta no existe.

Al terminar, `git restore app/db.json` deja los datos como estaban.
