import Layout from "./components/layout/Layout";
import { useState, useEffect, useContext } from "react";
import AuthContext from "./context/authentication/authContext";
import clienteAxios from "./config/axios";
import AceEditor from 'react-ace';
import ListaLenguajes from './components/ui/ListaLenguajes';
import Post from './components/ui/Post';


const Publicaciones = () => {
  const authcontext = useContext(AuthContext);
  const { usuario } = authcontext;
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const getposts = async () => {
      const response = await clienteAxios.get("/api/posts");
      setPosts(response.data.allPosts)
      console.log(response.data.allPosts);
    };
    getposts();

  },[usuario])

  return(
    <>
    <Layout>
    <div className="section_gap">
      <div className="container">
      <section className="blog_area section_gap">
        <div className="container">
            <div className="row">
                <div className="col-lg-10">
                    <div className="blog_left_sidebar">

                    {posts.map((post) => (
                      <Post key={post.id} post={post} />
                    ))}



                    </div>
                </div>

            </div>
        </div>
    </section>
      </div>
    </div>
    </Layout>

    </>
  )

}

export default Publicaciones;