import React, { useReducer } from "react";

import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2'

import loginReducer from "./loginReducer";
import loginContext from "./loginContext";
import tokenAuth from '../../config/token';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const LoginState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  //Funciones

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Registro exitoso'
      })

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      // Obtener el usuario
      usuarioAutenticado();
      
    } catch (error) {
      console.log(error.response.data.errors[0]);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const iniciarSesion = async ({ email, password }) => {
    
    try {
      const respuesta = await clienteAxios.post("/api/auth/login", {
        correo: email,
        password: password,
      });

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Inició sesión con éxito'
      })

      // Obtener el usuario
      usuarioAutenticado();
      

    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });

      return false
    }
  };

  
  // Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
  //Cierra la Sesion
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <loginContext.Provider
      value={{
        usuario:state.usuario,
        autenticado: state.autenticado,
        cargando:state.cargando,
        mensaje: state.mensaje,
        iniciarSesion,
        registrarUsuario,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginState;
