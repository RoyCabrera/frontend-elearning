import Link from 'next/link';
import {useContext} from 'react';
import AuthContext from '../../context/authentication/authContext';

const Navegacion = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario } = authContext;
  return (
    <>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link">Inicio</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/categorias">
            <a className="nav-link">Categorias</a>
          </Link>
        </li>
        {
          usuario ?(<li className="nav-item">
          <Link href="/cursos">
            <a className="nav-link">Mis cursos</a>
          </Link>
        </li>) : null
        }

      </ul>
    </>
  );
}

export default Navegacion;