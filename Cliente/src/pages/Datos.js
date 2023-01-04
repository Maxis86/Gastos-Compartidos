import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { MostrarBuscados } from "../components/MostrarBuscados";

import GastosContext from "../context/gastos/gastosContext";

import { Chart } from "react-google-charts";

export const Datos = () => {
  const gastoContext = useContext(GastosContext);
  const { buscarProducto, productosBuscados, alerta } = gastoContext;

  const [producto, guardarProducto] = useState({
    nombre: "",
  });

  let arrayGrafico = [
    ["Mes", "$", { role: "style" }],
    ["2022", 1, 'gold'],
  ];
  let arrayBandera = [];

  const { nombre } = producto;

  const options = {
    title: "Gráfico de Gasto ( en construcción)",
    hAxis: { title: "Mes", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "auto", height: "auto" },
  };

  const onChange = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();

    buscarProducto(nombre);
  };

  return (
    <div>
      <NavLink
        className="navLink btn-outline-warning u-full btn-sm"
        to="../Home"
        style={{ fontSize: 12, marginBottom: 15 }}
      >
        Volver
      </NavLink>
      <div className="login" style={{ width: "auto", height: "auto" }}>
        <div className="form-usuario" style={{ width: "auto", height: "auto" }}>
          <div
            className="contenedor-form sombra-dark"
            style={{ width: "auto", height: "auto" }}
          >
            {alerta.msg !== "" ? (
              <div className="alert alert-danger" role="alert">
                {alerta.msg}
              </div>
            ) : null}
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  type="submit"
                  className="btn btn-outline-warning"
                  value="Buscar"
                />
              </div>
            </form>


            {productosBuscados
              ? productosBuscados.map((gasto, index) => (
                  <>
                    <MostrarBuscados key={index} gasto={gasto} />
                  </>
                ))
              : null}

              {productosBuscados
              ? productosBuscados.map((gasto, index) => (
                  
                    arrayGrafico.push([gasto.mes, gasto.precio, 'gold'])
                    
                ))
              : null}
            <Chart
              chartType="ColumnChart"
              width="250px"
              height="250px"
              data={arrayGrafico}
              options={options}
            />
            {/* <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={data}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
