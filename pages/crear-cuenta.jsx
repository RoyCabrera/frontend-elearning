
import Layout from './components/layout/Layout';
import Router from 'next/router';
import useValidacion from './hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
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

      <div className="section_gap ">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="row " id="clockdiv">
              <div className="col-lg-12">
                <h1 className="mb-3">Regístrate Gratis</h1>
                <p>
                  There is a moment in the life of any aspiring astronomer that
                  it is time to buy that first telescope. It’s exciting to think
                  about setting up your own viewing station.
                </p>
              </div>


            </div>
          </div>
          <div className="col-lg-4 offset-lg-1">
            <div className="register_form border border-warning rounded">
              <h3>Regístrate Gratis</h3>
              <p>Completa todo el formulario</p>
              <form
                className="form_area"
                onSubmit={handleSubmit} className="needs-validation" noValidate
              >
                <div className="row">
                  <div className="col-lg-12 form_group">
                    <input
                      placeholder="Nombre"
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errores.name && <p className="text-danger text-center">{errores.name} </p>}
                    <input
                      name="last_name"
                      id="last_name"

                      placeholder="Apellidos"
                      type="text"
                      value={last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errores.last_name && <p className="text-danger text-center">{errores.last_name} </p>}
                    <input

                      placeholder="Correo Electrónico"
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errores.email && <p className="text-danger text-center">{errores.email} </p>}
                    <input

                      placeholder="Contraseña"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
{errores.password && <p className="text-danger text-center">{errores.password} </p>}
                  </div>
                  <div className="col-lg-12 text-center">
                    <button className="primary-btn" type="submit" >Crear cuenta</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      </Layout>
    </div>



  );
}

export default CrearCuenta;