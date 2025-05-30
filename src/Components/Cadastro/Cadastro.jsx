import { useState } from "react";
import "./Cadastro.css";

const Cadastro = ({ onVoltar }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/usuario/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        onVoltar(); 
      } else {
        const data = await response.json();
        alert("Erro no cadastro: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleCadastro}>
        <h1>Crie sua conta</h1>
        <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={onVoltar}>Voltar ao login</button>
      </form>
    </div>
  );
};

export default Cadastro;