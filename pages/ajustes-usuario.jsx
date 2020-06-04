import {useContext, useEffect, useState} from 'react';
import AuthContext from './context/authentication/authContext';

import useValidacion from './hooks/useValidacion';
import validarActualizarCuenta from '../validacion/validarActualizarCuenta';
import Layout from './components/layout/Layout';
import clienteAxios from './config/axios';



const AjustesUsuario = (props) => {

  const authContext = useContext(AuthContext);
  const {usuario}=authContext;

  const [user,setUser] = useState({
    id:"",
    name:"",
    last_name:"",
    password:""
  })

  useEffect(()=>{

    if(usuario){
      setUser({
        id:usuario.id,
        name:usuario.name,
        last_name:usuario.last_name,
        password:''
      })

    }

  },[authContext])

    const handleChange = e => {
      setUser({
          ...user,
          [e.target.name] : e.target.value
      })
  }
    const {name,last_name,password}=user;

  const submitEditarUsuario = async (e) => {
    e.preventDefault();
    const response = await clienteAxios.put(`/api/users/${user.id}`,user);
    console.log(response.data);


  }

  const convertirseDocente = async () => {

    const datos = {
      id:user.id,
      roleId:2
    }
    const response = await clienteAxios.put(`/api/users/convertirse_docente/${user.id}`,datos);
    console.log(response.data);

  }


  return (
    <div>
      <Layout>
      {
        usuario ? (
<div className="section_gap ">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 offset-lg-3">
            <div className="register_form border border-warning rounded">
              <h3>Ajustes de usuario</h3>
              <p>Completa todo el formulario</p>
              <form
                className="form_area"
                 className="needs-validation" onSubmit={submitEditarUsuario}
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
                    />

                    <input
                      name="last_name"
                      id="last_name"
                      value={last_name}
                      placeholder="Apellidos"
                      type="text"
                      onChange={handleChange}
                    />

                    {/* <input

                      placeholder="Titúlo"
                      type="text"
                      name="titulo"
                      id="titulo"

                    />
                    <input

                      placeholder="Biografía"
                      id="biografia"
                    /> */}

                    <input

                      placeholder="Nueva contraseña"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />

                  </div>
                  <div className="col-lg-12 text-center">
                    <button className="primary-btn" type="submit" >Guardar cambios</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <hr/>
        {
          usuario.roleId === 3 ? (<div className="row">
          <div className="col-lg-6 offset-lg-3">
          <button className="genric-btn info-border radius btn-block" onClick ={convertirseDocente} >
              Convertirse en docente <span className="ti-user"></span>
          </button>
          </div>

        </div>) : null
        }

      </div>
    </div>

        ) : null
      }

      </Layout>
    </div>



  );
}

export default AjustesUsuario;