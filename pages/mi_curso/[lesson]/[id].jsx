import {useEffect, useState,useContext} from 'react';
import { useRouter } from "next/router";
import ReactHtmlParser from 'react-html-parser';

import Layout from "../../components/layout/Layout";
import clienteAxios from '../../config/axios';
import Error404 from '../../components/layout/Error404';
import Goals from '../../components/ui/Goals';
import AuthContext from '../../context/authentication/authContext';
import Lessons from '../../components/landing/Lessons';
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
    query: {
      id:id,
      lesson:lesson
    }
  } = router;

  console.log(router.query.lesson);

  useEffect(()=>{
    if(id){

      const obtenerDatosCurso = async () => {
        const response = await clienteAxios.get(`/api/courses/${id}`);
        const responseGoals = await clienteAxios.get(`/api/goals/${id} `);

        if(response.data.course && responseGoals.data.goals){
          setGoals(responseGoals.data.goals);
          setCurso(response.data.course);
          console.log(response.data.course);

        }else {
          setError(true);

        }

      }
      obtenerDatosCurso();
    }
  },[id]);


  const verVideo = (e)=>{
    console.log(e,"desde el hijo");

  }




if(error) return <Error404/>

if(Object.keys(curso).length === 0 && !error)  return <Layout><div className ="section_gap text-center">Cargando...</div></Layout>;
const {name,description,teacher,level,category,lessons} = curso;
/* console.log(curso); */
/* console.log(lessons[0].url); */


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
                <div className="col-lg-7 course_details_left">
                    <div className="main_image">
                      <div className="">
                    {
                      lessons.length > 0  ? (ReactHtmlParser(lessons[router.query.lesson].url)) : null

                    }
                    </div>
                    </div>
                    <div className="content_wrapper">
                        <h4 className="title">Lo que aprenderás</h4>
                        <div className="content">

                            <ul className="unordered-list">
                              {
                                goals.map(goal=>(
                                <Goals key={goal.id} goal={goal} verVideo={verVideo} />
                                ))
                              }

                            </ul>


                        </div>

                        <h4 className="title">Descripción</h4>
                        <div className="content">
                            {description}
                        </div>
                        <div className="comments-area">
                        <h4>05 Comments</h4>
                        <div className="comment-list">
                            <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                    <div className="thumb">

                                    </div>
                                    <div className="desc">
                                        <h5><a href="#">Emilly Blunt</a></h5>
                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                        <p className="comment">
                                            Never say goodbye till the end comes!
                                        </p>
                                    </div>
                                </div>
                                <div className="reply-btn">
                                    <a href="" className="btn-reply text-uppercase">reply</a>
                                </div>
                            </div>
                        </div>
                        <div className="comment-list left-padding">
                            <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                    <div className="thumb">

                                    </div>
                                    <div className="desc">
                                        <h5><a href="#">Elsie Cunningham</a></h5>
                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                        <p className="comment">
                                            Never say goodbye till the end comes!
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="comment-list left-padding">
                            <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                    <div className="thumb">

                                    </div>
                                    <div className="desc">
                                        <h5><a href="#">Annie Stephens</a></h5>
                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                        <p className="comment">
                                            Never say goodbye till the end comes!
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="comment-list">
                            <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                    <div className="thumb">

                                    </div>
                                    <div className="desc">
                                        <h5><a href="#">Maria Luna</a></h5>
                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                        <p className="comment">
                                            Never say goodbye till the end comes!
                                        </p>
                                    </div>
                                </div>
                                <div className="reply-btn">
                                    <a href="" className="btn-reply text-uppercase">reply</a>
                                </div>
                            </div>
                        </div>
                        <div className="comment-list">
                            <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                    <div className="thumb">

                                    </div>
                                    <div className="desc">
                                        <h5><a href="#">Ina Hayes</a></h5>
                                        <p className="date">December 4, 2017 at 3:12 pm </p>
                                        <p className="comment">
                                            Never say goodbye till the end comes!
                                        </p>
                                    </div>
                                </div>
                                <div className="reply-btn">
                                    <a href="" className="btn-reply text-uppercase">reply</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-form">
                        <h4>¿Tienes alguna pregunta?</h4>
                        <form>


                            <div className="form-group">
                                <textarea className="form-control mb-10" rows="5" name="message" placeholder="Mensaje"
                                    ></textarea>
                            </div>
                            <a href="#" className="primary-btn">Publicar </a>
                        </form>
                    </div>
                    </div>
                </div>


                <div className="col-lg-5 course_details_left">


                <h4 className="title">Contenido del curso</h4>
                        <div className="content">
                            <ul className="course_list">
                              {
                                lessons.map((lesson,indice)=>(
                                  <Lessons key={lesson.id} lesson={lesson} curso={id} indice={indice} />
                                ))
                              }


                            </ul>
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
