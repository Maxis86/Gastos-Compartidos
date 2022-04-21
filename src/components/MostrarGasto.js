import React, { useContext } from "react";

import gastosContext from "../context/gastos/gastosContext";


const MostrarGasto = ({ gasto }) => {

  const gastoContext = useContext(gastosContext);
  const { eliminarGasto } = gastoContext;

  return (
    <>
      <div className="row">
        <div className="col-10">
          <div className="row">
            <div className="col-12 d-flex">
              <h3>
                <b>  {gasto.nombre}</b>
              </h3>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <h3>$ {gasto.precio}</h3>
            </div>
          </div>
        </div>

        <div className="col-2">
          <button type="button" className="btn btn-outline-danger mb-6 " onClick={() => eliminarGasto(gasto.id)}>x</button>
        </div>
      </div>
    </>
  );
};

export default MostrarGasto;

