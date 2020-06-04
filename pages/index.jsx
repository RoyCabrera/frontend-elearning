import {useState,useEffect,useContext} from 'react';
import Layout from './components/layout/Layout';
import clienteAxios from './config/axios';
import Cursos from './components/landing/Cursos';
import Categorias from './components/landing/Categorias';
import AuthContext from './context/authentication/authContext';
import Link from 'next/link';

const Home = () => {

  const [cursos,setCursos]=useState([]);
  const [categorias,setCategorias] = useState([]);
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario } = authContext;

  useEffect(()=>{
    const obtenerCursos = async () => {

      const response = await clienteAxios.get('/api/courses');
      console.log(response.data.data);

      const responseCategorias = await clienteAxios.get('/api/categories');
      guardarCategorias(responseCategorias.data.categories);
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

  const guardarCategorias = (categorias) => {

    const categoriasObtenidas = categorias.map(categoria => {
      return {
        id:categoria.id,
        ...categoria
      }
    });
    setCategorias(categoriasObtenidas);

  }

  return (
    <Layout>
      <div>
        <section className="home_banner_area">
          <div className="banner_inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="banner_content text-center">
                    <p className="text-uppercase">
                      Plataforma de formación online de la universidad Autónoma del Perú
                    </p>
                    <h2 className="text-uppercase mt-4 mb-5">
                      Domina la tecnología
                    </h2>
                    <div>
                      <a href="#nuestros_cursos" className="primary-btn mb-3 mb-sm-0">
                        Nuestros cursos
                      </a>
                      {
                        !usuario ? (
                          <>
                            <Link href="/crear-cuenta">
                              <a className="primary-btn ml-sm-3 ml-0">
                                Crear cuenta
                              </a>
                            </Link>
                          </>
                        ) : null
                      }


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="feature_area section_gap_top">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="main_title">
                  <h1 className="mb-3">Especialidades</h1>
                  <p>
                    Rutas de aprendizaje preparadas en detalle por nuestros expertos
                  </p>
                </div>
              </div>
            </div>
            <div className="row">

              {
                categorias.map(categoria=>(
                  <Categorias key={categoria.id} categoria={categoria} />
                ))
              }

            </div>
          </div>
        </section>
        <div className="popular_courses" id="nuestros_cursos">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="main_title">
                  <h1 className="mb-3">Nuestros cursos</h1>
                  <p>
                    Acceso gratis a todos nuestros cursos
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              {cursos.map((curso) => (
                <Cursos key={curso.id} curso={curso} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Home;