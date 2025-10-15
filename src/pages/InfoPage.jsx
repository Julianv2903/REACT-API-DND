import React from "react";

export default function InfoPage() {
  return (
    <div className="page">
      <h2>Información</h2>
      <p>Esta es una aplicación demo que consume la API pública de D&D 5e para listar <strong>magic items</strong>.</p>
      <p>Fuente del endpoint utilizado: <code>https://www.dnd5eapi.co/api/2014/magic-items</code>.</p>
      <p>Funcionalidades:</p>
      <ul>
        <li>Explorar items</li>
        <li>Buscar y filtrar</li>
        <li>Ver detalle de cada item</li>
        <li>Marcar favoritos (guardados en localStorage)</li>
        <li>Ver la respuesta original de la API</li>
        <li>Compartir el item seleccionado entre pestañas mediante un Context</li>
      </ul>
      <p>Notas: algunos endpoints devuelven en la lista solo `index`, `name` y `url`. Para obtener detalles como descripcion o rareza, la app hace un fetch por el `index` en la vista detalle.</p>
    </div>
  );
}
