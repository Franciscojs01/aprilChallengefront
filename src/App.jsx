import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Cadastro from "./Components/Cadastro/Cadastro";
import Principal from "./Components/ListagemItens/Principal";
import Secao from "./Components/Select/secao";
import Usuarios from "./Components/ListagemUsuario/Usuarios"; 
import "./styles/App.css";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro onVoltar={() => window.location.href = "/"} />} />

          <Route
            path="/secao"
            element={
              <PrivateRoute>
                <Secao />
              </PrivateRoute>
            }
          />

          <Route
            path="/principal"
            element={
              <PrivateRoute>
                <Principal />
              </PrivateRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Usuarios />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
