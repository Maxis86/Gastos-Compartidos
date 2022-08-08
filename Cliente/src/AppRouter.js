import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Registrarse } from "./pages/Registrarse.js";
import { Login } from "./pages/Login.js";
import App from "./App";
import AlertaState from "./context/alertas/alertaState";
import LoginState from "./context/login/loginState.js";
import Prueba from "./components/Prueba.js";

export const AppRouter = () => {
  return (
    <AlertaState>
      <LoginState>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Registrarse" element={<Registrarse />} />
              <Route exact path="/Home" element={<App />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LoginState>
    </AlertaState>
  );
};
