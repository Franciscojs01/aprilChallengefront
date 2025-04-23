import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Cadastro from "./Components/Cadastro";
import Principal from "./Components/Principal";
import "./styles/App.css"; // Importa o CSS com o background e estilos globais

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
            path="/principal"
            element={
              <PrivateRoute>
                <Principal />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
