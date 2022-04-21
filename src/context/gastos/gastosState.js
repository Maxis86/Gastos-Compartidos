import React, { useReducer } from "react";

import db from '../../firebase/config';

import gastosReducer from "./gastosReducer";
import gastosContext from "./gastosContext";

import { AGREGAR_GASTO_MAXI, AGREGAR_GASTO_GIGI, OBTENER_GASTO_MAXI, OBTENER_GASTO_GIGI  } from "../../types";

const GastosState = (props) => {
  const initialState = {
    gastosMaxi: [],
    gastosGigi: [],
  };

  const [state, dispatch] = useReducer(gastosReducer, initialState);

  //Funciones

  const agregarGastoMaxi = (gasto) => {
    db.collection('gastoMaxi')
        .add (gasto)

    dispatch({
      type: AGREGAR_GASTO_MAXI,
      payload: gasto,
    });
  };


  const agregarGastoGigi = (gasto) => {

    db.collection('gastoGigi')
    .add (gasto)

    dispatch({
      type: AGREGAR_GASTO_GIGI,
      payload: gasto,
    });
  };

  const eliminarGasto = (id) => {

    db.collection("gastoMaxi")
    .doc(id)
    .delete()
    .then(() => {
       console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    db.collection("gastoGigi")
    .doc(id)
    .delete()
    .then(() => {
       console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    // dispatch({
    //   type: AGREGAR_GASTO_GIGI,
    //   payload: gasto,
    // });
  };

  const obtenerProductos = () => {

    db.collection('gastoMaxi').onSnapshot((snap) => {
      // se actualiza cada vez que hay un cambio
      const gastosM = [];

      snap.forEach((snapHijo) => {
          gastosM.push({
          id: snapHijo.id,
          ...snapHijo.data(),
          });
      });
     

      dispatch({
        type: OBTENER_GASTO_MAXI,
        payload: gastosM,
      });
      
      
    });
    
    db.collection('gastoGigi').onSnapshot((snap) => {
      // se actualiza cada vez que hay un cambio
      const gastosG = [];

      snap.forEach((snapHijo) => {
          gastosG.push({
          id: snapHijo.id,
          ...snapHijo.data(),
          });
      });

      dispatch({
        type: OBTENER_GASTO_GIGI,
        payload: gastosG,
      });
      
      
    });
  }




  return (
    <gastosContext.Provider
      value={{
        gastosGigi:state.gastosGigi,
        gastosMaxi:state.gastosMaxi,
        agregarGastoMaxi,
        agregarGastoGigi,
        obtenerProductos,
        eliminarGasto,
        
        
      }}
    >
      {props.children}
    </gastosContext.Provider>
  );
};

export default GastosState;


