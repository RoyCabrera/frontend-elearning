import {useReducer} from 'react';
import AuthContext from '../../context/authentication/authContext';
import AuthReducer from '../../context/authentication/authReducer';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";


const AuthState = (props) => {



  const initialState = {
    token:null,
    autenticado:null,
    usuario:null,
    mensaje:null
  };

  const [state,dispatch] = useReducer(AuthReducer,initialState);

  return(
    <AuthContext.Provider

    value={{
      token:state.token,
      autenticado:state.autenticado,
      usuario:state.usuario,
      mensaje:state.mensaje
    }}

    >
       {props.children}
    </AuthContext.Provider>
  )

}

export default AuthState;