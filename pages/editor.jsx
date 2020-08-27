import Layout from "./components/layout/Layout";
import { useState, useEffect, useContext } from "react";
import AuthContext from "./context/authentication/authContext";
import clienteAxios from "./config/axios";
import AceEditor from 'react-ace';
import ListaLenguajes from './components/ui/ListaLenguajes';
import Router from "next/router";
const Editor = () => {

  const authcontext = useContext(AuthContext);
  const { usuario } = authcontext;

  const [lenguajeSelect,setLenguajeSelect] = useState({
    id_lenguaje:"",
    codeEditor:"",
    lenguaje_select:"",
  })

  const [mensajeCompilacion,setMensajeCompilacion] = useState(false);
  const [output,setOutput]=useState("");
  const [lenguajes, setLenguajes] = useState([]);

  /* const [listLenguajes,setListLenguajes] = useState({
    id:"",
    lenguaje:""
  }) */

  useEffect(() => {

    const getLenguajes = async () => {
      const response = await clienteAxios.get("/api/code_editor/lenguajes");
      setLenguajes(response.data.lenguajes);
      console.log(response.data.lenguajes);
    };

    getLenguajes();
  }, [usuario]);

  const submitCode = async (e) =>{
    e.preventDefault();

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
      setLenguajeSelect({
        ...lenguajeSelect,
        codeEditor: e,
      });
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

  const [descripcion,setDescripcion] = useState("")

  const handleDescripcion = (e) => {
    setDescripcion(e.target.value)
  }

  const publicar = async (e) => {
    e.preventDefault();
    /* console.log(descripcion);
    console.log(codeEditor);
    console.log(usuario.id); */

    let post = {
      userId:usuario.id,
      code:codeEditor,
      description:descripcion
    }

    const res = await clienteAxios.post('/api/posts',post);
    alert("Publicación creada satisfactoriamente");
      Router.push("/publicaciones")
  }

  const {lenguaje_select,codeEditor}=lenguajeSelect;

  return (
    <>
      <Layout>
        <div className="section_gap ">

          <div className="container">
          <div className="row">
              <div className="col-12">
                <h1 className="text-center">Prueba tu codigo aquí</h1>
              </div>
            </div>
          <div className="col-12">
            <form onSubmit={publicar} >
            <label htmlFor="">Descripción</label>
              <textarea name="" id="" name="descripcion" value={descripcion} onChange={handleDescripcion} className="form-control"></textarea>
              <div className="row">
              <div className="col-12 mt-3">
              <input type="submit" className="btn btn-primary" value="Publicar" />
              </div>
            </div>

            </form>


            </div>
            <form onSubmit={submitCode}>

            <div className="row mt-3">

            <div className="col-6 mt-3">
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
                value={codeEditor}
                setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,

                }}/>

              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
              <input type="submit" className="btn btn-success" value="Ejecutar" />
              {/* <button className="btn btn-outline-secondary ml-1">Guardar Codigo</button> */}
              </div>
            </div>
            </form>
            <div className="row mt-2">
            <div className="col-12">

              {
                mensajeCompilacion ? (<p className="">Compilando...</p>):false
              }

              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12">
                <div className="output-code">
                  <div className="container">
                    <div className="col-12">
                      <code className="text-secondary">{output}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

      </Layout>
    </>
  );
};

export default Editor;
