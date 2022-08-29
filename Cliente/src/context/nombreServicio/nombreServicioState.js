import React, {useReducer} from 'react';

import nombreServicioReducer from './nombreServicioReducer'
import nombreServicioContext from './nombreServicioContext'

import {  } from "../../types";

const NombreServicioState = props => {
    
    const initialState ={
        personaUno : 'Maxi',
        personaDos : 'Gigi'
    }

    const [state, dispatch] = useReducer (nombreServicioReducer, initialState);

    //Funciones
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
        <nombreServicioContext.Provider
            value={{
                personaUno: state.personaUno,
                personaDos: state.personaDos,
                
            }}
        >
            {props.children}
        </nombreServicioContext.Provider>
    )
}

export default NombreServicioState;