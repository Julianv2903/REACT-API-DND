import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import OriginalPage from "./pages/OriginalPage";
import InfoPage from "./pages/InfoPage";

export default function App() {
  return (
    <div className="app">
      <Menu />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/detail/:index" element={<DetailPage />} />
          <Route path="/original" element={<OriginalPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<div style={{ padding: 20 }}>Página no encontrada</div>} />
        </Routes>
      </main>
    </div>
  );
}
