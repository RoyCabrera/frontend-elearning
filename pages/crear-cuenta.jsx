
import Layout from './components/layout/Layout';
import Link from 'next/link';
import Router from 'next/router';
import useValidacion from './hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
import auth from './context/authentication/auth';
import Cookie from 'universal-cookie';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/authentication';



const STATE_INICIAL = {

  name:'',
  last_name:'',
  email:'',
  password:'',

}


const CrearCuenta = (props) => {

  const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,validarCrearCuenta,creacionCuenta)

  const authContext = useContext(AuthContext);

  const {mensaje,autenticado,registrar}=authContext;

  useEffect(()=> {
    if(autenticado){
      Router.push('/')
    }

    if(mensaje){
      // mostrar error
      console.log(mensaje.message);

    }
  },[mensaje,autenticado,props.history]);

  async function creacionCuenta(){


    await registrar(valores);


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

              {mensaje ?  (<div className="alert alert-danger">
                {mensaje.message}
              </div>): null}


            </form>
          </article>
        </div>
      </Layout>
    </div>
  );
}

export default CrearCuenta;