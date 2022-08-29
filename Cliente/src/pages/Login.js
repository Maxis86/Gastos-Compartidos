import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import clienteAxios from "../config/axios";

import AlertaContext from "../context/alertas/alertaContext";
import LoginContext from "../context/login/loginContext";

import "./login.css";
import "./spinner.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styled from "@emotion/styled";
import tokenAuth from "../config/token";

const Titulo = styled.h2`
  margin: 0 auto;
  font-family: "Merriweather", serif;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Login = (props) => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta, ocultarAlerta } = alertaContext;

  const loginContext = useContext(LoginContext);
  const { mensaje, autenticado, iniciarSesion } = loginContext;

  const [yaLogeado, setYaLogeado] = useState(false);

  const history = useNavigate();

  const [spinner, setSpinner] = useState(false);

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);

  // extraer de usuario
  const { email, password } = usuario;

  useEffect(() => {

    if (autenticado) {
      
      return history("/home");
    }

    if (mensaje) {
      setError(true);
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line

  }, [mensaje, autenticado]);


  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  
  // Cuando el usuario quiere iniciar sesión
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      setError(true);
      mostrarAlerta("Los dos campos son obligatorios", "alerta-error");
      return;
    }

    ocultarAlerta();

    setError(false);

    // Pasarlo al action
    //signInWithEmailPassword();

    console.log("iniciar sesión");
    await iniciarSesion({ email, password });

    guardarUsuario({
      email: "",
      password: "",
    });
  };

  //firebase
  // const signInWithEmailPassword = async() => {

  //   // Firebase
  //   // const auth = getAuth();
  //   // signInWithEmailAndPassword(auth, email, password)
  //   //   .then((userCredential) => {
  //   //     // Signed in
  //   //     const user = userCredential.user;
  //   //     console.log("Logeado");
  //   //     console.log(user);

  //   //     setSpinner(true);

  //   //     setTimeout(() => {
  //   //       setSpinner(false);
  //   //       return history("../Home");
  //   //     }, 3000);
  //   //   })
  //   //   .catch((error) => {
  //   //     const errorCode = error.code;
  //   //     const errorMessage = error.message;
  //   //   });

  // };

  return (
    <div className="login">
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <Titulo className="mb-5"> Iniciar Sesión</Titulo>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {alerta.msg}
            </div>
          ) : null}

          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <div className="campo-form">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu Email"
                value={email}
                onChange={onChange}
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="campo-form">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={password}
                onChange={onChange}
              />
            </div>

            {/* <NavLink activeClassName="active" className="navLink" to="../">
              ir a Inicio
            </NavLink> */}

            {/* {usuarioLogeado ? (
              <p className="mt-4">Usuario Registrado</p>
            ) : (
              <p className="mt-4">Usuario No Registrado</p>
            )} */}

            {spinner ? (
              <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>
            ) : (
              <div className="campo-form mt-5 d-flex justify-content-center ">
                <input
                  type="submit"
                  className="btn btn-outline-primary "
                  value="Iniciar Sesión"
                />
              </div>
            )}

            <NavLink
              // activeClassName="active"
              className="navLink"
              to="../Registrarse"
            >
              Registrarse
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};
