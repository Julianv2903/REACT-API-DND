import React, { useEffect, useState } from "react";

export default function OriginalPage() {
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.dnd5eapi.co/api/2014/magic-items")
      .then(res => {
        if (!res.ok) throw new Error("Error al consultar el endpoint original");
        return res.json();
      })
      .then(data => setRaw(data))
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h2>Pestaña Original (API)</h2>
      {loading && <p>Cargando...</p>}
      {err && <p className="error">Error: {err}</p>}
      {raw && (
        <pre style={{ maxHeight: 600, overflow: "auto" }}>
          {JSON.stringify(raw, null, 2)}
        </pre>
      )}
    </div>
  );
}
