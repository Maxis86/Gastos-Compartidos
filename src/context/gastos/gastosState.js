import React, { useReducer } from "react";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
} from "firebase/firestore";

import db from "../../firebase/config";

import gastosReducer from "./gastosReducer";
import gastosContext from "./gastosContext";

import {
  OBTENER_GASTO_MAXI,
  OBTENER_GASTO_GIGI,
  AGREGAR_MES,
} from "../../types";

const GastosState = (props) => {
  const initialState = {
    gastosMaxi: [],
    gastosGigi: [],
    mes: "",
  };

  const [state, dispatch] = useReducer(gastosReducer, initialState);

  //Funciones

  const agregarGastoMaxi = async (gasto) => {
    console.log("Agregando Gasto");
    const fecha = new Date();

    try {
      const docRef = await addDoc(collection(db, "gastoMaxi"), {
        nombre: gasto.nombre,
        opcion: gasto.opcion,
        precio: gasto.precio,
        mes: gasto.mes,
        fecha: fecha,
      });
      console.log("Documento escrito con el ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  };

  const agregarGastoGigi = async (gasto) => {
    console.log("Agregando Gasto");
    const fecha = new Date();

    try {
      const docRef = await addDoc(collection(db, "gastoGigi"), {
        nombre: gasto.nombre,
        opcion: gasto.opcion,
        precio: gasto.precio,
        mes: gasto.mes,
        fecha: fecha,
      });
      console.log("Documento escrito con el ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  };

  const agregarMes = (mes) => {

    if (mes===''){
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const fecha = new Date();
      const mesHoy= fecha.getMonth();

      mes = meses [mesHoy];
    }

    dispatch({
      type: AGREGAR_MES,
      payload: mes,
    });

    obtenerProductos(mes);
  };

  const eliminarGastosGigi = (gastosGigi) => {
    gastosGigi.forEach((gasto) =>
      db
        .collection("gastoGigi")
        .doc(gasto.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        })
    );
  };

  const eliminarGastosMaxi = (gastosMaxi) => {
    gastosMaxi.forEach((gasto) =>
      db
        .collection("gastoMaxi")
        .doc(gasto.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        })
    );
  };

  const eliminarGasto = (id) => {
    db.collection("gastoMaxi")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    db.collection("gastoGigi")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const obtenerProductos = async (mesActual) => {
    
    if (mesActual===''){
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const fecha = new Date();
      const mesHoy= fecha.getMonth();

      mesActual = meses [mesHoy];
    }

    const q = query(
      collection(db, "gastoMaxi"),
      where("mes", "==", mesActual),
      orderBy("fecha", "asc")
    );

    const querySnapshot = await getDocs(q);
    const gastosM = [];

    querySnapshot.forEach((doc) => {
      gastosM.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    dispatch({
      type: OBTENER_GASTO_MAXI,
      payload: gastosM,
    });

    const g = query(
      collection(db, "gastoGigi"),
      where("mes", "==", mesActual),
      orderBy("fecha", "asc")
    );

    const querySnapshotG = await getDocs(g);
    const gastosG = [];

    querySnapshotG.forEach((doc) => {
      gastosG.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    dispatch({
      type: OBTENER_GASTO_GIGI,
      payload: gastosG,
    });
  };

  return (
    <gastosContext.Provider
      value={{
        gastosGigi: state.gastosGigi,
        gastosMaxi: state.gastosMaxi,
        mes: state.mes,
        agregarGastoMaxi,
        agregarGastoGigi,
        obtenerProductos,
        eliminarGasto,
        eliminarGastosGigi,
        eliminarGastosMaxi,
        agregarMes,
      }}
    >
      {props.children}
    </gastosContext.Provider>
  );
};

export default GastosState;
