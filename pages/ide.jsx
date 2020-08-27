import Layout from "./components/layout/Layout";
import AuthContext from "./context/authentication/authContext";
import { useState, useEffect, useContext  } from "react";



const Ide = () => {

  const authContext = useContext(AuthContext);

  const { usuario } = authContext;




  return (
    <>
      <Layout>
        <div className="section_gap ">

        <div className="container">
            <div className="col-12">
            <div className="ide">
            <div className="sec-widget" data-widget="31ebf2868f9ffe16c2dcca990e09103a" ></div>
            </div>
            </div>
        </div>

        </div>
      </Layout>
    </>
  );
};

export default Ide;
