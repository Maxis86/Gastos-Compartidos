import React, { useContext} from "react";
import { totalGasto } from "../helpers/totalgastos";

import gastosContext from "../context/gastos/gastosContext";

const Resumen = () => {
  const gastoContext = useContext(gastosContext);
  const { gastosMaxi, gastosGigi } = gastoContext;

  let mensaje = "";

  let totalMaxi = totalGasto(gastosMaxi);
  let totalGigi = totalGasto(gastosGigi);

  let resumen = totalMaxi - totalGigi;

  if (resumen > 0) {
    mensaje = "A favor de Maxi";
  } else if (resumen < 0) {
    resumen = resumen * -1;
    mensaje = "A favor de Gigi";
  } else {
    mensaje = "Diferencia: ";
  }

  return (
    <>
      <h4>Gastos Maxi: $ {totalMaxi}</h4>
      <h4>Gastos Gigi: $ {totalGigi}</h4>

      <h4>
        {mensaje} $ {resumen}
      </h4>
    </>
  );
};

export default Resumen;
