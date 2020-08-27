import Head from "next/head";
import Header from "./Header";


const Layout = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/themify-icons.css" />
        <script src="/js/widget.js"></script>


<link rel="stylesheet" href="/css/style.css" />

        <title>Plataforma de fornación online</title>
      </Head>
      <Header />

      <main>{props.children}</main>
      <footer className="footer-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-6 single-footer-widget">
              <h4>Nuestras especialidades</h4>
              <ul>
                <li>
                  <p>Javascript</p>
                </li>
                <li>
                  <p>Node JS</p>
                </li>
                <li>
                  <p>Base de datos</p>
                </li>
                <li>
                  <p>Administración de servidores</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="row footer-bottom d-flex justify-content-between">
            <p className="col-lg-8 col-sm-12 footer-text m-0 text-white">
              Copyright &copy; All rights reserved | Roy Andy Cabrera Ayala
            </p>
            <div className="col-lg-4 col-sm-12 footer-social">
              <a href="#">
                <i className="ti-facebook"></i>
              </a>
              <a href="#">
                <i className="ti-twitter"></i>
              </a>

              <a href="#">
                <i className="ti-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <script src="/js/jquery-3.2.1.min.js"></script>
      <script src="/js/popper.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js"></script>


      <script src="/js/theme.js"></script>


    </>
  );
};

export default Layout;
