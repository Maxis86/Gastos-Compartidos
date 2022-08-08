import React, {useContext} from 'react';

import MostrarGasto from './MostrarGasto';

import gastosContext from '../context/gastos/gastosContext';

const Listado = () => {

    const gastoContext  = useContext(gastosContext);
    const {gastosGigi} = gastoContext;

    return ( 
        
        <>
            <div >
                {gastosGigi && gastosGigi.map((gasto,index) => (
                    <MostrarGasto
                        key={index}
                        gasto={gasto}
                    />
                )) }
                
            </div>
        </>
    );
}
 
export default Listado;