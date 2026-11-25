// ENCARGO A · Inicio (semana 12)
// Las rutas ya no vienen de datos/rutas.js: se piden a la API propia.
//
// Patrón de la semana (es el mismo en todas las páginas que leen datos):
// 1. Tres estados: los datos, si está cargando y si hubo un error.
// 2. useEffect con [] al final: el código de adentro se ejecuta una vez,
//    después de que el componente aparece en pantalla.
// 3. Adentro, el mismo fetch con async/await de la semana 9.
// 4. Según los estados, se muestra «Cargando…», el error o los datos.
import { useEffect, useState } from "react";
import { Link } from "react-router";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";
import ClimaActual from "../components/ClimaActual.jsx";

export default function Inicio() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setRutas(datos);
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);

  return (
    <>
      <BannerPrincipal
        titulo="Rutas sostenibles de La Araucanía"
        subtitulo="Senderos y emprendimientos cerca de Temuco"
      />
      {cargando && (
        <p className="lista estado" role="status">
          Cargando rutas…
        </p>
      )}
      {error && (
        <p className="lista estado error" role="alert">
          {error}
        </p>
      )}
      {!cargando && !error && <ListaRutas rutas={rutas.slice(0, 3)} />}
      <p className="lista">
        <Link to="/rutas" className="boton">
          Ver todas las rutas
        </Link>
      </p>
      <ClimaActual />
   
    </>
  );
}
