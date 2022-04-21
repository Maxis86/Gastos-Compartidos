import React, {useState} from 'react';
import Error from './Error'

const PreguntaMes = ({guardarMes, actualizarPregunta}) => {

    const [nombreMes, guardarNombreMes] = useState('');
    const [error, guardarError] = useState(false);

    const definirMes = (e) => {
        guardarNombreMes(e.target.value)
    }

    const agregarMes = (e) => {
        e.preventDefault();
        
        //validar
        if (nombreMes.trim() === ""){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMes(nombreMes);
        actualizarPregunta(false)
    }

    return ( 
        <>
            <h2>Elije el Mes</h2>
            {error ? <Error mensaje= "El mes es obligatorio"/> : null}
            <form
                onSubmit={agregarMes}
            >
                <input
                    type= "text"
                    className="u-full-width"
                    placeholder="Coloca el mes"
                    onChange={definirMes}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Mes"
                />
            </form>
        </>
     );
}
 
export default PreguntaMes;