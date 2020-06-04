import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import validarIniciarSesion from "../../../validacion/validarIniciarSesion";
import useValidacion from "../../hooks/useValidacion";
import AuthContext from "../../context/authentication/authContext";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, login);

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  useEffect(() => {
    if (autenticado) {
      Router.push("/");
    }

    if (mensaje) {
      // mostrar error
      console.log(mensaje.message);
    }
  }, [mensaje, autenticado]);
  const { email, password } = valores;

  async function login() {
    await iniciarSesion(valores);
  }

  return (
    <>
      <div className="nav-item">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link "
              href="http://example.com"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Ingresar
            </a>
            <div className="dropdown-menu ">
              <form
                className="form-horizontal register_form"
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  className="form-control login"
                  type="email"
                  id="email_login"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <input
                  className="form-control login"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <input
                  className="btn-warning "
                  type="submit"
                  name="submit"
                  value="Iniciar sesión"
                />
              </form>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Login;
