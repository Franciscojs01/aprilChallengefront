import {FaUser, FaLock} from "react-icons/fa";

import { useState } from "react";

import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();

<<<<<<< HEAD:src/Components/Login/Login.jsx
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/secao");
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro no login");
=======
      alert("Enviando os dados:" + username + " - " + password);
>>>>>>> parent of 10b548f (inicializando):src/Components/Login.jsx
    }

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div>
          <input type="email" 
          placeholder="E-mail" 
          onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div>
          <input type="password" placeholder="Senha" 
          onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
<<<<<<< HEAD:src/Components/Login/Login.jsx
<<<<<<< HEAD

=======
>>>>>>> parent of 10b548f (inicializando):src/Components/Login.jsx
        <div className="recall-forget">
          <label htmlFor="">
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>
<<<<<<< HEAD:src/Components/Login/Login.jsx

=======
        
>>>>>>> parent of 4057065 (revert)
        <button type="submit">Entrar</button>
=======
        <button>Entrar</button>
>>>>>>> parent of 10b548f (inicializando):src/Components/Login.jsx

        <div className="signup-link">
          <p>
            Não tem uma conta ? <a href="#">Registrar</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
