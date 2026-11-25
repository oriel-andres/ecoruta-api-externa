// ENCARGO B · Rutas (semana 12)
// El filtro de la semana 11 se mantiene tal cual. Lo único que cambia es
// de dónde salen las rutas: antes, un import de datos/rutas.js; ahora,
// GET /rutas a la API propia, con el patrón de estados y useEffect.
//
// Ojo con el orden: los return anticipados (cargando y error) van DESPUÉS
// de todos los useState y del useEffect. Los hooks siempre se llaman
// en el mismo orden, sin if delante.
import { useEffect, useState } from "react";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";

const opciones = ["todas", "baja", "media", "alta"];

export default function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [dificultad, setDificultad] = useState("todas");

  useEffect(() => {
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRutas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando rutas…
      </p>
    );
  }

  if (error) {
    return (
      <p className="lista estado error" role="alert">
        {error}
      </p>
    );
  }

  const visibles =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar por dificultad">
        {opciones.map((opcion) => (
          <button
            key={opcion}
            type="button"
            aria-pressed={dificultad === opcion}
            onClick={() => setDificultad(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>
      {visibles.length === 0 ? (
        <p className="lista">No hay rutas de dificultad {dificultad}.</p>
      ) : (
        <ListaRutas titulo="Todas las rutas" rutas={visibles} />
      )}
    </>
  );
}
