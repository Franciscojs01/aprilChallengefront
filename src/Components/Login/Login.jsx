import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>

        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
<<<<<<< HEAD

        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembrar de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

=======
        
>>>>>>> parent of 4057065 (revert)
        <button type="submit">Entrar</button>

        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
