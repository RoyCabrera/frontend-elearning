import { useState,useContext,useEffect } from "react";


import AuthContext from '../../context/authentication/authContext';




const InformacionGeneral = () => {
  const [info,setInfo] = useState({
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
              <label htmlFor="name">Imagen representativa del curso</label>
              <br />
              <input type="file" accept="image/x-png,image/gif,image/jpeg" />
            </div>
            <div className="mt-10">
              <label>Categoría</label>
              <select
                name="category"
                className="form-control"
                value={category}
                onChange={handleChange}
              >
                <option>--Seleccione una opción--</option>
                <option value="2">PHP</option>
                <option value="1">Javascript</option>
                <option value="4">Base de datos</option>
                <option value="3">AWS</option>
              </select>
            </div>
            <div className="mt-10">
              <label>Nivel</label>
              <select
                name="level"
                className="form-control"
                value={level}
                onChange={handleChange}
              >
                <option>--Seleccione una opción--</option>
                <option value="1">Principiante</option>
                <option value="2">Intermedio</option>

                <option value="3">Avanzado</option>
              </select>
            </div>

            <div className="mt-10">
              <button className="btn btn-outline-primary btn-block">
                Crear curso
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformacionGeneral;
