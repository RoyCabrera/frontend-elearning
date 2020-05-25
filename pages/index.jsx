import {useState,useEffect} from 'react';
import Layout from './components/layout/Layout';
import clienteAxios from './config/axios';

import Cursos from './components/landing/Cursos';

const Home = () => {

  const [cursos,setCursos]=useState([]);

  useEffect(()=>{
    const obtenerCursos = async () => {

      const response = await clienteAxios.get('/api/courses');
      guardarCursos(response.data.data);
  }

    obtenerCursos();
  },[])

  const guardarCursos = (cursos) => {

    const cursosObtenidos = cursos.map(curso => {

      return {
        id:curso.id,
        ...curso
      }
    });
    setCursos(cursosObtenidos);



  }

  return (

      <Layout>
        <div>
        <h1>Mostrar todos los cursos</h1>
        <div className="row">

          {
            cursos.map(curso => (
              <Cursos key={curso.id} curso={curso} />
            ))
          }

        </div>


        </div>

      </Layout>



  );
}

export default Home;