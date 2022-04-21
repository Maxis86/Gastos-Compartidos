import React, { useContext, useEffect } from "react";

import Gasto from "./components/Gasto";
import Listado from "./components/Listado";
import ListadoM from "./components/ListadoM";
import Resumen from "./components/Resumen";

import gastosContext from "./context/gastos/gastosContext";

function App() {
  const gastoContext = useContext(gastosContext);
  const {obtenerProductos } = gastoContext;

  useEffect(() => {
    obtenerProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Gastos Compartidos</h1>

        <div className="contenido-principal contenido">
          <Gasto/>
          
          <Resumen/>
          <hr></hr>

          <div className="row">
            <div className="col-5">
              <h2>Gigi</h2>
              <Listado />
            </div>

            <div className="col-2">
              
            </div>

            <div className="col-5">
              <h2>Maxi</h2>
              <ListadoM />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
