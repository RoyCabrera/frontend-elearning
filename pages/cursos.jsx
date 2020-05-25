import  Router  from 'next/router';
import Layout from './components/layout/Layout';
import {useContext} from 'react';
import AuthContext from './context/authentication/authContext';
import Error404 from './components/layout/Error404';


const Cursos = () => {

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario } = authContext;


    return (
      <Layout>
        {
          usuario ? (<h1>Mis cursos</h1>) :<Error404/>
        }

      </Layout>
    );





}

export default Cursos;