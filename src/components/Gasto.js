import React, { useContext, useState } from "react";

import Error from "./Error";

import GastosContext from "../context/gastos/gastosContext";

const Gasto = () => {

  const gastoContext = useContext (GastosContext);
  const {agregarGastoMaxi, agregarGastoGigi} = gastoContext;

  const [gasto, guardarGasto] = useState({
    nombre: "",
    precio: 0,
    opcion: "gigi",
  });
  
  const [error, guardarError] = useState({
    msj: '',
    estado: false
  });

  //Extraer los valores
  const { nombre, precio, opcion } = gasto;

  const definirGasto = (e) => {

    if ([e.target.name] === "precio") {
      guardarGasto({
        ...gasto,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      guardarGasto({ ...gasto, [e.target.name]: e.target.value });
    }
  };

  const definirPersona = (persona) => {
    guardarGasto({ ...gasto, opcion: persona });
  };

  const crearGasto = (e) => {
    e.preventDefault();

    // Validar 18
    if (nombre.trim() === "") {
      guardarError({
        msj: 'El nombre es obligatorio',
        estado: true}
        );
      return;
    } else if (nombre.trim().length > 18){
      guardarError({
        msj: 'El nombre tiene que tener menos de 19 caracteres',
        estado: true}
        );
      return;
    }

    // Validar 16
    if (precio < 1) {
      guardarError({
        msj: 'El precio tiene que se mayor a 0',
        estado: true}
        );
      return;
    } else if (precio.trim().length > 16){
      guardarError({
        msj: 'El precio tiene que tener menos de 19 caracteres',
        estado: true}
        );
      return;
    }

    guardarError({
      msj: '',
      estado: false});

    // construir el gasto
    const nuevoGasto = {
      nombre,
      precio,
      opcion,
      // id: shortid.generate(),
    };

    // Pasar el gasto al componente principal
    if (nuevoGasto.opcion === "gigi") {
      agregarGastoGigi(nuevoGasto);
      guardarGasto({ nombre: "", precio: 0, opcion: "gigi" });
    } else {
      agregarGastoMaxi(nuevoGasto);
      guardarGasto({ nombre: "", precio: 0, opcion: "maxi" });
    }

    // Resetear el gasto
  };

  return (
    <>
      <h2>Agregar un Gasto</h2>
      <form onSubmit={crearGasto}>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ej. Seguro"
          name="nombre"
          className="button-primary u-full-width"
          value={nombre}
          onChange={definirGasto}
          autoComplete="off"
        />
        <div className="row ">
          <div className="col-6">
            <label>Precio</label>
            <input
              type="number"
              placeholder="Ej. $1350"
              name="precio"
              value={precio}
              className="button-primary u-full-width"
              onChange={definirGasto}
            />
          </div>

          <div className="col-6 align-self-center justify-content-end" style={{marginTop:10}}>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                onChange={() => definirPersona("gigi")}
                
              />
              <label className="btn btn-outline-danger m-2" style={{fontSize:17}} htmlFor="btnradio1">
                Gigi
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                onChange={() => definirPersona("maxi")}
              />
              <label className="btn btn-outline-success m-2" style={{fontSize:17}} htmlFor="btnradio3">
                Maxi
              </label>
            </div>
          </div>
        </div>

        {error.estado ? <Error mensaje= {error.msj} /> : null}
        <input
          type="submit"
          className="button-primary u-full-width mb-0"
          value="agregar gasto"
        />
      </form>
    </>
  );
};

export default Gasto;
