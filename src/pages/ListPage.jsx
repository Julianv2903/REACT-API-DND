import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";

const API_BASE = "https://www.dnd5eapi.co/api/2014/magic-items";

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [rawApi, setRawApi] = useState(null);
  const [query, setQuery] = useState("");
  const [rarityFilter, setRarityFilter] = useState(""); // optional, may be empty
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_BASE)
      .then(res => {
        if (!res.ok) throw new Error("Error al consultar la API");
        return res.json();
      })
      .then(data => {
        setRawApi(data);
        setItems(data.results || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // filtro combinado: por nombre (query) y por rarity (si detalles existen)
  const filtered = items.filter(it => {
    const q = query.trim().toLowerCase();
    if (q) {
      if (!it.name.toLowerCase().includes(q) && !it.index.toLowerCase().includes(q)) return false;
    }
    // Si hay filtro de rarity, intentaremos obtener rarity localmente desde la lista (la lista generalmente no trae rarity).
    // Para ser robustos: si no hay rarity en `it`, no filtramos por rarity (evitamos excluir por falta de dato).
    if (rarityFilter) {
      // many items from this /magic-items endpoint don't include rarity; so this is permissive:
      if (it.rarity && it.rarity.name) {
        return it.rarity.name.toLowerCase() === rarityFilter.toLowerCase();
      }
      // if no rarity info, try to include the item (so user can still find it)
      return true;
    }
    return true;
  });

  return (
    <div className="page">
      <h2>Explorar Magic Items</h2>
      <div className="controls">
        <input
          placeholder="Buscar por nombre o índice..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <input
          placeholder="Filtro libre (ej. 'wand' o rarity exacta)"
          value={rarityFilter}
          onChange={(e)=>setRarityFilter(e.target.value)}
        />
      </div>

      {loading && <p>Cargando items...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="list">
        {filtered.map(item => (
          <ItemCard key={item.index} item={item} />
        ))}
      </div>

      <details style={{ marginTop: 16 }}>
        <summary>Mostrar respuesta cruda de este endpoint</summary>
        <pre style={{ maxHeight: 300, overflow: "auto" }}>
          {rawApi ? JSON.stringify(rawApi, null, 2) : "Sin datos"}
        </pre>
      </details>
    </div>
  );
}
