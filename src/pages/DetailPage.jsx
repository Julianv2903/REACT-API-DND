import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SharedContext } from "../contexts/SharedContext";

export default function DetailPage() {
  const { index } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite, setSharedItem } = useContext(SharedContext);

  useEffect(() => {
    if (!index) return;
    setLoading(true);
    fetch(`https://www.dnd5eapi.co/api/2014/magic-items/${index}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener detalle");
        return res.json();
      })
      .then(data => {
        setDetail(data);
        setSharedItem({ index: data.index, name: data.name, url: data.url });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [index, setSharedItem]);

  if (loading) return <div className="page"><p>Cargando detalle...</p></div>;
  if (error) return <div className="page"><p className="error">Error: {error}</p></div>;
  if (!detail) return <div className="page"><p>Seleccione un elemento.</p></div>;

  return (
    <div className="page">
      <h2>{detail.name}</h2>
      <p className="muted">Index: {detail.index}</p>
      <div>
        <button onClick={() => toggleFavorite(detail)}>
          {isFavorite(detail.index) ? "💖 Quitar favorito" : "🤍 Agregar a favoritos"}
        </button>
      </div>
      <section style={{ marginTop: 12 }}>
        <h3>Descripción</h3>
        {detail.desc ? (
          detail.desc.map((d, i) => <p key={i}>{d}</p>)
        ) : (
          <p className="muted">No hay descripción disponible.</p>
        )}
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Datos crudos</h3>
        <pre style={{ maxHeight: 300, overflow: "auto" }}>
          {JSON.stringify(detail, null, 2)}
        </pre>
      </section>
    </div>
  );
}
