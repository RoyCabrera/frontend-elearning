import { useState, useEffect, useContext } from "react";
import AuthContext from "./context/authentication/authContext";
import Layout from "./components/layout/Layout";
import clienteAxios from "./config/axios";
import ListaCursos from "./components/ui/ListaCursos";

const GestionCursos = () => {
  const authcontext = useContext(AuthContext);
  const { usuario } = authcontext;

  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const getCursos = async () => {
      const response = await clienteAxios.get("/api/courses");
      setCursos(response.data.data);
      console.log(response.data.data);
    };

    getCursos();
  }, [usuario]);


  return (


    <>
      <Layout>
        <div className="section_gap">
          <div className="container">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th></th>
                  <th scope="col">Curso</th>
                  <th scope="col">Docente</th>
                  <th scope="col">Nivel</th>
                  <th scope="col">Aprobar</th>
                  <th scope="col">Rechazar</th>
                </tr>
              </thead>
              <tbody>

              {cursos.map((curso) => (
               <ListaCursos key={curso.id} curso={curso} />
              ))}

              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default GestionCursos;
