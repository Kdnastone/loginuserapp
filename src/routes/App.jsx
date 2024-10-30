// Importa provider de react-redux para poder pasar el store a la aplicación
import { Provider } from 'react-redux';

// Importa BrowserRouter, Routes, Route y Navigate de react-router-dom
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa el store de redux
import store from '../redux/store';

// Importa el componente Header
import Header from '../components/header/Header';

// Importa los componentes de las páginas
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recovery from '../pages/Recovery';
import Home from '../pages/Home';
import ApiResults from '../pages/ApiResults';

function App() {
  return (
    <Provider store={store}> {/* Envolver la aplicación con Provider para poder pasar el store */}
      <Router>
        <Header /> {/* Incluir el componente Header para que se muestre en todas las rutas */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/home" element={<Home />} />
          <Route path="/results" element={<ApiResults />} />
          {/* Redirigir a /login por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;