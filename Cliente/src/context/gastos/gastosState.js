import React, { useReducer } from "react";
import axios from "axios";
import clienteAxios from "../../config/axios";

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
  AGREGAR_ANO,
  AGREGAR_GASTO_MAXI,
  AGREGAR_GASTO_GIGI,
  ELIMINAR_GASTOS_MAXI,
  ELIMINAR_GASTOS_GIGI,
  ELIMINAR_ALERTA,
  AGREGAR_ALERTA,

} from "../../types";

const GastosState = (props) => {
  const initialState = {
    gastosMaxi: [],
    gastosGigi: [],
    mes: "",
    alerta: {
      msg: "",
    },
    ano: "",
  };

  const [state, dispatch] = useReducer(gastosReducer, initialState);

  //Funciones

  const agregarGastoMaxi = async (gasto) => {
   
    const fecha = new Date();

    try {
      // Firebase agregar producto
      // const docRef = await addDoc(collection(db, "gastoMaxi"), {
      //   nombre: gasto.nombre,
      //   opcion: gasto.opcion,
      //   precio: gasto.precio,
      //   mes: gasto.mes,
      //   fecha: fecha,
      // });

      //Node

      const respuesta = await clienteAxios.post("/api/productos", {
        nombre: gasto.nombre,
        opcion: gasto.opcion,
        categoria: "62f78207e82e65e7cfe90c7d",
        precio: gasto.precio,
        mes: gasto.mes,
        ano: fecha.getFullYear(),
        dia: fecha.getDate()
      });
      
      gasto= respuesta.data;

      dispatch({
        type: AGREGAR_GASTO_MAXI,
        payload: gasto,
      });

      //console.log("Documento escrito con el ID: ", docRef.id);
    } catch (error) {
      console.error("Error al agregar el documento: ", error);

    }

    setTimeout(() => {
      dispatch({
        type: ELIMINAR_ALERTA,
      });
    }, 6000);
  };

  const agregarGastoGigi = async (gasto) => {
  

    const fecha = new Date();

    try {
      // Firebase agregar producto
      // const docRef = await addDoc(collection(db, "gastoMaxi"), {
      //   nombre: gasto.nombre,
      //   opcion: gasto.opcion,
      //   precio: gasto.precio,
      //   mes: gasto.mes,
      //   fecha: fecha,
      // });

      //Node
      
      const respuesta = await clienteAxios.post("/api/productos", {
        nombre: gasto.nombre,
        opcion: gasto.opcion,
        categoria: "62f78207e82e65e7cfe90c7d",
        precio: gasto.precio,
        mes: gasto.mes,
        ano: fecha.getFullYear(),
        dia: fecha.getDate(),
        usuarioCargado : gasto.usuarioCargado
      });

      gasto = respuesta.data;
      

      dispatch({
        type: AGREGAR_GASTO_GIGI,
        payload: gasto,
      });

      //console.log("Documento escrito con el ID: ", docRef.id);
    } catch (error) {

      console.log(error.response.data.msg);
    }   

    setTimeout(() => {
      dispatch({
        type: ELIMINAR_ALERTA,
      });
    }, 6000);
  };

  const agregarMes = (mes) => {
    if (mes === "") {
      var meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const fecha = new Date();
      const mesHoy = fecha.getMonth();

      mes = meses[mesHoy];
    }

    dispatch({
      type: AGREGAR_MES,
      payload: mes,
    });

    obtenerProductos(mes);
  };

  const agregarAno = (ano) => {
    // if (mes === "") {
    //   var meses = [
    //     "Enero",
    //     "Febrero",
    //     "Marzo",
    //     "Abril",
    //     "Mayo",
    //     "Junio",
    //     "Julio",
    //     "Agosto",
    //     "Septiembre",
    //     "Octubre",
    //     "Noviembre",
    //     "Diciembre",
    //   ];
    //   const fecha = new Date();
    //   const mesHoy = fecha.getMonth();

    //   mes = meses[mesHoy];
    // }

    // dispatch({
    //   type: AGREGAR_MES,
    //   payload: mes,
    // });

    // obtenerProductos(mes);
  };

  const eliminarGastosGigi = (gastosGigi) => {
    
    gastosGigi.forEach((gasto) => {
      eliminarGasto(gasto._id)
    });

    // gastosGigi.forEach((gasto) =>
    //   db
    //     .collection("gastoGigi")
    //     .doc(gasto.id)
    //     .delete()
    //     .then(() => {
    //       dispatch({
    //         type: ELIMINAR_TODOS_GASTOS_GIGI,
    //         payload: gasto.id,
    //       });
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //     })
    // );
  };

  const eliminarGastosMaxi = (gastosMaxi) => {
 
    gastosMaxi.forEach((gasto) => {
      console.log('gasto._id');
      console.log(gasto._id);
      
      eliminarGasto(gasto._id)
    });
    
    // gastosMaxi.forEach((gasto) =>
    //   db
    //     .collection("gastoMaxi")
    //     .doc(gasto.id)
    //     .delete()
    //     .then(() => {
    //       dispatch({
    //         type: ELIMINAR_TODOS_GASTOS_MAXI,
    //         payload: gasto.id,
    //       });
    //       console.log("Todos los documentos de Maxi eliminados!");
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //     })
    // );

    setTimeout(() => {
      dispatch({
        type: ELIMINAR_ALERTA,
      });
    }, 6000);
  };

  const editarGasto = async (id, nombre, precio, mes) => {
    
    try {

      await clienteAxios.put(`/api/productos/${id}`, {nombre:nombre, precio:precio})

      obtenerProductos(mes)
      
      dispatch({
        type: AGREGAR_ALERTA,
        payload: { msg: "Gasto Editado" },
      });

    } catch (error) {
      
      console.log(error.response.data);

    }

    setTimeout(() => {
      dispatch({
        type: ELIMINAR_ALERTA,
      });
    }, 6000);
  };

  const eliminarGasto = async (id) => {
    
    try {
      const respuesta = await clienteAxios.delete(`/api/productos/${id}`)
      
      dispatch({
              type: ELIMINAR_GASTOS_MAXI,
              payload: id,
            });
      dispatch({
              type: ELIMINAR_GASTOS_GIGI,
              payload: id,
            });

    } catch (error) {
      
      console.log(error.response.data);

    }


    // db.collection("gastoMaxi")
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     console.log("Documneto de Maxi eliminados!");
    //     dispatch({
    //       type: ELIMINAR_GASTOS_MAXI,
    //       payload: id,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error removing document: ", error);
    //   });

    // db.collection("gastoGigi")
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     console.log("Documneto de Gigi eliminados!");
    //     dispatch({
    //       type: ELIMINAR_GASTOS_GIGI,
    //       payload: id,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error removing document: ", error);
    //   });

    setTimeout(() => {
      dispatch({
        type: ELIMINAR_ALERTA,
      });
    }, 6000);
  };

  const obtenerProductos = async (mesActual) => {
    if (mesActual === "") {
      var meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const fecha = new Date();
      const mesHoy = fecha.getMonth();

      mesActual = meses[mesHoy];
    }

    try {

      const respuesta = await clienteAxios.get("/api/buscar/opcion/maxi");

      const gastosM = [];
      for (let index = 0; index < respuesta.data.results.length; index++) {
        const elementMaxi = respuesta.data.results[index];
        if (elementMaxi.mes === mesActual && elementMaxi.opcion === "maxi") {
          gastosM.push(
            elementMaxi
          );
        }
      }
      dispatch({
        type: OBTENER_GASTO_MAXI,
        payload: gastosM,
      });
    } catch (error) {
      console.log(error.response);
    }

    // // Firebase
    // const q = query(
    //   collection(db, "gastoMaxi"),
    //   where("mes", "==", mesActual),
    //   orderBy("fecha", "asc")
    // );
    // const querySnapshot = await getDocs(q);
    // const gastosM = [];
    // querySnapshot.forEach((doc) => {
    //   gastosM.push({
    //     id: doc.id,
    //     ...doc.data(),
    //   });
    // });
    // const g = query(
    //   collection(db, "gastoGigi"),
    //   where("mes", "==", mesActual),
    //   orderBy("fecha", "asc")
    // );
    // const querySnapshotG = await getDocs(g);
    // const gastosG = [];
    // querySnapshotG.forEach((doc) => {
    //   gastosG.push({
    //     id: doc.id,
    //     ...doc.data(),
    //   });
    // });

    try {

      const respuestaG = await clienteAxios.get("/api/buscar/opcion/gigi");

      const gastosG = [];
      for (let i = 0; i < respuestaG.data.results.length; i++) {
        const elementGigi= respuestaG.data.results[i];
        if (elementGigi.mes === mesActual && elementGigi.opcion === "gigi") {
          gastosG.push(
            elementGigi
          );
        }
      }
      //console.log(gastosG)
      dispatch({
        type: OBTENER_GASTO_GIGI,
        payload: gastosG,
      });
    } catch (error) {
      console.log(error.response);
    }
   
  };

  return (
    <gastosContext.Provider
      value={{
        gastosGigi: state.gastosGigi,
        gastosMaxi: state.gastosMaxi,
        mes: state.mes,
        ano:state.ano,
        alerta: state.alerta,
        agregarGastoMaxi,
        agregarGastoGigi,
        obtenerProductos,
        eliminarGasto,
        eliminarGastosGigi,
        eliminarGastosMaxi,
        agregarMes,
        agregarAno,
        editarGasto
      }}
    >
      {props.children}
    </gastosContext.Provider>
  );
};

export default GastosState;
