import {useEffect,useState,useContext} from 'react';
import Layout from "./components/layout/Layout"
import AuthContext from './context/authentication/authContext';
import clienteAxios from './config/axios';
import MisImpartidos from './components/landing/MisImpartidos';

const MisCursosImpartidos = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario } = authContext;

  const [misCursosImpartidos,setMisCursosImapartidos] = useState([]);

  useEffect(()=> {

    if(usuario){
      const getCursosImpartidos = async () => {


      const response = await clienteAxios.get(`/api/cursos_impartidos/${usuario.id}`)
      setMisCursosImapartidos(response.data.misCursos)
      console.log(response.data.misCursos);

      }
      getCursosImpartidos()
    }



  },[usuario])

  return (
    <Layout>
    <>
    <div className="section_gap">
    <div className="popular_courses" id="nuestros_cursos">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="main_title">
              <h1 className="mb-3">Mis cursos Impartidos</h1>

            </div>
          </div>
        </div>
        <div className="row">
          {misCursosImpartidos.map((curso) => (
            <MisImpartidos key={curso.id} curso={curso} />
          ))


          }
        </div>
      </div>
    </div>
   {/*  {

      usuario ? (<h1>Mis cursos</h1>) :<Error404/>
    } */}
</div>
</>
  </Layout>
   );
}

export default MisCursosImpartidos;