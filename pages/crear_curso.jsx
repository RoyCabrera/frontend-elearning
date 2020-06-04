import {useState,useEffect,useContext} from 'react';
import Router from 'next/router';
import Layout from "./components/layout/Layout";
import Select from './components/ui/Select';
import AuthContext from './context/authentication/authContext';
import clienteAxios from './config/axios';


const CrearCurso = () => {

  const authContext = useContext(AuthContext);

  const {usuario}=authContext;

  const [course,setCourse] = useState({
    id:"",
    teacherId:"",
    name:"",
    description:"",
    category:"",
    level:"",
    logro1:"",
    logro2:"",
    logro3:"",
    logro4:"",
    namelesson1:"",
    namelesson2:"",
    namelesson3:"",
    namelesson4:"",
    urllesson1:"",
    urllesson2:"",
    urllesson3:"",
    urllesson4:"",
  })

  useEffect(()=>{
    if(usuario){
      setCourse({
        id:"",
    teacherId:usuario.id,
    name:"",
    description:"",
    category:"",
    level:"",
    logro1:"",
    logro2:"",
    logro3:"",
    logro4:"",
    namelesson1:"",
    namelesson2:"",
    namelesson3:"",
    namelesson4:"",
    urllesson1:"",
    urllesson2:"",
    urllesson3:"",
    urllesson4:"",
      })
    }
  },[usuario])

  const handleChange = (e) => {

    setCourse({
      ...course,
      [e.target.name] : e.target.value
  })
  }

  const submitEnviarCurso = async(e) => {
    e.preventDefault();
    const response = await clienteAxios.post(`/api/courses/`,course);
    Router.push('/mis_cursos_impartidos');
  }

  const {name,
  description,
  category,
  level,
  logro1,
  logro2,
  logro3,
  logro4,
  namelesson1,
  namelesson2,
  namelesson3,
  namelesson4,
  urllesson1,
  urllesson2,
  urllesson3,
  urllesson4} = course;

  return (
    <Layout>
      <div className="section_gap ">
        <div className="container">
          <form className="row align-items-center" onSubmit={submitEnviarCurso}>
            <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12 ">
              <div className="row">
                <div className="col-lg-12 form_group">
                  <div className="mt-10">
                    <label htmlFor="name">Nombre</label>
                    <input

                      type="text"
                      name="name"

                      className="form-control"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-10">
                  <label htmlFor="name">Descripción</label>
                    <textarea
                      rows="5"
                      type="text"
                      name="description"
                      id="descripcion"
                      className="form-control"
                      value={description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-10">
                  <label htmlFor="name">Imagen representativa del curso</label><br/>
                    <input
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                  </div>
                  <div className="mt-10">
                  <label>Categoría</label>
                  <select name="category" className="form-control" value={category}
                      onChange={handleChange}>
                    <option>--Seleccione una opción--</option>
                    <option value="2">PHP</option>
                    <option value="1">Javascript</option>
                    <option value="4">Base de datos</option>
                    <option value="3">AWS</option>
                  </select>
							</div>
              <div className="mt-10">
                  <label>Nivel</label>
                  <select name="level" className="form-control" value={level}
                      onChange={handleChange}>
                    <option>--Seleccione una opción--</option>
                    <option value="1">Principiante</option>
                    <option value="2">Intermedio</option>

                    <option value="3">Avanzado</option>
                  </select>
							</div>
              <hr/>
                  <div className="mt-10">
                    <label>Logros del curso</label>
                  </div>
              <div className="row mt-10">
                <div className="col-6">

                    <input
                    value={logro1}
                    onChange={handleChange}
                    placeholder="Logro 1"
                      type="text"
                      name="logro1"

                      className="form-control"
                    />
							</div>
              <div className="col-6">

                    <input
                    value={logro2}
                    onChange={handleChange}
                      placeholder="Logro 2"
                      type="text"
                      name="logro2"

                      className="form-control"
                    />
							</div>

                </div>
                <div className="row mt-10">
                <div className="col-6">

                    <input
                    value={logro3}
                    onChange={handleChange}
                    placeholder="Logro 3"
                      type="text"
                      name="logro3"

                      className="form-control"
                    />
							</div>
              <div className="col-6">

                    <input
                    value={logro4}
                    onChange={handleChange}
                      placeholder="Logro 4"
                      type="text"
                      name="logro4"

                      className="form-control"
                    />
							</div>

                </div>
              <hr/>
                  <div className="mt-10">
                    <label>Lecciones</label>
                  </div>
                <div className="row mt-10">
                <div className="col-6">

                    <input
                    value={namelesson1}
                    onChange={handleChange}
                    placeholder="Nombre de lección 1"
                      type="text"
                      name="namelesson1"

                      className="form-control"
                    />
							</div>
              <div className="col-6">

                    <input
                    value={urllesson1}
                    onChange={handleChange}
                      placeholder="URL lección 1"
                      type="text"
                      name="urllesson1"

                      className="form-control"
                    />
							</div>
                </div>
                <div className="row mt-10">
                <div className="col-6">

                    <input
                    value={namelesson2}
                    onChange={handleChange}
                    placeholder="Nombre de lección 2"
                      type="text"
                      name="namelesson2"

                      className="form-control"
                    />
							</div>
              <div className="col-6">

                    <input
                      placeholder="URL lección 2"
                      type="text"
                      name="urllesson2"
                      value={urllesson2}
                      onChange={handleChange}
                      className="form-control"
                    />
							</div>
                </div>
                <div className="row mt-10">
                <div className="col-6">

                    <input
                    placeholder="Nombre de lección 3"
                      type="text"
                      name="namelesson3"
                      value={namelesson3}
                      onChange={handleChange}
                      className="form-control"
                    />
							</div>
              <div className="col-6">

                    <input
                    value={urllesson3}
                    onChange={handleChange}
                      placeholder="URL lección 3"
                      type="text"
                      name="urllesson3"

                      className="form-control"
                    />
							</div>
                </div>
                <div className="row mt-10">
                <div className="col-6">

                    <input
                    placeholder="Nombre de lección 4"
                      type="text"
                      name="namelesson4"
                      value={namelesson4}
                      onChange={handleChange}
                      className="form-control"
                    />
							</div>
              <div className="col-6">

                    <input
                      placeholder="URL lección 4"
                      type="text"
                      name="urllesson4"
                      value={urllesson4}
                      onChange={handleChange}
                      className="form-control"
                    />
							</div>
                </div>
                <div className="mt-10">
                    <button className="btn btn-outline-primary btn-block">Crear curso</button>

                </div>

                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CrearCurso;
