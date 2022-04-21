import { AGREGAR_GASTO_MAXI, AGREGAR_GASTO_GIGI,OBTENER_GASTO_MAXI, OBTENER_GASTO_GIGI } from "../../types";


const gastosReducer = (state, action)=>{
  switch (action.type) {
    case AGREGAR_GASTO_MAXI:
      return {
        ...state,
        gastosMaxi: action.payload.opcion === "maxi" && [
          ...state.gastosMaxi,
          action.payload,
        ],
      };
      case AGREGAR_GASTO_GIGI:
        return {
          ...state,
          gastosGigi: action.payload.opcion === 'gigi' && [...state.gastosGigi, action.payload]
        };
        
      case OBTENER_GASTO_MAXI:
        return {
          ...state,
          gastosMaxi: action.payload
        };
      case OBTENER_GASTO_GIGI:
        return {
          ...state,
          gastosGigi: action.payload
        };
        
      default:
      return state;
  }
}

export default gastosReducer;