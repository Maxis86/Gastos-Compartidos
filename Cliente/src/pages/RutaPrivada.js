import React, {useContext, useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import App from '../App';
import LoginContext from "../context/login/loginContext";

const RutaPrivada = ({ component: Component, ...props  }) => {

  const loginContext = useContext(LoginContext);
  const { mensaje, autenticado, usuarioAutenticado } = loginContext;

  useEffect(() => {
    
    usuarioAutenticado();

  }, [])
  
  if(autenticado) {
    return (
      <App />
    )
  }else {
    return (
      <Navigate to="/" />
    )
  }

  
}

export default RutaPrivada
