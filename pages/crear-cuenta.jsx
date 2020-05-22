import Layout from './components/layout/Layout';
import Link from 'next/link';
import useValidacion from './hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
import clienteAxios from './config/axios';
import {useContext,useReducer} from 'react';
import AuthContext from './context/authentication/authContext';
import AuthReducer from './context/authentication/authReducer';


import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "./types/index";

const STATE_INICIAL = {

  name:'',
  last_name:'',
  email:'',
  password:'',

}


const CrearCuenta = () => {

  const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,validarCrearCuenta,creacionCuenta)

  /* const {autenticado,mensaje,token,usuario} = useContext(AuthContext); */
  const [state,dispatch] =  useReducer(AuthReducer)

  async function creacionCuenta(){


    try {
      const response = await clienteAxios.post('/api/users',valores);

      console.log(response.data);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data
      })

    } catch (error) {

    }

  }

  const {name,last_name,email,password} = valores;

  return (
    <div>
      <Layout>
        <div className="mt-3 card bg-light">
          <article className="card-body mx-auto">
            <h4 className="card-  title mt-3 text-center">Regístrate Gratis</h4>

            <p className="divider-text">
              <span className="bg-light">Completa todo el formulario</span>
            </p>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Nombre"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

              </div>
              <div className="form-group">
                  {errores.name && <p className="text-danger text-center">{errores.name} </p>}
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name="last_name"
                  id="last_name"
                  className="form-control"
                  placeholder="Apellidos"
                  type="text"
                  value={last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-group">
                  {errores.last_name && <p className="text-danger text-center">{errores.last_name} </p>}
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-envelope"></i>{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Correo Electrónico"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-group">
                  {errores.email && <p className="text-danger text-center">{errores.email} </p>}
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-group">
                  {errores.password && <p className="text-danger text-center">{errores.password} </p>}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Crear Cuenta
                </button>
              </div>
              <p className="text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login">
                  <a title="Inicia sesión">Iniciar sesión</a>
                </Link>
              </p>
            </form>
          </article>
        </div>
      </Layout>
    </div>
  );
}

export default CrearCuenta;