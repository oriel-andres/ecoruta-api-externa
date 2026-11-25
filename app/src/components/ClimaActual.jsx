import { useEffect, useState } from "react";

const URL_CLIMA =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-38.74&longitude=-72.60" +
  "&current=temperature_2m,wind_speed_10m,weather_code" +
  "&timezone=America/Santiago";

function describirCielo(codigo) {
  if (codigo === 0) return "Despejado";
  if (codigo <= 3) return "Parcialmente nublado";
  if (codigo === 45 || codigo === 48) return "Niebla";
  if (codigo >= 51 && codigo <= 57) return "Llovizna";
  if (codigo >= 61 && codigo <= 67) return "Lluvia";
  if (codigo >= 71 && codigo <= 77) return "Nieve";
  if (codigo >= 80 && codigo <= 82) return "Chubascos";
  if (codigo >= 95) return "Tormenta";
  return "Sin información";
}

function elegirAviso(clima) {
  if (clima.temperature_2m < 8) return "Hace frío: lleva abrigo.";
  if (clima.wind_speed_10m > 40) return "Viento fuerte: evita los miradores.";
  if (clima.weather_code >= 61) return "Se esperan precipitaciones: lleva impermeable.";
  return "Buen momento para salir.";
}

export default function ClimaActual() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarClima() {
      try {
        const respuesta = await fetch(URL_CLIMA);
        if (!respuesta.ok) {
          throw new Error(`Open-Meteo respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setClima(datos.current);
      } catch {
        setError("No pudimos cargar el clima. Revisa tu conexión e intenta de nuevo.");
      } finally {
        setCargando(false);
      }
    }
    cargarClima();
  }, []);

  return (
    <section className="clima" aria-labelledby="titulo-clima">
      <h2 id="titulo-clima">Clima en la ruta</h2>
      {cargando && <p className="estado" role="status">Cargando clima…</p>}
      {error && <p className="estado error" role="alert">{error}</p>}
      {clima && (
        <>
          <p>Temperatura: {clima.temperature_2m} °C</p>
          <p>Viento: {clima.wind_speed_10m} km/h</p>
          <p>Cielo: {describirCielo(clima.weather_code)}</p>
          <p className="aviso-clima">{elegirAviso(clima)}</p>
          <p className="fuente">
            Datos de <a href="https://open-meteo.com/">Open-Meteo</a>
          </p>
        </>
      )}
    </section>
  );
}