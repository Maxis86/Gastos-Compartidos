import React, { useContext, useState } from "react";

import Error from "./Error";

import GastosContext from "../context/gastos/gastosContext";

const Gasto = () => {
  const gastoContext = useContext(GastosContext);
  const { agregarGastoMaxi, agregarGastoGigi, agregarMes, mes } = gastoContext;

  const [gasto, guardarGasto] = useState({
    nombre: "",
    precio: "",
    opcion: "gigi",
    
  });

  const [error, guardarError] = useState({
    msj: "",
    estado: false,
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
        msj: "El nombre es obligatorio",
        estado: true,
      });
      return;
    } else if (nombre.trim().length > 18) {
      guardarError({
        msj: "El nombre tiene que tener menos de 19 caracteres",
        estado: true,
      });
      return;
    }

    // Validar 16
    if (precio < 1) {
      guardarError({
        msj: "El precio tiene que se mayor a 0",
        estado: true,
      });
      return;
    } else if (precio.trim().length > 16) {
      guardarError({
        msj: "El precio tiene que tener menos de 19 caracteres",
        estado: true,
      });
      return;
    }

    guardarError({
      msj: "",
      estado: false,
    });

    // construir el gasto
    const nuevoGasto = {
      nombre,
      precio,
      opcion,
      mes,
      // id: shortid.generate(),
    };

    // Pasar el gasto al componente principal
    if (nuevoGasto.opcion === "gigi") {
      agregarGastoGigi(nuevoGasto);
      guardarGasto({ nombre: "", precio: "", opcion: "gigi" });
    } else {
      agregarGastoMaxi(nuevoGasto);
      guardarGasto({ nombre: "", precio: "", opcion: "maxi" });
    }

    // Resetear el gasto
  };

  return (
    <>
      <h2>Agregar un Gasto</h2>
      <form onSubmit={crearGasto} style={{ marginBottom: 0 }}>
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
              placeholder="Ej. 1350"
              name="precio"
              value={precio}
              className="button-primary u-full-width"
              autoComplete="off"
              onChange={definirGasto}
            />
          </div>

          <div
            className="col-3 align-self-center justify-content-end"
            style={{ marginTop: 10 }}
          >
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
              <label
                className="btn btn-outline-danger m-2"
                style={{ fontSize: 17 }}
                htmlFor="btnradio1"
              >
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
              <label
                className="btn btn-outline-success m-2"
                style={{ fontSize: 17 }}
                htmlFor="btnradio3"
              >
                Maxi
              </label>
            </div>
          </div>
        </div>

        {error.estado ? <Error mensaje={error.msj} /> : null}
        <input
          type="submit"
          className="button-primary u-full-width mb-0"
          value="agregar gasto"
        />

        
        <div
          className="col-3 align-self-center justify-content-end"
          style={{ marginTop: 10 }}
        >
     
          <select
            value={mes}
            style = {{color: '#155724', marginTop: 10}}
            className="selectpicker mb-3"
            aria-label=".form-select-lg example"
            onChange={ (event) => agregarMes( event.target.value)  }
          >
            <option value="DEFAULT" >Seleccione Otro mes</option>
            <option value="Enero">Enero</option>
            <option value="Febrero">Febrero</option>
            <option value="Marzo">Marzo</option>
            <option value="Abril">Abril</option>
            <option value="Mayo">Mayo</option>
            <option value="Junio">Junio</option>
            <option value="Julio">Julio</option>
            <option value="Agosto">Agosto</option>
            <option value="Septiembre">Septiembre</option>
            <option value="Octubre">Octubre</option>
            <option value="Noviembre">Noviembre</option>
            <option value="Diciembre">Diciembre</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default Gasto;
