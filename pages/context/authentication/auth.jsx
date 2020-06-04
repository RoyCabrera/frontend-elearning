import AuthContext from './authContext';
import clienteAxios from '../../config/axios';
import Cookie from 'universal-cookie';
import { useState,useReducer } from 'react';
import AuthReducer from './authReducer';
import tokenAuth from '../../config/token';
import  Router  from 'next/router';
const cookie = new Cookie();



import { 
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types/index';


const Auth = props => {

  const initialState = {
    token: null,
    autenticado: null,
    usuario: null,
    mensaje: null,
  }

  const [ state, dispatch ] = useReducer(AuthReducer, initialState);

  //const [auth,setAuth] = useState(initialState);
  const registrar = async (valores) => {
    try {
      const response = await clienteAxios.post('/api/users',valores);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data
      });
      usuarioAutenticado();
      console.log("registrado");

    } catch (error) {

      console.log("Hubo un error al crear usuario:",error.response.data.message);
      const alerta = {
        message: error.response.data.message,
        categoria: 'alerta-error'
      }

      dispatch({
          type: REGISTRO_ERROR,
          payload: alerta
      })


    }
  }
  const usuarioAutenticado = async () => {


    /********************************* */


    const token = cookie.get('token');
        if(token) {
            tokenAuth(token);
            const respuesta = await clienteAxios.get('/api/auth');
            console.log("xxxxxxxxxxxxxxxxxx");

            console.log(respuesta.data);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            });
        }else{


          dispatch({
            type: LOGIN_ERROR
        })
        }


  }

  const cerrarSesion = () => {

    dispatch({
      type:CERRAR_SESION
    })


    Router.push('/');

  }



  const iniciarSesion = async (valores) => {
    try {

      const respuesta = await clienteAxios.post('/api/auth',valores);
      dispatch({
        type:LOGIN_EXITOSO,
        payload:respuesta.data
      })
      usuarioAutenticado();
      console.log("bienvenido");

    } catch (error) {
      console.log("Hubo un error al iniciar sesión:",error.response.data.message);
      const alerta = {
        message: error.response.data.message,
        categoria: 'alerta-error'
      }

      dispatch({
          type: LOGIN_ERROR,
          payload: alerta
      })
    }
  }


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrar,
        usuarioAutenticado,
        cerrarSesion,
        iniciarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )

}

export default Auth;