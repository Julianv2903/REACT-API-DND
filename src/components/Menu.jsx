import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="menu">
      <h1 className="brand">DnD Magic Items</h1>
      <ul>
        <li><NavLink to="/list" className={({isActive})=> isActive ? "active" : ""}>Explorar</NavLink></li>
        <li><NavLink to="/favorites" className={({isActive})=> isActive ? "active" : ""}>Favoritos</NavLink></li>
        <li><NavLink to="/original" className={({isActive})=> isActive ? "active" : ""}>Original (API)</NavLink></li>
        <li><NavLink to="/info" className={({isActive})=> isActive ? "active" : ""}>Info</NavLink></li>
      </ul>
    </nav>
  );
}
