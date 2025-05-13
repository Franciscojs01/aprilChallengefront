import { useEffect, useState } from "react";
import Modal from "./Modal";
import EditarModal from "./EditarModal";
import "./Principal.css";

const Principal = ({onLogout }) => {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [editarModalAberto, setEditarModalAberto] = useState(null);
  const token = localStorage.getItem("token");

  const fetchItens = async () => {
    try {
      const response = await fetch("http://localhost:8080/item/listar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setItens(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      onLogout(); // ou navega para login
    } else {
      fetchItens();
    }
  }, []);

  const handleCadastrar = async (item) => {
    try {
      const response = await fetch("http://localhost:8080/item/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const novoItem = await response.json();
        setItens([...itens, novoItem]);
        await fetchItens();
        setModalAberto(false);
      } else {
        alert("Erro ao cadastrar item.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
    }
  };

  const handleEditar = async (id, novosDados) => {
    if (id == null) {
      console.error("ID inválido ao tentar editar:", id);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/item/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novosDados),
      });

      if (response.ok) {
        const itemAtualizado = await response.json();
        setItens(
          itens.map((item) => (item.id_item === id ? itemAtualizado : item))
        );
        await fetchItens();
        setEditarModalAberto();
      } else {
        alert("Erro ao editar item.");
      }
    } catch (error) {
      console.error("Erro ao editar item:", error);
    }
  };

  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/item/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setItens(itens.filter((item) => item.id_item !== id));
      } else {
        alert("Erro ao excluir item.");
      }
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  };

  const itensFiltrados = itens.filter((item) =>
    item.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="principal">
      <header>
        <h2>Listagem de Itens</h2>

      </header>

      <div className="top-bar">
        <button onClick={() => setModalAberto(true)}>
          Cadastrar novo item
        </button>
        <input
          type="text"
          placeholder="Filtrar itens"
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <ul className="lista-itens">
        {itensFiltrados.map((item, index) => (
          <li key={item.id_item ?? `item-${index}`}>
            {item.nome} - {item.quantidade}
            <button onClick={() => setEditarModalAberto(item)}>Editar</button>
            <button onClick={() => handleExcluir(item.id_item)}>Excluir</button>
          </li>
        ))}
      </ul>

      {modalAberto && (
        <Modal
          onCadastrar={handleCadastrar}
          onClose={() => setModalAberto(false)}
        />
      )}

      {editarModalAberto && (
        <EditarModal
          item={editarModalAberto}
          onSalvar={handleEditar}
          onExcluir={(id) => {
            handleExcluir(id);
            setEditarModalAberto(null);
          }}
          onClose={() => setEditarModalAberto(null)}
        />
      )}
    </div>
  );
};

export default Principal;
