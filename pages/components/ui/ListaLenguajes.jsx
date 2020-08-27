import Link from 'next/link';
import clienteAxios from "../../config/axios";
import Router  from "next/router";

const ListaLenguajes = ({ lenguaje }) => {
  const { id,name,short} = lenguaje

  return (
    <>

      <option value={id} >{name} </option>

    </>
  );
};

export default ListaLenguajes;
