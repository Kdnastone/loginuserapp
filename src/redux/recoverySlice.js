// Importar createSlice para crear un slice del Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const recoverySlice = createSlice({
  name: "recovery",
  initialState: {
    // Estado de carga para indicaciones visuales
    loading: false,
    // Inicialmente, no hay errores
    error: null,
  },
  reducers: {
    // Acción para iniciar el proceso de recuperación
    recoveryRequest(state) {
      // Cambiar el estado de carga a true
      state.loading = true;
      // Limpiar errores previos
      state.error = null;
    },
    // Acción para indicar que el correo de recuperación se envió con éxito
    recoverySuccess(state) {
      // Cambiar el estado de carga a false
      state.loading = false;
      // Puedes agregar un mensaje de éxito si es necesario
    },
    // Esta función se utiliza para manejar errores en el proceso de recuperación
    recoveryFailure (state, action) {
      // La operación ha terminado, ya sea con éxito o con error
      state.loading = false;
      // Mostrar el error específico que ocurrió durante el proceso
      state.error = action.payload;
    },
  },
});

// Exportar las acciones para poder usarlas en el componente
export const { recoveryRequest, recoverySuccess, recoveryFailure } = recoverySlice.actions;

// Exportar el reducer para combinarlo en el store
export default recoverySlice.reducer;
