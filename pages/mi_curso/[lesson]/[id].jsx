import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import AceEditor from "react-ace";
import Layout from "../../components/layout/Layout";
import clienteAxios from "../../config/axios";
import Error404 from "../../components/layout/Error404";
import Goals from "../../components/ui/Goals";
import Comentario from "../../components/ui/Comentario";
import AuthContext from "../../context/authentication/authContext";
import Lessons from "../../components/landing/Lessons";
import ListaLenguajes from '../../components/ui/ListaLenguajes';

const Curso = () => {

  const router = useRouter();
  const [curso, setCurso] = useState({});
  const [error, setError] = useState(false);
  const [goals, setGoals] = useState({});
  const [code,setCode] = useState("");
  const [lenguajeSelect,setLenguajeSelect] = useState({
    id_lenguaje:"",
    codeEditor:"",
    lenguaje_select:"",
  })

  const [mensajeCompilacion,setMensajeCompilacion] = useState(false);
  const [output,setOutput]=useState("");
  const [lenguajes, setLenguajes] = useState([]);


  /* const [mensajeInscripcion, setMensajeInscripcion] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState(""); */

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const [comments,setComments]= useState();
  const [comment,setComment] = useState({
    comment:""
  })
  const {
    query: { id: id, lesson: lesson },
  } = router;




  useEffect(() => {


    if (id) {

      const getLenguajes = async () => {
        const response = await clienteAxios.get("/api/code_editor/lenguajes");
        setLenguajes(response.data.lenguajes);
        console.log(response.data.lenguajes);

      };

      const getComments = async () => {
        const response = await clienteAxios.get(`/api/reviews/${id}`);
        setComments(response.data.reviews);
        console.log(response.data);
      }
      getComments();
      getLenguajes();
      const obtenerDatosCurso = async () => {
        const response = await clienteAxios.get(`/api/courses/${id}`);
        const responseGoals = await clienteAxios.get(`/api/goals/${id} `);

        if (response.data.course && responseGoals.data.goals) {
          setGoals(responseGoals.data.goals);
          setCurso(response.data.course);
          console.log(response.data.course);
          setCode(response.data.course.lessons[router.query.lesson].exercise)
        } else {
          setError(true);
        }
      };
      obtenerDatosCurso();
    }else{
      console.log("error al cargar");
    }
  }, [router]);

  const verVideo = (e) => {
    console.log(e, "desde el hijo");
  };

  if (error) return <Error404 />;

  if (Object.keys(curso).length === 0 && !error)
    return (
      <Layout>
        <div className="section_gap text-center">Cargando...</div>
      </Layout>
    );
  const { name, description, teacher, level, category, lessons } = curso;


  const handleComment = async (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  }

  const commentar = async (e) => {
    e.preventDefault();

    console.log(usuario.id);
    let datosComentarios = {
      user_id:usuario.id,
      course_id:id,
      comment:comment.comment
    }

    const res = await clienteAxios.post('/api/reviews',datosComentarios);
    console.log(res);
    comenta();

  }


  const submitCode = async (e) =>{
    e.preventDefault();
    lenguajeSelect.codeEditor = code
    console.log(lenguajeSelect);
    setMensajeCompilacion(true)
    const res = await clienteAxios.post('/api/code_editor/ejecutar',lenguajeSelect);
    if(res){
      setMensajeCompilacion(false)
      setOutput(res.data.output)
    }
  }

  const handleChangeListLenguaje = (e) => {
    let lenguaje_selected = "";
    if(!e.target){
      setCode(e);
    }else{
      if(e.target.value === "10"){
        lenguaje_selected = "java"
      }else if (e.target.value === "29") {
        lenguaje_selected = "php"
      } else if (e.target.value === "56"){
        lenguaje_selected = "javascript"
      } else if (e.target.value === "116"){
        lenguaje_selected = "python"
      } else if (e.target.value === "117"){
        lenguaje_selected = "r"
      } else if (e.target.value === "17"){
        lenguaje_selected = "ruby"
      }
      setLenguajeSelect({
        ...lenguajeSelect,
        [e.target.name]: lenguaje_selected,
        id_lenguaje: e.target.value
      });
    }

  }
  const comenta = async () => {

    const response = await clienteAxios.get(`/api/reviews/${id}`);
    setComments(response.data.reviews);
    console.log(response.data);
  }
  const {lenguaje_select,codeEditor}=lenguajeSelect;
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
                    {lessons.length > 0
                      ? ReactHtmlParser(lessons[router.query.lesson].url)
                      : null}
                  </div>
                </div>
                {lessons[router.query.lesson].exercise != "" ?

                (
                  <div className="content_wrapper">
                    <h4 className="title">Ejercicio</h4>
                    <form onSubmit={submitCode}>

            <div className="row mt-3">

            <div className="col-6">
              <select name="lenguaje_select" className="form-control" onChange={handleChangeListLenguaje}>
                    <option>--Seleccione un lenguaje de programación--</option>
                    {lenguajes.map((lenguaje) => (
                    <ListaLenguajes key={lenguaje.id} lenguaje={lenguaje} />
                    ))}
                  </select>
              </div>
            </div>

            <div className="row mt-4">
            <div className="col-6">
              <AceEditor
                className="editor"
                name="codeEditor"
                placeholder={lenguaje_select}
                mode={lenguaje_select}
                onChange={e => handleChangeListLenguaje(e)}
                theme="dracula"
                name="editor_code"
                width="1000px"
                fontSize={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                /* setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,

                }} *//>

              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
              <input type="submit" className="btn btn-success" value="Ejecutar" />
              {/* <button className="btn btn-outline-secondary ml-1">Guardar Codigo</button> */}
              </div>
            </div>
            </form>

              {
                mensajeCompilacion ? (<p className="">Compilando...</p>):false
              }

<div className="output-code mt-2">
                  <div className="container">
                    <div className="col-12 ">
                      <code className="text-secondary">{output}</code>
                    </div>
                  </div>
                </div>
                  </div>
                ) : null}

                <div className="content_wrapper">
                  <h4 className="title">Lo que aprenderás</h4>
                  <div className="content">
                    <ul className="unordered-list">
                      {goals.map((goal) => (
                        <Goals key={goal.id} goal={goal} verVideo={verVideo} />
                      ))}
                    </ul>
                  </div>

                  <h4 className="title">Descripción</h4>
                  <div className="content">{description}</div>
                  <div className="comments-area">
                    <h4>Cometarios del curso</h4>

                    {
                      comments.map((comm)=>(
                        <Comentario key={comm.id} comm={comm} />
                      ))
                    }

                  </div>
                  <div className="comment-form">
                    <h4>¿Tienes alguna pregunta?</h4>
                    <form>
                      <div className="form-group">
                        <textarea
                          className="form-control mb-10"
                          rows="2"
                          name="comment"
                          value={comment.comment}
                          placeholder="Mensaje"
                          onChange={handleComment}
                        ></textarea>
                      </div>
                      <a href="#" className="primary-btn" onClick={commentar}>
                        Publicar{" "}
                      </a>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 course_details_left">
                <h4 className="title">Contenido del curso</h4>
                <div className="content">
                  <ul className="course_list">
                    {lessons.map((lesson, indice) => (
                      <Lessons
                        key={lesson.id}
                        lesson={lesson}
                        curso={id}
                        indice={indice}
                      />
                    ))}
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
