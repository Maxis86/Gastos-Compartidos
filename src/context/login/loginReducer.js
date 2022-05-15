import { USUARIO_ACTUAL } from "../../types";


export default (state, action ) => {
    switch (action.type) {
        case USUARIO_ACTUAL:
            return{
                
            }
        default:
            return state;
    }
}