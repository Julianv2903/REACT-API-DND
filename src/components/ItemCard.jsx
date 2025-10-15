import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SharedContext } from "../contexts/SharedContext";

export default function ItemCard({ item }) {
  const { toggleFavorite, isFavorite, setSharedItem } = useContext(SharedContext);

  return (
    <div className="item-card">
      <div className="item-main">
        <Link to={`/detail/${item.index}`} onClick={() => setSharedItem(item)}>
          <h3>{item.name}</h3>
          <p className="muted">{item.index}</p>
        </Link>
      </div>
      <div className="item-actions">
        <button onClick={() => toggleFavorite(item)}>
          {isFavorite(item.index) ? "💖" : "🤍"}
        </button>
      </div>
    </div>
  );
}
