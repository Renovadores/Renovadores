import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import Login from "./Login";
import "./custom.css";

function App() {
  const NO_LOGIN = 0;
  const AUTHORIZED = 1;
  const NO_AUTHORIZED = 2;

  const [userName, setUserName] = useState("");
  const handleUserName = (event) => {
    setUserName(event.target.value);
  }
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const [authenticated, setAuthenticated] = useState(NO_LOGIN);

  const authenticate = async () => {
    try {
      const responseAuthentication = await fetch("api/usuario/Autenticar", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ nombreUsuario: userName, contrasena: password })
      });
      if (responseAuthentication.ok) {
        const data = await responseAuthentication.json();
        if (data.msg === "Ok") {
          setAuthenticated(AUTHORIZED);
        } else {
          setAuthenticated(NO_AUTHORIZED);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={authenticated === AUTHORIZED ? "" : "container d-flex justify-content-center"}>
      {
        authenticated === NO_LOGIN || authenticated === NO_AUTHORIZED ?
          <Login userName={userName} handleUserName={handleUserName} password={password} handlePassword={handlePassword} handleAuthenticate={authenticate} />
        :
          <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                return <Route key={index} {...route} />;
              })}
            </Routes>
          </Layout>
      }
    </div>
  );
}
export default App;
