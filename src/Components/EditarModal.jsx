import { useState } from "react";
import "./Modal.css";

const EditarModal = ({ item, onSalvar, onClose }) => {
  const [nome, setNome] = useState(item.nome || "");
  const [quantidade, setQuantidade] = useState(item.quantidade || 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const quantidadeNumerica = parseInt(quantidade, 10);
    if (!nome.trim() || isNaN(quantidadeNumerica) || quantidadeNumerica < 1) {
      alert("Por favor, preencha os dados corretamente.");
      return;
    }

    onSalvar(item.id, {
      nome: nome.trim(),
      quantidade: quantidadeNumerica,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do item"
            required
          />
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade"
            required
            min={1}
          />
          <div className="modal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarModal;
