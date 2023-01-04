import {
  AGREGAR_GASTO_MAXI,
  AGREGAR_GASTO_GIGI,
  OBTENER_GASTO_MAXI,
  OBTENER_GASTO_GIGI,
  AGREGAR_MES,
  AGREGAR_ANO,
  ELIMINAR_GASTOS_MAXI,
  ELIMINAR_GASTOS_GIGI,
  ELIMINAR_ALERTA,
  BUSCAR_PRODUCTO,
  // ELIMINAR_TODOS_GASTOS_GIGI,
  // ELIMINAR_TODOS_GASTOS_MAXI,
  AGREGAR_ALERTA
} from "../../types";

const gastosReducer = (state, action) => {
  switch (action.type) {
    case AGREGAR_GASTO_MAXI:
      return {
        ...state,
        gastosMaxi: action.payload.opcion === "maxi" && [
          ...state.gastosMaxi,
          action.payload,],
        alerta: { msg: "Gasto Agregado" },
      };
    case AGREGAR_GASTO_GIGI:
      return {
        ...state,
        gastosGigi: action.payload.opcion === "gigi" && [
          ...state.gastosGigi,
          action.payload,
        ],
        alerta: { msg: "Gasto Agregado" },
      };
    case AGREGAR_MES:
      return {
        ...state,
        mes: action.payload,
      };
    case AGREGAR_ANO:
      return {
        ...state,
        ano: action.payload,
      };
    case AGREGAR_ALERTA:
      return {
        ...state,
        alerta: action.payload,
      };
    case OBTENER_GASTO_MAXI:
      return {
        ...state,
        gastosMaxi: action.payload,
      };
    case OBTENER_GASTO_GIGI:
      return {
        ...state,
        gastosGigi: action.payload,
      };
    case BUSCAR_PRODUCTO:
      return {
        ...state,
        productosBuscados: action.payload,
      };
    case ELIMINAR_GASTOS_MAXI:
      return {
        ...state,
        gastosMaxi: state.gastosMaxi.filter(
          (gastoMaxi) => gastoMaxi._id !== action.payload
        ),
        alerta: { msg: "Gastos Eliminados" },
      };
    
    case ELIMINAR_GASTOS_GIGI:
      return {
        ...state,
        gastosGigi: state.gastosGigi.filter(
          (gastoGigi) => gastoGigi._id !== action.payload
        ),
        alerta: { msg: "Gasto Eliminado" },
      };

    case ELIMINAR_ALERTA:
      return {
        ...state,
        alerta: { msg: "" },
      };

    // case ELIMINAR_TODOS_GASTOS_GIGI:
    // return {
    //   ...state,
    //   gastosGigi: [],
    //   alerta: { msg: "Gastos de Gise Eliminados" },
    // };
    
    // case ELIMINAR_TODOS_GASTOS_MAXI:
    // return {
    //   ...state,
    //   gastosMaxi:[],
    //   alerta: { msg: "Gastos de Maxi Eliminados" },
    // };

    default:
      return state;
  }
};

export default gastosReducer;
