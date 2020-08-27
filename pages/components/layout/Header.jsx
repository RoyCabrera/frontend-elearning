import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Global, css } from "@emotion/core";
import Router  from "next/router";
import AuthContext from "../../context/authentication/authContext";
import Login from "../ui/login";
import clienteAxios from "../../config/axios";
import ListaCategorias from "./ListaCategorias";
//import authentication,{AuthContext} from '../../context/authentication';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = authContext;

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const response = await clienteAxios.get("/api/categories");
      guardarCategorias(response.data.categories);
    };
    getCategorias();
    usuarioAutenticado();
  }, []);

  const guardarCategorias = (categorias) => {
    const categoriasObtenidas = categorias.map((categoria) => {
      return {
        id: categoria.id,
        ...categoria,
      };
    });
    setCategorias(categoriasObtenidas);
  };

  return (
    <>
      <Global
        // estilos para el nav más alto
        styles={css`
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
          .editor {
            border: 1px solid;

          }
          .output-code{
            border: 1px #b5b5b5 solid;
            background: #f5f5f5;
            width:1000px;
            height:150px;
          }
          .ide{
            height:600px;
          }
          .code{
            border: 1px solid
          }
        `}
      />

      <header className="header_area fixed-top">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link href="/">
                <a className="navbar-brand logo_h">
                  <img src="/img/logo_autonoma4.png" alt="" />
                </a>
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
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <div
                className="collapse navbar-collapse offset"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav menu_nav ml-auto">
                  <li className="nav-item">
                    <Link href="/">
                      <a className="nav-link">Inicio</a>
                    </Link>
                  </li>







                  {usuario ? (
                    <>
                    <li className="nav-item submenu dropdown">
                        <a
                          href="#"
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Code
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                          <li className="nav-item">
                    <Link href="/editor">
                      <a className="nav-link">Mi Editor</a>
                    </Link>
                  </li>
                          </li>

                          <li className="nav-item">

                      <a className="nav-link" href="/ide">IDE</a>

                  </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link href="/Mis_cursos">
                          <a className="nav-link">Mis cursos</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/publicaciones">
                          <a className="nav-link">Publicaciones</a>
                        </Link>
                      </li>
                      {usuario.roleId === 2 ? (
                        <>
                          <li className="nav-item">
                            <Link href="/crear_curso">
                              <a className="nav-link">crear curso</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link href="/mis_cursos_impartidos">
                              <a className="nav-link">Impartidos</a>
                            </Link>
                          </li>
                        </>
                      ) : null}
                      {usuario.roleId === 1 ? (
                        <>
                          <li className="nav-item">
                            <Link href="/gestion_cursos">
                              <a className="nav-link">Gestionar cursos</a>
                            </Link>
                          </li>
                        </>
                      ) : null}

                      <li className="nav-item submenu dropdown">
                        <a
                          href="#"
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {usuario.name} {usuario.last_name}
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link href="/ajustes-usuario">
                              <a className="nav-link">Ajustes</a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link href="/">
                              <a
                                className="nav-link text-danger"
                                onClick={() => cerrarSesion()}
                              >
                                Cerrar sesión
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <Login />

                      <li className="nav-item">
                        <Link href="/crear-cuenta">
                          <a className="nav-link">Crear Cuenta</a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
