import React, {useReducer} from 'react';

import loginReducer from './loginReducer'
import loginContext from './loginContext'

import { USUARIO_ACTUAL } from "../../types";

const LoginState = props => {
    
    const initialState ={
        usuario : null
    }

    const [state, dispatch] = useReducer (loginReducer, initialState);

    //Funciones

    const obtenerUsuario = () => {
        
    }

    // const mostrarAlerta = (msg, categoria) => {
    //     dispatch({
    //         type: MOSTRAR_ALERTA,
    //         payload: {
    //             msg, 
    //             categoria
    //         }
    //     });

    // } 
    // const ocultarAlerta = () => {
    //     dispatch({
    //         type: OCULTAR_ALERTA,
    //     });

    // } 

 
    return (
        <loginContext.Provider
            value={{
                // alerta: state.alerta,
                // mostrarAlerta,
                // ocultarAlerta
            }}
        >
            {props.children}
        </loginContext.Provider>
    )
}

export default LoginState;