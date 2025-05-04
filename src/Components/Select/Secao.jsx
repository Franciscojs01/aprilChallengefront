import { useNavigate } from "react-router-dom";
import "./Secao.css"; 

const Secao = () => {
  const navigate = useNavigate();

  return (
    <div className="secao-container">
      <h1>Escolha uma opção</h1>
      <button onClick={() => navigate("/principal")}>Gerenciar Itens</button>
      <button onClick={() => navigate("/usuarios")}>Gerenciar Usuários</button>
    </div>
  );
};

export default Secao;
