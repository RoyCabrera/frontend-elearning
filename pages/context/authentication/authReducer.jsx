
import { 
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types/index';

import Cookie from 'universal-cookie';

const cookie = new Cookie();

export default (state, action) => {
  switch(action.type) {
      case REGISTRO_EXITOSO:
      case LOGIN_EXITOSO:
        cookie.set('token', action.payload.token);
        return {
            ...state,
            autenticado: true,
            /* usuario:action.payload.data, */
            mensaje: null
        }



      case OBTENER_USUARIO:
          return {
              ...state,
              autenticado: true,
              usuario: action.payload.usuario,

          }
      case CERRAR_SESION:
      case LOGIN_ERROR:
      case REGISTRO_ERROR:

        cookie.remove('token')
        return {
            ...state,
            token: null,
            usuario: null,
            autenticado: false,
            mensaje: null,

        }

      default:
          return state;
  }
}