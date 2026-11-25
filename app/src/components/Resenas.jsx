// ENCARGO D · Resenas (semana 12)
// Prop: rutaId (número). El valor lo escribe DetalleRuta.
//
// Este componente es dueño de la lista de reseñas de una ruta:
// - GET /resenas?rutaId=… al aparecer (y si cambia rutaId).
// - DELETE /resenas/:id al pulsar «Borrar».
// - Le pasa a FormularioResena una función, onCreada, para que el formulario
//   le avise cuando la API creó una reseña nueva. Así la lista se actualiza
//   sin volver a pedir todo.
//
// Regla de oro: primero la API, después la pantalla. Solo se quita la reseña
// de la lista si la API confirmó que la borró.
import { useEffect, useState } from "react";
import FormularioResena from "./FormularioResena.jsx";
import { API_URL } from "../api.js";

export default function Resenas({ rutaId }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarResenas() {
      try {
        const respuesta = await fetch(`${API_URL}/resenas?rutaId=${rutaId}`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setResenas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las reseñas.");
      } finally {
        setCargando(false);
      }
    }
    cargarResenas();
  }, [rutaId]);

  async function borrar(idResena) {
    try {
      const respuesta = await fetch(`${API_URL}/resenas/${idResena}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      setResenas(resenas.filter((r) => r.id !== idResena));
    } catch {
      setError("No se pudo borrar la reseña. Intenta de nuevo.");
    }
  }

  function agregar(nueva) {
    setResenas([...resenas, nueva]);
  }

  return (
    <section className="resenas" aria-labelledby="titulo-resenas">
      <h3 id="titulo-resenas">Reseñas</h3>
      {cargando && <p role="status">Cargando reseñas…</p>}
      {error && (
        <p className="estado error" role="alert">
          {error}
        </p>
      )}
      {!cargando && resenas.length === 0 && (
        <p>Todavía no hay reseñas. ¡Sé la primera persona en opinar!</p>
      )}
      <ul>
        {resenas.map((resena) => (
          <li key={resena.id} className="resena">
            <p>
              <strong>{resena.autor}</strong>{" "}
              <span aria-label={`${resena.nota} de 5`}>
                {"★".repeat(resena.nota)}
                {"☆".repeat(5 - resena.nota)}
              </span>
            </p>
            <p>{resena.comentario}</p>
            <button
              type="button"
              className="borrar"
              onClick={() => borrar(resena.id)}
              aria-label={`Borrar la reseña de ${resena.autor}`}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
      <FormularioResena rutaId={rutaId} onCreada={agregar} />
    </section>
  );
}
