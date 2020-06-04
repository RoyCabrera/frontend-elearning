const ListaCategorias = ({categoria}) => {



  return (

      <>

                    <li className="nav-item">
                      <a className="nav-link" href="#">{categoria.name} </a>
                    </li>


      </>
   );
}

export default ListaCategorias;