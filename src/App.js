import React, { useContext, useEffect } from "react";

import Footer from "../src/components/Footer";

import Gasto from "./components/Gasto";
import Listado from "./components/Listado";
import ListadoM from "./components/ListadoM";
import Resumen from "./components/Resumen";

import swal from "sweetalert";

import gastosContext from "./context/gastos/gastosContext";
import { Header } from "./components/Header";

function App() {
  const gastoContext = useContext(gastosContext);
  const {
    obtenerProductos,
    eliminarGastosGigi,
    eliminarGastosMaxi,
    gastosGigi,
    gastosMaxi,
    mes,
    agregarMes,
    alerta,
  } = gastoContext;

  useEffect(() => {
    obtenerProductos(mes);
    agregarMes(mes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mes]);

  const eliminarTodoGigi = (gastosGigi) => {
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado no se podrá recuperar",
      icon: "warning",
      buttons:  [ "No", "Si" ] ,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {  
        eliminarGastosGigi(gastosGigi)
        console.log('eliminado')
      } else {
        console.log('nada')

      }
    });
      
  };

  const eliminarTodoMaxi = (gastosMaxi) => {
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado no se podrá recuperar",
      icon: "warning",
      buttons:  [ "NO" , "SI" ] ,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {  
        eliminarGastosMaxi(gastosMaxi)
        console.log('eliminado')
      } else {
        console.log('nada')
      }
    });
      
  };

  return (
    <div className="container">
      <header>
        <Header/>
        <h1>Gastos Compartidos</h1>

        <div className="contenido-principal contenido">
          <Gasto />

          <Resumen />
          <hr></hr>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {alerta.msg !== "" ? (
              <div className="alert alert-info" role="alert">
                {alerta.msg}
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="col-5">
              <h2>Gigi</h2>
              <button
                onClick={() => eliminarTodoGigi(gastosGigi)}
                className="btn btn-outline-warning u-full-width"
                style={{ fontSize: 12, marginBottom: 15 }}
              >
                Borrar todo
              </button>
              <Listado />
            </div>

            <div className="col-2"></div>

            <div className="col-5">
              <h2>Maxi</h2>
              <button
                onClick={() => eliminarTodoMaxi(gastosMaxi)}
                className="btn btn-outline-warning u-full-width btn-sm"
                style={{ fontSize: 12, marginBottom: 15 }}
              >
                Borrar todo
              </button>
              <ListadoM />
            </div>
          </div>
        </div>
        <Footer />
      </header>
    </div>
  );
}

export default App;
