// ENCARGO A · Emprendimientos (semana 12)
// Mismo patrón que Inicio: estados, useEffect con [] y fetch.
// El filtro por comuna de la semana 11 no cambia: se aplica sobre
// lo que llegó de la API, igual que antes se aplicaba sobre el archivo local.
import { useEffect, useState } from "react";
import ListaEmprendimientos from "../components/ListaEmprendimientos.jsx";
import { API_URL } from "../api.js";

const comunas = ["Todas", "Temuco", "Padre Las Casas"];

export default function Emprendimientos() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [comuna, setComuna] = useState("Todas");

  useEffect(() => {
    async function cargarEmprendimientos() {
      try {
        const respuesta = await fetch(`${API_URL}/emprendimientos`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setEmprendimientos(await respuesta.json());
      } catch {
        setError("No se pudieron cargar los emprendimientos.");
      } finally {
        setCargando(false);
      }
    }
    cargarEmprendimientos();
  }, []);

  const visibles =
    comuna === "Todas"
      ? emprendimientos
      : emprendimientos.filter((e) => e.comuna === comuna);

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando emprendimientos…
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

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar por comuna">
        {comunas.map((opcion) => (
          <button
            key={opcion}
            type="button"
            aria-pressed={comuna === opcion}
            onClick={() => setComuna(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>
      <ListaEmprendimientos emprendimientos={visibles} />
    </>
  );
}
