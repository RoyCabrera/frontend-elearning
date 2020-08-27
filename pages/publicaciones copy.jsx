import Layout from "./components/layout/Layout";
import { useState, useEffect, useContext } from "react";
import AuthContext from "./context/authentication/authContext";
import clienteAxios from "./config/axios";
import AceEditor from 'react-ace';
import ListaLenguajes from './components/ui/ListaLenguajes';



const Publicaciones = () => {
  const authcontext = useContext(AuthContext);
  const { usuario } = authcontext;

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
                        <article className="row blog_item">
                            <div className="col-md-3">
                                <div className="blog_info text-right">

                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="blog_post">
                                <AceEditor
                className="editor"
                name="codeEditor"
                placeholder=""
                mode="java"
                theme="dracula"
                name="editor_code"
                width="700px"
                fontSize={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value="System.print.out('dfd')"
                setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,

                }}/>
                                    <div className="blog_details">
                                        <a href="single-blog.html">
                                            <h2>Astronomy Binoculars A Great Alternative</h2>
                                        </a>
                                        <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                            understand why you should have to spend money on boot camp when you can get
                                            the MCSE study materials yourself at a fraction.</p>
                                            <h4 className="title">Descripción</h4>

                  <div className="comments-area">


                    <div className="comment-list">
                      <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                          <div className="thumb"></div>
                          <div className="desc">
                            <h5>
                              <a href="#">Roy Cabrera Ayala</a>
                            </h5>
                            {/* <p className="date">December 4, 2017 at 3:12 pm </p> */}
                            <p className="comment">
                              dsfasdfsdfsdfsdfsdfsdfsdfsdf
                            </p>
                          </div>

                        </div>

                      </div>
                    </div>
                    <input type="text" className="form-control"/>
                  </div>
                  <div className="comment-form">
                    <h4>¿Tienes alguna pregunta?</h4>
                    <form>
                      <div className="form-group">

                      </div>
                      <a href="#" className="primary-btn" >
                        Publicar{" "}
                      </a>
                    </form>
                  </div>
                                    </div>
                                </div>
                            </div>
                        </article>


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