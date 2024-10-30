// Importar createSlice para crear un slice del Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Este es el estado inicial del slice de autenticación
const initialState = {
  // Indica si el usuario está autenticado
  isAuthenticated: false,
  // Contiene la información del usuario autenticado
  user: null,
  // Estado de carga para manejar el inicio de sesión
  loading: false,
  // Mensaje de error en caso de fallo de autenticación
  error: null,
};

// Crear la colección de acciones y un reducer para gestionar el estado de autenticación
const loginSlice = createSlice({
  // Nombre del slice
  name: "auth",
  // Estado inicial del slice
  initialState,
  reducers: {
    // Acción para indicar que se ha iniciado el proceso de login
    loginRequest: (state) => {
      // Cambia el estado de carga a true
      state.loading = true;
      // Limpia el mensaje de error anterior
      state.error = null;
    },
    // Acción para indicar que el ingreso fue exitoso
    loginSuccess: (state, action) => {
      // Actualiza la autenticación
      state.isAuthenticated = true;
      // Guarda la información del usuario
      state.user = action.payload;
      // Cambia el estado de carga a false
      state.loading = false;
    },
    // Acción de logout
    logout: (state) => {
      // Restablece el estado de autenticación
      state.isAuthenticated = false;
      // Limpia la información del usuario
      state.user = null;
    },
    // Acción para manejar fallos en el login
    loginFailure: (state, action) => {
      // Asegura que no esté autenticado
      state.isAuthenticated = false;
      // Limpia la información del usuario
      state.user = null;
      // Cambia el estado de carga a false
      state.loading = false;
      // Guarda el mensaje de error
      state.error = action.payload;
      // Loguea el error en consola
      console.error(action.payload);
    },
  },
});

// Exportar las acciones para poder usarlas en el componente
export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

// Exportación del reducer loginSlice
export default loginSlice.reducer;
