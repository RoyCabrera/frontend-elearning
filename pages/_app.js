import App from "next/app";

import Auth from "./context/authentication/";

import Cookie from "universal-cookie";
import tokenAuth from "./config/token";

const MyApp = (props) => {
  const { Component, pageProps } = props;

  const token1 = new Cookie();
  const userToken = token1.get("token");

  if (userToken) {
    // funcion para enviar el token por headers
    tokenAuth(userToken);
  }

  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  );
};

export default MyApp;
