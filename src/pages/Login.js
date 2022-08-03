import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import AlertaContext from "../context/alertas/alertaContext";

import "./login.css";
import "./spinner.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styled from "@emotion/styled";

const Titulo = styled.h2`
  margin: 0 auto;
  font-family: "Merriweather", serif;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Login = () => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

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

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Los dos campos son obligatorios", "alerta-error");
      setError(true);
      return;
    }

    setError(false);

    // Pasarlo al action
    signInWithEmailPassword();

    guardarUsuario({
      email: "",
      password: "",
    });
  };

  const signInWithEmailPassword = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Logeado");
        console.log(user);

        setSpinner(true);

        setTimeout(() => {
          setSpinner(false);
          return history("../Home");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    // [START auth_signin_password]
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     //Signed in
    //     const user = userCredential.user;
    //     console.log("user");
    //     console.log(user);
    //     setUsuarioLogeado(true);

    //     setSpinner(true);

    //     setTimeout(() => {
    //       setSpinner(false);
    //       return history.push("/");

    //     }, 3000);
    //   })
    //   .catch((error) => {
    //     mostrarAlerta("Error", "alerta-error");
    //   });
  };

  return (
    <div className="login">
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <Titulo className="mb-5"> Iniciar Sesión</Titulo>
          {error ? (
            <div class="alert alert-danger" role="alert">
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
              activeClassName="active"
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
