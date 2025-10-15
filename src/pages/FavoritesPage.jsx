import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SharedContext } from "../contexts/SharedContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useContext(SharedContext);

  return (
    <div className="page">
      <h2>Favoritos</h2>
      {favorites.length === 0 ? (
        <p>Aún no tienes favoritos. Añade desde la pestaña Explorar.</p>
      ) : (
        <div className="list">
          {favorites.map(f => (
            <div key={f.index} className="item-card">
              <Link to={`/detail/${f.index}`}>
                <div>
                  <h3>{f.name}</h3>
                  <p className="muted">{f.index}</p>
                </div>
              </Link>
              <div>
                <button onClick={() => toggleFavorite(f)}>💔 Quitar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
