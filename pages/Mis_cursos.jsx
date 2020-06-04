import Layout from './components/layout/Layout';
import {useContext, useEffect, useState} from 'react';
import AuthContext from './context/authentication/authContext';
import Error404 from './components/layout/Error404';
import clienteAxios from './config/axios';
import MiCurso from './components/landing/MiCurso';

const Cursos = () => {

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario } = authContext;

  const [misCursos,setMisCursos] = useState([]);

  useEffect(()=> {

    if(usuario){
      const getCursosInscritos = async () => {


      const response = await clienteAxios.get(`/api/cursos_matriculados/${usuario.id}`)
      setMisCursos(response.data.misCursos)
      /* console.log(response.data); */



      }
      getCursosInscritos()
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
                  <h1 className="mb-3">Mis cursos</h1>

                </div>
              </div>
            </div>
            <div className="row">
              {misCursos.map((curso) => (
                <MiCurso key={curso.id} curso={curso} />
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

export default Cursos;