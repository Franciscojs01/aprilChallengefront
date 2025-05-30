<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Cadastro from "./Components/Cadastro";
import Principal from "./Components/Principal";
import Secao from "./Components/secao";
import Usuarios from "./Components/Usuarios"; 
import "./styles/App.css";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};
=======
import './styles/App.css';
import Login from './Components/Login';
>>>>>>> parent of 10b548f (inicializando)

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
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
=======
      <Login />
>>>>>>> parent of 10b548f (inicializando)
    </div>
  );
}

export default App;
