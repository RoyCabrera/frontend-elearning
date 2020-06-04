import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Global, css } from "@emotion/core";

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
        `}
      />

      <header className="header_area">
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

                  <li className="nav-item submenu dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Especialidades
                    </a>

                    <ul className="dropdown-menu">
                      {categorias.map((categoria) => (
                        <ListaCategorias
                          key={categoria.id}
                          categoria={categoria}
                        />
                      ))}
                    </ul>
                  </li>

                  {usuario ? (
                    <>
                      <li className="nav-item">
                        <Link href="/Mis_cursos">
                          <a className="nav-link">Mis cursos</a>
                        </Link>
                      </li>
                      {
                        usuario.roleId === 2 ? (
<>
                          <li className="nav-item">
                          <Link href="/crear_curso">
                            <a className="nav-link">crear curso</a>
                          </Link>
                        </li>
                        <li className="nav-item">
                        <Link href="/mis_cursos_impartidos">
                          <a className="nav-link">Mis cursos impartidos</a>
                        </Link>
                      </li></>) : null
                      }

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
                              <a className="nav-link" >
                                Ajustes
                              </a>
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
