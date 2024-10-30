// Importación de las funciones del Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Importar los reducers desde sus archivos correspondientes
import loginReducer from './loginSlice';
import registerReducer from './registerSlice';
import recoveryReducer from './recoverySlice';

// Configuración del store de Redux
const store = configureStore({
  reducer: {
    // Reducers asignados a claves específicas en el estado global
    // Maneja el login y logout
    auth: loginReducer,
    // Maneja el registro
    register: registerReducer, 
    // Maneja la recuperación de contraseñas
    recovery: recoveryReducer, 
  },
});

export default store;