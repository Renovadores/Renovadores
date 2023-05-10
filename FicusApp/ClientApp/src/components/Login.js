import React, { useState } from "react"
import {useNavigate } from "react-router-dom"

function Login(props) {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    // When user click on client button, 'navigate' redirect him to new page
    const navigate = useNavigate(); // It allows referencing a specific path defined in AppRoutes
    const handleClickViewClient = () => {
        navigate('/clientes');
        //second argument "state" allows to pass parameters
    };
    return (
        <div className="auth-form-container d-flex align-items-center">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Username">Nombre de usuario</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" id="Username" placeholder="Usuario"></input>
                <label htmlFor="Password">Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="Password" placeholder="******"></input>

                <button onClick={handleClickViewClient} type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}
export default Login;