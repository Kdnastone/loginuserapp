// Importar createSlice para crear un slice del Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Este es el estado inicial del slice de autenticación
const initialState = {
  // Indica si el usuario está autenticado
  isAuthenticated: false,
  // Contiene la información del usuario autenticado
  user: null,
};

// Crear la colección de acciones y un reducer para gestionar el estado de autenticación
const loginSlice = createSlice({
  // Nombre del slice
  name: 'auth', 
  // Estado inicial del slice
  initialState, 
  reducers: {
    // Acción de login
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Acción de logout
    logout: (state) => {
      state.isAuthenticated = false; 
      state.user = null; 
    },
    // Acción para manejar fallos en el login
    loginFailure: (state, action) => {
      //Manejar el error
      state.isAuthenticated = false;
      state.user = null;
      // Mensaje de error
      console.error(action.payload);
    },
  },
});

// Exportar las acciones para poder usarlas en el componente
export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

// Exportación del reducer loginSlice
export default loginSlice.reducer;