import React, { useState } from "react"

function Login(props) {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Username">Nombre de usuario</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" id="Username" placeholder="Usuario"></input>
                <label htmlFor="Password">Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="Password" placeholder="******"></input>
                
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}
export default Login;