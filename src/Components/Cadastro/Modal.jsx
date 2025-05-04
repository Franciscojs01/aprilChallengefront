import { useState } from "react";
import "./Modal.css"; 

const Modal = ({ onCadastrar, onClose }) => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !quantidade) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoItem = {
      nome,
      quantidade: parseInt(quantidade),
    };

    onCadastrar(novoItem);
    setNome("");
    setQuantidade("");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Cadastrar Novo Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do item"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
