// Importar createSlice para crear un slice del Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
   // Estado de autenticación
    isAuthenticated: false, 
  },
  reducers: {
    logout: (state) => {
      //Actualizar el estado de autenticación
      state.isAuthenticated = false; 
    },
  },
});

// Exportar la acción para el cierre de sesión
export const { logout } = logoutSlice.actions;

// Exportar el reducer
export default logoutSlice.reducer;
