import React from "react";

export const MostrarBuscados = ({ index, gasto }) => {
  return (
    <table className="table table-hover">
      <tbody>
        <tr>
          <td scope="row">{gasto.nombre}</td>
          <td>$ {gasto.precio}</td>
          <td>{gasto.mes}</td>
          <td>{gasto.ano}</td>
        </tr>
      </tbody>
    </table>
  );
};
