// Importar los hooks necesarios de React
import React, { useState } from "react";

// Importar este hook de react-router-dom que permite navegar entre las diferentes rutas de la aplicación.
import { useNavigate } from "react-router-dom";

// Importar los hooks useDispatch y useSelector de react-redux que permiten acceder a la función dispatch de Redux y a los estados del store.
import { useDispatch, useSelector } from "react-redux";

// Importar las funciones de recoverySlice para la recuperación de contraseña
import {
  recoveryRequest,
  recoverySuccess,
  recoveryFailure,
} from "../redux/recoverySlice";

function Recovery() {
  // Hook para acceder a la función dispatch de Redux
  const dispatch = useDispatch();
  // Hook para la navegación
  const navigate = useNavigate();

  // Estado para almacenar el correo electrónico ingresado por el usuario
  const [email, setEmail] = useState("");
  // Estado para almacenar mensajes de error
  const [error, setError] = useState("");

  // Obtener el estado de recuperación desde Redux con useSelector que permite acceder a los estados del store
  const { loading, error: recoveryError } = useSelector(
    // Seleccionar el estado de recuperación
    (state) => state.recovery
  );

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    // Prevenir la recarga de la página al enviar el formulario
    e.preventDefault();

    // Verificación de que el campo de correo no esté vacío
    if (!email) {
      alert("Por favor, ingrese su correo electrónico.");
      return;
    }

    // Limpiar el mensaje de error
    setError("");

    // Iniciar la solicitud de recuperación
    dispatch(recoveryRequest());

    try {
      // Simulamos una respuesta exitosa
      dispatch(recoverySuccess({ email }));
      // Redirigir a una página de confirmación
      navigate("/confirmation");
    } catch (err) {
      // Manejar errores en la recuperación
      dispatch(recoveryFailure(err.message));
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Mostrar mensaje de error si existe */}
      {error && <div className="error-message">{error}</div>}
      {recoveryError && <div className="error-message">{recoveryError}</div>}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Botón para enviar el formulario */}
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Recuperar Contraseña"}
      </button>

      {/* Botón para regresar a la página de inicio de sesión */}
      <button type="button" onClick={() => navigate("/login")}>
        Principal
      </button>
    </form>
  );
}

// Exportar el componente Recovery para su uso en otras partes de la aplicación
export default Recovery;