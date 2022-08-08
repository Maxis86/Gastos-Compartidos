import React, {useContext} from 'react';

import MostrarGasto from './MostrarGasto';

import gastosContext from '../context/gastos/gastosContext';

const ListadoM = () => {

    const gastoContext = useContext(gastosContext);
    const {gastosMaxi} = gastoContext;

    return ( 
        
        <>
            <div style={{marginRight:8}}>
                {gastosMaxi && gastosMaxi.map((gasto,index) => (
                    <MostrarGasto
                        key={index}
                        gasto={gasto}
                    />
                )) }
                
            </div>
        </>
    );
}
 
export default ListadoM;