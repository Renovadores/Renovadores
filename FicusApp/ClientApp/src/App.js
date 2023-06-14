import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import Login from "./Login";
import LoginNoAuth from "./LoginNoAuth";
import "./custom.css";

function App() {
  const NO_LOGIN = 0;
  const AUTHORIZED = 1;
  const NO_AUTHORIZED = 2;
  const REFRESH = 3;

  const [userState, setUserState] = useState(REFRESH);
  const handleCloseSession = async () => {
    //var currentUserId = JSON.parse(sessionStorage.getItem('userId'));
    //const responseLogout = await fetch(`api/usuario/CloseSession/${currentUserId}`);
    sessionStorage.setItem('userId', null);
    setUserState(NO_LOGIN);
  }

  const [userId] = useState(JSON.parse(sessionStorage.getItem('userId')));

  const [userName, setUserName] = useState("");
  const handleUserName = (event) => {
    setUserName(event.target.value);
  }
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

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
          setUserState(AUTHORIZED);
          sessionStorage.setItem('userId', JSON.stringify(data.usuarioId));
        } else {
          setUserState(NO_AUTHORIZED);
        }
      } else {
        setUserState(NO_AUTHORIZED);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const authenticateWithRefresh = async (tok, ref) => {
    console.log(tok);
    try {
      const responseAuthentication = await fetch("api/usuario/ObtenerRefreshToken", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "tokenExpirado": tok,
          "refreshToken": ref })
      });
      if (responseAuthentication.ok) {
        const data = await responseAuthentication.json();
        if (data.msg === "Ok") {
          setUserState(AUTHORIZED);
          sessionStorage.setItem('userId', JSON.stringify(data.usuarioId));
        } else {
          if (data.msg === "Token no ha expirado") {
            setUserState(AUTHORIZED);
          } else {
            // Refresh token expired
            console.log("token expirado")
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getCurrentUserId = async () => {
      const responseToken = await fetch(`api/historialrefreshtoken/GetHistorialToken/${userId}`)
      if (responseToken.ok) {
        const data = await responseToken.json();
        authenticateWithRefresh(data.token, data.refreshToken);
      }
    }
    if (userId !== null) {
      getCurrentUserId();
    } else {
      setUserState(NO_LOGIN);
    }
  }, [userId])

  return (
    <div className={userState === AUTHORIZED ? "" : "container d-flex justify-content-center"}>
      {
        userState === NO_LOGIN ?
          <Login userName={userName} handleUserName={handleUserName} password={password} handlePassword={handlePassword} handleAuthenticate={authenticate} />
          :
          userState === NO_AUTHORIZED ?
            <LoginNoAuth userName={userName} handleUserName={handleUserName} password={password} handlePassword={handlePassword} handleAuthenticate={authenticate} />
            :
            userState === AUTHORIZED ?
              <Layout userId={userId} handleCloseSession={handleCloseSession}>
                <Routes>
                  {AppRoutes.map((route, index) => {
                    return <Route key={index} {...route} />;
                  })}
                </Routes>
              </Layout>
              :
              <>
              </>
      }
    </div>
  );
}
export default App;
