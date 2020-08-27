import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Layout from "./components/layout/Layout";

import AuthContext from "./context/authentication/authContext";
import clienteAxios from "./config/axios";
import AceEditor from 'react-ace';



const CrearCurso = () => {



  const authContext = useContext(AuthContext);

  const { usuario } = authContext;

  const [course, setCourse] = useState({
    id: "",
    teacherId: "",
    name: "",
    description: "",

    category: "",
    level: "",


  });

  useEffect(() => {
    if (usuario) {
      setCourse({
        id: "",
        teacherId: usuario.id,
        name: "",
        description: "",
        category: "",

        level: "",


      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    //const file=e.target.files[0];
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const [image,setImage] = useState();


  const submitEnviarCurso = async (e) => {
    e.preventDefault();



    let formData = new FormData();
    formData.append('image',image);
    formData.append('course',JSON.stringify(course));
    formData.append('lecciones',JSON.stringify(inputList));
    formData.append('logros',JSON.stringify(inputListLogro));




    try {
      const response = await clienteAxios.post(`/api/courses/`,formData);
      console.log(response);
      alert("Curso creado satisfactoriamente");
      Router.push("/mis_cursos_impartidos")
      /* console.log(response); */
    } catch (error) {
      console.log("No se pudo crear el curso, asegurate que todos los campos esten completoss")
    }


  };



  const {
    name,
    description,
    category,
    level,

  } = course;

  /* ***********************************  */
  /* agregar lecciones dinamicamente  */
  const [inputList, setInputList] = useState([{ nombre: "", url_leccion: "",descripcion_leccion:"", archivo: "",code:"import java.util.*;\n\nclass Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t\n\t}\n}" }]);
  // handle input change
  const handleInputChange = (e, index) => {

      if(!e.target){
        console.log("no existe");
        const list = [...inputList];
        list[index]["code"] = e;
        setInputList(list);
      }else{
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      }



  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { nombre: "", url_leccion: "",descripcion_leccion:"",archivo:"",code:"" }]);
  };


  /* ***********************************  */

  /* agregar lecciones dinamicamente  */
  const [inputListLogro, setInputListLogro] = useState([{ logro: ""}]);
  // handle input change
  const handleInputChangeLogro = (e, index) => {

        const { name, value } = e.target;
        const list = [...inputListLogro];
        list[index][name] = value;
        setInputListLogro(list);



  };

  // handle click event of the Remove button
  const handleRemoveClickLogro = index => {
    const list = [...inputListLogro];
    list.splice(index, 1);
    setInputListLogro(list);
  };

  // handle click event of the Add button
  const handleAddClickLogro = () => {
    setInputListLogro([...inputListLogro, { logro: ""}]);
  };




  /* ***********************************  */

  return (
    <Layout>
      <div className="section_gap ">
        <div className="container">
          <form className="" onSubmit={submitEnviarCurso}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Información General</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" id="logros-tab" data-toggle="tab" href="#logros" role="tab" aria-controls="logros-tab" aria-selected="false">Logros</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lecciones</a>
              </li>



            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12 ">
                  <div className="row">
                    <div className="col-lg-12 form_group">
                      <div className="mt-10">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" required className="form-control" value={name} onChange={handleChange}/>
                      </div>
                      <div className="mt-10">
                        <label htmlFor="name">Descripción</label>
                        <textarea rows="5" type="text" name="description" id="descripcion" className="form-control" value={description} onChange={handleChange}/>
                      </div>
                      <div className="mt-10">
                        <label htmlFor="name">
                          Imagen representativa del curso
                        </label>
                        <br />
                        <input type="file" name="course_image" multiple accept=".jpeg,.png"  onChange={event => {
                          const file = event.target.files[0];
                          setImage(file);
                        }}/ >
                      </div>
                      <div className="mt-10">
                        <label>Categoría</label>
                        <select name="category" required className="form-control" value={category} onChange={handleChange}>
                          <option>--Seleccione una opción--</option>
                          <option value="2">PHP</option>
                          <option value="1">Javascript</option>
                          <option value="4">Base de datos</option>
                          <option value="3">AWS</option>
                          <option value="5">Java</option>
                        </select>
                      </div>
                      <div className="mt-10">
                        <label>Nivel</label>
                        <select name="level" required className="form-control" value={level} onChange={handleChange}>
                          <option>--Seleccione una opción--</option>
                          <option value="1">Principiante</option>
                          <option value="2">Intermedio</option>
                          <option value="3">Avanzado</option>
                        </select>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="logros" role="tabpanel" aria-labelledby="logros-tab">

                {
                inputListLogro.map((x, i) => {
                  return (

                    <div className="row" key={i+1}>
                      <div className="col-12">
                      <h4 className="mt-4">Logro {i+1}</h4>
                      </div>
                      <div className="col-6">

                        <input
                          name="logro"
                          placeholder="Logro"
                          value={x.logro}
                          onChange={e => handleInputChangeLogro(e, i)}
                          className="form-control"

                        />


                      </div>


                      <div className="col-6">


                          {inputListLogro.length !== 1 && <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveClickLogro(i)}>Eliminar</button>}
                          {inputListLogro.length - 1 === i && <button className="btn btn-success ml-1" onClick={handleAddClickLogro}>Agregar</button>}


                      </div>


                    </div>
                  );
                })
              }
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

              <div className="mt-10">
                <label>Lecciones del curso</label>
              </div>
              {
                inputList.map((x, i) => {
                  return (
                    <div className="row" key={i+1}>
                      <div className="col-6">
                        <h3>Lección {i+1}</h3>
                        <input
                          name="nombre"
                          placeholder="Nombre"
                          value={x.nombre}
                          onChange={e => handleInputChange(e, i)}
                          className="form-control mt-2"
                          required
                        />
                        <input

                          name="url_leccion"
                          placeholder="codigo de inserción"
                          value={x.url_leccion}
                          onChange={e => handleInputChange(e, i)}
                          className="form-control mt-2"
                        />
                        <textarea
                        placeholder="Descripción de la lección"
                        name="descripcion_leccion"
                        value={x.descripcion_leccion}
                        onChange={e => handleInputChange(e, i)}
                        className="form-control mt-2"

                        />
                       {/*  <input

                          name="archivo"
                          value={x.archivo}
                          onChange={e => handleInputChange(e, i)}
                          className=" mt-2"
                          type="file"
                        />
 */}

                      </div>


                      <div className="col-6">
                      <AceEditor
                        placeholder="Placeholder Text"
                        mode="java"
                        theme="chrome"
                        name="code"
                        className="code"
                        /* onLoad={e => handleInputChange("code", i)} */
                        onChange={e => handleInputChange(e, i)}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={x.code}
                        setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                        }}/>
                      </div>


                      <div className="col-12">

                      <div className="mt-2">
                        {inputList.length !== 1 && <button
                          className="btn btn-outline-danger  mr-2 mb-2"
                          onClick={() => handleRemoveClick(i)}>Eliminar</button>}
                        {inputList.length - 1 === i && <button className="btn btn-outline-success mr-2 mb-2" onClick={handleAddClick}>Agregar</button>}
                      </div>
                      <hr/>


                      </div>


                    </div>
                  );
                })
              }
              <div className="mt-10">
                        <button className="btn btn-outline-primary btn-block">
                          Crear curso
                        </button>
                      </div>
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
 */}
              </div>

            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CrearCurso;
