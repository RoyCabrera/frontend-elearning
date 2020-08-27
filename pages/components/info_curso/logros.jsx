import { useState,useContext,useEffect } from "react";
import AuthContext from '../../context/authentication/authContext';

const InformacionGeneral = () => {
  const [logros,setLogros] = useState({
    id: "",
    teacherId: "",
    name: "",
    description: "",
    category: "",
    level: "",
  });
  const authContext = useContext(AuthContext);

  const { usuario } = authContext;

  useEffect(() => {
    if (usuario) {
      setInfo({
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
    setInfo({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const {
     name,
     description,
     category,
     level,

   } = info;

  return (
    <>

    </>
  );
};

export default InformacionGeneral;
