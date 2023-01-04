import React, { useContext, useEffect } from "react";

import Footer from "../src/components/Footer";
import Gasto from "./components/Gasto";
import { Header } from "./components/Header";
import Listado from "./components/Listado";
import ListadoM from "./components/ListadoM";
import Resumen from "./components/Resumen";

import gastosContext from "./context/gastos/gastosContext";

import swal from "sweetalert";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

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
    ano,
  } = gastoContext;

  useEffect(() => {
    obtenerProductos(mes, ano);
    agregarMes(mes, ano);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mes]);

  const eliminarTodoGigi = (gastosGigi) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", eliminarGastosGigi(gastosGigi), "success");
      }
    });
  };

  const eliminarTodoMaxi = (gastosMaxi) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", eliminarGastosMaxi(gastosMaxi), "success");
      }
    });
  };

  return (
    <div className="container">
      <header>
        <NavLink
          // activeclassName="active"
          className="navLink btn-outline-warning u-full btn-sm"
          to="../Datos"
          style={{ fontSize: 12, marginBottom: 15 }}
        >
          Datos
        </NavLink>
        {/* <NavLink
          // activeclassName="active"
          className="navLink btn-outline-warning u-full btn-sm"
          //to="../login"
          style={{ fontSize: 12, marginBottom: 15 }}
        >
          Usuarios
        </NavLink> */}
        
        <Header />

        <div className="contenido-principal contenido">
          <Gasto />

          <Resumen />

          <hr></hr>

          <div style={{ display: "flex", justifyContent: "center" }}>
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
