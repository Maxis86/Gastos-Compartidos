import React, { useContext, useEffect } from "react";

import Footer from "../src/components/Footer";

import Gasto from "./components/Gasto";
import Listado from "./components/Listado";
import ListadoM from "./components/ListadoM";
import Resumen from "./components/Resumen";

import gastosContext from "./context/gastos/gastosContext";

function App() {
  const gastoContext = useContext(gastosContext);
  const {obtenerProductos, eliminarGastosGigi, eliminarGastosMaxi, gastosGigi, gastosMaxi, mes, agregarMes } = gastoContext;

  useEffect(() => {
    obtenerProductos(mes);
    agregarMes(mes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mes]);

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
              <button onClick={() => eliminarGastosGigi(gastosGigi)} className="btn btn-outline-warning u-full-width" style={{fontSize:12, marginBottom:15}}>
                Borrar todo
              </button>
              <Listado />
            </div>

            <div className="col-2">
              
            </div>

            <div className="col-5">
              <h2>Maxi</h2>
              <button onClick={() => eliminarGastosMaxi(gastosMaxi)} className="btn btn-outline-warning u-full-width btn-sm" style={{fontSize:12, marginBottom:15}}>
                Borrar todo
              </button>
              <ListadoM />
            </div>
          </div>
        </div>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
