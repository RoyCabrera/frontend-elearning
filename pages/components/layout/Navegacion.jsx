import Link from 'next/link';

const Navegacion = () => {
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
        <li className="nav-item">
          <Link href="/cursos">
            <a className="nav-link">Mis cursos</a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Navegacion;