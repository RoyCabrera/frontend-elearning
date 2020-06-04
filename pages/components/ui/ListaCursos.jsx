import Link from 'next/link';
import clienteAxios from "../../config/axios";
import Router  from "next/router";

const ListaCursos = ({ curso }) => {
  const { status,name,teacher,level} = curso


  const respuesta_curso = async (id,respuesta) => {

    const valores = {
      id:id,
      statusId :respuesta
    }
    const response = await clienteAxios.put('api/courses',valores);
    console.log(response.data);
    console.log(id,respuesta);

    console.log("curso respondido");
    Router.reload();

  }

let color = "";

  if(status.id === 1){
    //aprobado

    color="badge badge-success";
  }else if(status.id === 2){
    // pendiente
    color="badge badge-warning";


  }




  return (
    <>
    {status.id === 3 ?(null) : (<tr key={curso.id}>
        <td>
          <span className={color}>{status.status}</span>{" "}
        </td>
        <th scope="row"><Link href="/mi_curso/[lesson]/[id] " as={`/mi_curso/0/${curso.id}`} >
            <a >{name} </a>
            </Link> </th>
        <td>
          {teacher.user.name} {teacher.user.last_name}
        </td>
        <td>{level.name}</td>
        <td>
        <button className="btn btn-sm btn-outline-success" onClick={(e) => respuesta_curso(curso.id, 1)} >Aprobar</button>
        </td>
        <td>
        <button className="btn btn-sm btn-outline-danger" onClick={(e) => respuesta_curso(curso.id, 3)} >Rechazar</button>
        </td>
      </tr>) }

    </>
  );
};

export default ListaCursos;
