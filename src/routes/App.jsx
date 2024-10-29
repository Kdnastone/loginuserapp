// Importar las librerias necesarias
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importar los componentes necesarios
import Header from '../components/header/Header';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import ApiResults from '../pages/ApiResults';
import Recovery from '../pages/Recovery';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/home" element={<Home />} />
          <Route path="/results" element={<ApiResults />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>

  );
}

export default App;