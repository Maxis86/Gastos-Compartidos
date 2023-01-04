import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Registrarse } from "./pages/Registrarse.js";
import { Login } from "./pages/Login.js";
import { Datos } from "./pages/Datos.js";


import App from "./App";
import AlertaState from "./context/alertas/alertaState";
import LoginState from "./context/login/loginState.js";
import Prueba from "./components/Prueba.js";
import tokenAuth from "./config/token";

import RutaPrivada from "./pages/RutaPrivada.js";
import NombreServicioState from "./context/nombreServicio/nombreServicioState.js";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

export const AppRouter = () => {
  return (
    <NombreServicioState>
      <AlertaState>
        <LoginState>
          <BrowserRouter>
            <div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Registrarse" element={<Registrarse />} />
                <Route exact path="/Datos" element={<Datos />} />
                <Route
                  exact
                  path="/Home"
                  //element={<RutaPrivada component={<App />} />}
                  element={<App />} />
                
                {/* <RutaPrivada exact path="/Home" element={<App />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
        </LoginState>
      </AlertaState>
    </NombreServicioState>
  );
};
