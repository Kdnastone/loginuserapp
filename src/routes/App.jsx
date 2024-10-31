// Importa provider de react-redux para poder pasar el store a la aplicación 
import { Provider } from 'react-redux';

// Importa BrowserRouter, Routes, Route y Navigate de react-router-dom
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa el componente Header
import Header from '../components/header/Header'; 
import Autenticado from "../components/lyouts/Autenticado";
import Footer from "../components/functionals/Footer";

// Importa el store de redux
import store from '../redux/store';

// Importa los componentes de las páginas
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recovery from '../pages/Recovery';
import Home from "../pages/Home";
import ApiResults from "../pages/ApiResults";

function App() {
  return (
    <Provider store={store}> {/* Envolver la aplicación con Provider para poder pasar el store */}
      <Router>
        <Routes>
          {/* Rutas públicas: Header visible solo en estas rutas */}
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/recovery" element={<><Header /><Recovery /><Footer /></>} />
          
          {/* Redirigir a /login por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rutas privadas: deben ser autenticadas */}
          <Route element={<Autenticado />}>
            <Route path="/home" element={<Home />} />
            <Route path="/results" element={<ApiResults />} />
          </Route>

          {/* Ruta para manejar 404 Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
