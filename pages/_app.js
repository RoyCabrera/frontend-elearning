import App from 'next/app';
import Router from 'next/router';
import authentication,{AuthContext} from './context/authentication';
import Auth from './context/authentication/';
import { useEffect } from 'react';
import clienteAxios from './config/axios';
import Cookie from 'universal-cookie';
import tokenAuth from './config/token';

const MyApp = (props) => {

  const { Component, pageProps } = props;



    const token1 = new Cookie();
    const userToken =  token1.get('token');



  if(userToken){
    // funcion para enviar el token por headers
    tokenAuth(userToken)
  }

  /* const usuarioAutenticado = async () => {

    const token1 = new Cookie();
    const userToken =  token1.get('token');

    if(userToken){
      // funcion para enviar el token por headers
      tokenAuth(userToken)
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth');
      authentication.usuario= respuesta.data;
      authentication.mensaje= "Acceso correcto";
      authentication.autenticado = true;


    } catch (error) {
      console.log(error.response.data.msg);
      authentication.mensaje="error al registrar";

    }
  } */

  //usuarioAutenticado();

  return(
    <Auth>
       <Component {...pageProps} />
    </Auth>
  )

}

export default MyApp;