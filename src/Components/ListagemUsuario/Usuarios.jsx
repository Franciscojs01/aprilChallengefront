import { useEffect, useState } from "react";
import "./Usuarios.css";

const Usuarios = ({ onLogout }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false); // ADICIONADO
  const token = localStorage.getItem("token");

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/usuario/listar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      onLogout();
    } else {
      fetchUsuarios();
    }
  }, []);

  const abrirEdicao = (usuario) => {
    setUsuarioEditando(usuario);
    setNovoNome(usuario.nome);
    setNovoEmail(usuario.email);
    setNovaSenha(""); 
    setMostrarSenha(false);
  };

  const salvarEdicao = async (id, novosDados) => {
    if (!id) {
      console.error("ID inválido ao tentar editar:", id);
    }

    try {
      const response = await fetch(`http://localhost:8080/usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novosDados),
      });

      if (response.ok) {
        const usuarioAtualizado = await response.json();
        setUsuarios(
          usuarios.map((usuario) => (usuario.id_usuario === id ? usuarioAtualizado: usuario))
        );
        await fetchUsuarios();
        setUsuarioEditando();
      } else {
        alert("Erro ao editar usuário.");
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };

  const deletarUsuario = async (id) => {
    try {
      await fetch(`http://localhost:8080/usuario/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUsuarios();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div className="usuarios-container">
      <h1>Usuários Cadastrados</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id_usuario}>
            {usuario.nome} - {usuario.email}
            <button onClick={() => deletarUsuario(usuario.id_usuario)}>
              Excluir
            </button>
            <button onClick={() => abrirEdicao(usuario)}>Editar</button>
          </li>
        ))}
      </ul>

      {usuarioEditando && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuário</h2>
            <input
              type="text"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Nome"
            />
            <input
              type="email"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="senha-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Senha"
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <button
              onClick={() =>
                salvarEdicao(usuarioEditando.id_usuario, {
                  nome: novoNome,
                  email: novoEmail,
                  senha: novaSenha,
                })
              }
            >
              Salvar
            </button>
            <button onClick={() => setUsuarioEditando(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
