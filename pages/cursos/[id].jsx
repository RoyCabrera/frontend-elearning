import {useEffect, useState,useContext} from 'react';
import { useRouter } from "next/router";


import Layout from "../components/layout/Layout";
import clienteAxios from '../config/axios';
import Error404 from '../components/layout/Error404';
import Goals from '../components/ui/Goals';
import AuthContext from '../context/authentication/authContext';
const Curso = () => {

  const router = useRouter();
  const [curso,setCurso] = useState({});
  const [error,setError] = useState(false);
  const [goals,setGoals] = useState({});

  const [mensajeInscripcion,setMensajeInscripcion] = useState(false);
  const [mensaje,setMensaje] = useState("");
  const [color,setColor] = useState("");

  const authContext = useContext(AuthContext);
  const {usuario}=authContext;

  const {
    query: { id },
  } = router;

  useEffect(()=>{
    if(id){

      const obtenerDatosCurso = async () => {
        const response = await clienteAxios.get(`/api/courses/${id}`);
        const responseGoals = await clienteAxios.get(`/api/goals/${id} `);

        if(response.data.course && responseGoals.data.goals){
          setGoals(responseGoals.data.goals);
          setCurso(response.data.course);
        }else {
          setError(true);

        }

      }
      obtenerDatosCurso();
    }
  },[id,usuario]);

  /* const coursesEnrolled = async () => {
      // validar si ya esta inscrito en el curso

        if(usuario){
          const course_student = {
            courseId:id,
            userId:usuario.id
          }
          console.log(course_student);

          const response = await clienteAxios.post('/api/courses_enrolled',course_student);
          console.log(response.data);

        }
  } */

  const enrollCourse = async () => {

    if(!usuario){
        return alert("debes iniciar sesión")
    }
    const datos = {
        courseId:id,
        userId:usuario.id
    }
    // enrollarse al curso
    setMensajeInscripcion(true);
    const response = await clienteAxios.post(`/api/courses/enroll`,datos);
    console.log(response.data);

    setMensaje(response.data.message);
    if(response.data.enroll){
      setColor('mt-2 alert alert-success')
    }else{
      setColor('mt-2 alert alert-warning')
    }

  }


if(error) return <Error404/>

if(Object.keys(curso).length === 0 && !error)  return <Layout><div className ="section_gap text-center">Cargando...</div></Layout>;
const {name,description,teacher,level,category} = curso;
/* console.log(curso); */

  return (

      <Layout>
    <>
    <section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="banner_content text-center">
                <h2>{name} </h2>
                <div className="page_link">
                  <p> Nivel: {level.name} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="course_details_area section_gap">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 course_details_left">
                    <div className="main_image">
                        <img className="img-fluid" src="/img/courses/course-details.jpg" alt=""/>
                    </div>
                    <div className="content_wrapper">
                        <h4 className="title">Lo que aprenderás</h4>
                        <div className="content">

                            <ul className="unordered-list">
                              {
                                goals.map(goal=>(
                                <Goals key={goal.id} goal={goal} />
                                ))
                              }

                            </ul>


                        </div>

                        <h4 className="title">Descripción</h4>
                        <div className="content">
                            {description}
                        </div>

                        <h4 className="title">Contenido del curso</h4>
                        <div className="content">
                            <ul className="course_list">
                                <li className="justify-content-between d-flex">
                                    <p>Introduction Lesson</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Basics of HTML</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Getting Know about HTML</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Tags and Attributes</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Basics of CSS</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Getting Familiar with CSS</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Introduction to Bootstrap</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Responsive Design</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>
                                <li className="justify-content-between d-flex">
                                    <p>Canvas in HTML 5</p>
                                    <a className="primary-btn text-uppercase" href="#">View Details</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 right-contents">
                    <ul>
                        <li>
                            <a className="justify-content-between d-flex" href="#">
                                <p>Tutor</p>
                                <span className="or">{teacher.user.name} {teacher.user.last_name} </span>
                            </a>
                        </li>
                        <li>
                            <a className="justify-content-between d-flex" href="#">
                                <p>Precio</p>
                                <span>Gratis</span>
                            </a>
                        </li>

                    </ul>
                    <button  className="primary-btn2 text-uppercase enroll rounded-0 " onClick={enrollCourse} >Tomar el curso</button>

                    {
                      mensajeInscripcion ? (<div className={color} >{mensaje} </div>) :null
                    }


                    <h4 className="title">Review</h4>
                    <div className="content">
                        <div className="review-top row pt-40">
                            <div className="col-lg-12">
                                <h6 className="mb-15">Puntuación del curso</h6>
                                <div className="d-flex flex-row reviews justify-content-between">
                                    <span>Quality</span>
                                    <div className="star">
                                        <i className="ti-star checked"></i>
                                        <i className="ti-star checked"></i>
                                        <i className="ti-star checked"></i>
                                        <i className="ti-star"></i>
                                        <i className="ti-star"></i>
                                    </div>
                                    <span>Outstanding</span>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>
</>

      </Layout>

  );
};

export default Curso;
