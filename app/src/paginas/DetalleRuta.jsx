// ENCARGO C · DetalleRuta (semana 12)
// En la semana 11 la ruta se buscaba con find en datos/rutas.js.
// Ahora se pide a la API: GET /rutas/:id.
//
// Dos detalles nuevos:
// - [id] al final del useEffect: si cambia el id de la dirección, se vuelve
//   a pedir la ruta. Con [] se quedaría mostrando la primera.
// - Si la ruta no existe, json-server responde 404. fetch NO lanza un error
//   por un 404 (solo por fallas de red), así que hay que revisar el código
//   de la respuesta y distinguir «no existe» de «la API no responde».
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Resenas from "../components/Resenas.jsx";
import { API_URL } from "../api.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarRuta() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas/${id}`);
        if (respuesta.status === 404) {
          setRuta(null);
          return;
        }
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRuta(await respuesta.json());
      } catch {
        setError("No se pudo cargar la ruta. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRuta();
  }, [id]);

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando ruta…
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

  if (!ruta) {
    return (
      <section className="lista">
        <h2>Ruta no encontrada</h2>
        <p>No existe una ruta con el número {id}.</p>
        <p>
          <Link to="/rutas" className="boton">
            Volver a las rutas
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="lista">
      <article className="tarjeta detalle">
        <img src={ruta.imagen} alt={ruta.alt} />
        <div className="cuerpo">
          <h2>{ruta.nombre}</h2>
          <p className="meta">
            {ruta.distanciaKm} km
            <span className={"chip " + ruta.dificultad}>{ruta.dificultad}</span>
            {ruta.accesible && <span className="sello">♿ Accesible</span>}
          </p>
          <p>{ruta.descripcion}</p>
          <p>
            <Link to="/rutas" className="boton">
              Volver a las rutas
            </Link>
          </p>
        </div>
      </article>
      <Resenas rutaId={ruta.id} />
    </section>
  );
}
