import React, { useContext } from "react";

import gastosContext from "../context/gastos/gastosContext";

import swal from "sweetalert";

const MostrarGasto = ({ gasto }) => {
  const gastoContext = useContext(gastosContext);
  const { eliminarGasto } = gastoContext;

  const eliminar = (id) => {
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado no se podrá recuperar",
      icon: "warning",
      buttons:  [ "NO" , "SI" ] ,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {  
        eliminarGasto(id)

      } else {
      }
    });
      
  };

  return (
    <>
      <div className="row">
        <div className="col-10">
          <div className="row">
            <div className="col-12 d-flex">
              <h3>
                <b> {gasto.nombre}</b>
              </h3>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <h3>$ {gasto.precio}</h3>
            </div>
          </div>
        </div>

        <div className="col-2">
          <button
            type="button"
            className="btn btn-outline m-6"
            onClick={() => eliminar(gasto.id)}
          >
            <ion-icon name="trash"></ion-icon>{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default MostrarGasto;
