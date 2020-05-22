
import {useReducer,useState} from 'react';
import AuthContext from './context/authentication/authContext';
import AuthReducer from './context/authentication/authReducer';
/* import AuthState from './context/authentication/authState'; */

/* import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "./types/index"; */


const MyApp = (props) => {

  const { Component, pageProps } = props;


 /*  const initialState = {

  }; */

  const [initialState,setinitialState] = useState({
    token:null,
    autenticado:null,
    usuario:null,
    mensaje:null
  })

  /* const [state,dispatch] = useReducer(AuthReducer,initialState); */

  return(
    <AuthContext.Provider
    value={initialState}>

       <Component {...pageProps} />
    </AuthContext.Provider>
  )

}

export default MyApp;