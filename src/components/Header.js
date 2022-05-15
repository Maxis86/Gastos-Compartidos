import React, {useState} from "react";

import { NavLink } from 'react-router-dom';

// import { Imagen } from './Imagen';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import styled from "@emotion/styled";

const EnlaceHome = styled.h1`
  font-size: 500%;
  color: black;
  text-align: center;
  font-family: 'Krona One', sans-serif;
  font-family: 'Lobster', cursive;
`;
const Encabezado = styled.div`
  padding: 1rem;
  font-family: "PT Serif", serif;
`;
const Logeado = styled.p`
  padding: 1rem;
  font-size: 150%;
  display: flex;
  justify-content: center;
  font-family: "PT Serif", serif;
  margin: 3px
`;
const Titulo = styled.div`
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Nav = styled.nav`
  display: flex;
  /* justify-content: left; */
  
  @media (min-width: 768px) {
    
  }
`;

export const Header = () => {

      const [usuario, guardarUsuario] = useState();

      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          guardarUsuario(user.displayName)  
          // ...
        } else {
          // User is signed out
          // ...
        }
      });


      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     guardarUsuario(user)          
      //   } else {
      //       //console.log("usuario no Logeado")
      //   }
      // });



      const cerrarSesion =() => {
        firebase.auth().signOut().then(() => {
          guardarUsuario("")
        }).catch((error) => {
          //console.log("usuario no Logeado error")
          // An error happened.
        });

      }

  return (
    <>
      <Encabezado>
        
        <Titulo>
          {/* <Imagen/> */}
        
          <EnlaceHome >
            Gastos Compartidos
          </EnlaceHome>
         
          <Nav>
          
          { !usuario ? (
                        <>
                            <NavLink activeClassName="active" className="link-secondary nav-link" to='../registrarse'> Crear Cuenta</NavLink>
                            <NavLink activeClassName="active" className="link-secondary disabled nav-link" to='../login'>|</NavLink>
                            <NavLink activeClassName="active" className="link-secondary nav-link" to='../login'>Iniciar Sesión</NavLink>
                        </>
                    ) : (
                        <>
                          <Logeado>Hola {usuario} </Logeado> 

                          <button 
                            type="button" 
                            class="btn btn-light btn-sm m-3" 
                            onClick={cerrarSesion}
                          >
                          Cerrar Sesión
                          </button>
                          
                        </>
            ) }
            
            </Nav>
        </Titulo>
        
      </Encabezado>
      
    </>
  );
};
