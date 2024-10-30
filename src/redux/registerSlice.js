// Importar createSlice para crear un slice del Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    // Inicialmente, no hay un usuario registrado
    user: null, 
    // Estado de carga para indicaciones visuales
    loading: false, 
    // Inicialmente, no hay errores
    error: null, 
  },
  reducers: {
    // Acción para iniciar el registro
    registerRequest(state) {
      // Cambiar el estado de carga a true
      state.loading = true;
      // Limpiar errores previos
      state.error = null;
    },
    // Acción para registrar un usuario con éxito
    registerSuccess(state, action) {
      // Cambiar el estado de carga a fasle
      state.loading = false;
      // Almacenar el usuario registrado
      state.user = action.payload;
    },
    // Esta función se utiliza para manejar situaciones donde algo sale mal durante el proceso de registro.
    registerFailure(state, action) {
      // La operación de registro ha terminado, ya sea con éxito o con error. 
      state.loading = false;
      // Muestra en un mensae el error específico que ocurrió durante el registro.
      state.error = action.payload;
    },
  },
});

// Exportar las acciones para poder usarlas en el componente
export const { registerRequest, registerSuccess, registerFailure } = registerSlice.actions;

// Exportar el reducer para combinarlo en el store
export default registerSlice.reducer;
