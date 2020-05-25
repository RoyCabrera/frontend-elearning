import { useContext, useEffect } from "react";
import Link from "next/link";
import { Global, css } from "@emotion/core";
import Navegacion from "./Navegacion";
import Buscar from "../ui/Buscar";
import AuthContext from "../../context/authentication/authContext";
import Login from "../ui/login";
//import authentication,{AuthContext} from '../../context/authentication';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = authContext;
  /* ; */

  useEffect(() => {

      usuarioAutenticado();


  }, []);

  return (
    <>
      <Global
        // estilos para el nav más alto
        styles={css`
          .navbar {
            min-height: 80px;
          }

          /*  .navbar-brand {
          padding: 0 15px;
          height: 80px;
          line-height: 80px;
        } */

          .navbar-toggle {
            /* (80px - button height 34px) / 2 = 23px */
            margin-top: 23px;
            padding: 9px 10px !important;
          }

          @media (min-width: 768px) {
            .navbar-nav > li > a {
              /* (80px - line-height of 27px) / 2 = 26.5px */
              padding-top: 26.5px;
              padding-bottom: 26.5px;
              line-height: 27px;
            }
          }

          .divider-text {
            position: relative;
            text-align: center;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .divider-text span {
            padding: 7px;
            font-size: 12px;
            position: relative;
            z-index: 2;
          }
          .divider-text:after {
            content: "";
            position: absolute;
            width: 100%;
            border-bottom: 1px solid #ddd;
            top: 55%;
            left: 0;
            z-index: 1;
          }

          article {
            max-width: 400px;
          }

          .input-select-phone {
            max-width: 90px;
          }
          .estilos-login {
            padding: 15px;
            padding-bottom: 10px;
          }
          .login {
            margin-bottom: 5px;
          }
          .dropdown-menu {
            width: 300px !important;
          }
        `}
      />
      <nav className=" text-center navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand text-warning">E-Learning UA</a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Buscar />
            <Navegacion />

            {usuario ? (
              <>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {usuario.name} {usuario.last_name}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link href="/ajustes">
                        <a className="dropdown-item">Ajustes</a>
                      </Link>

                        <button
                          className="dropdown-item text-danger"
                          onClick={() => cerrarSesion()}
                        >
                          Cerrar sesión
                        </button>

                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <Login />
                <div className="nav-item m-2">
                  <Link href="/crear-cuenta">
                    <a className="btn btn-primary">Crear cuenta</a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
