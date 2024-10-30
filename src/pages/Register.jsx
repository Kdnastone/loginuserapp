// Importar los hooks necesarios de React
import { useState } from "react";

// Importar este hook de react-router-dom que permite navegar entre las diferentes rutas de la aplicación.
import { useNavigate } from "react-router-dom";

// Importar el hook useDispatch que permite acceder a la función dispatch de Redux, que se utiliza para enviar acciones al store.
import { useDispatch } from "react-redux";

// Importar las funciones de registerSlice para el registro de usuarios
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from "../redux/registerSlice";

function Register() {
  // Hook para acceder al dispatch de Redux
  const dispatch = useDispatch();
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Estado para almacenar el nombre, correo, la contraseña y la confirmación de la contraseña
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado para almacenar mensajes de error posibles en el formulario
  const [error, setError] = useState("");

  // Estado para almacenar el estado de carga del formulario
  const [loading, setLoading] = useState(false);

  // Estado para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funciones de validación
  const validateForm = () => {
    // Verificación de campos vacíos
    if (!name || !email || !password || !confirmPassword) {
      // Considera usar un estado de error en lugar de alert
      alert("Todos los campos son obligatorios."); 
      return false;
    }
    // Verificación básica de que el e-mail contenga '@' y '.com'
    if (!email.includes("@") || !email.includes(".com")) {
      // Considera usar un estado de error en lugar de alert
      alert("Por favor, ingrese un correo electrónico válido."); 
      return false;
    }
    // Verificación de que las contraseñas coincidan
    if (password !== confirmPassword) {
      // Considera usar un estado de error en lugar de alert
      alert("Las contraseñas no coinciden."); 
      return false;
    }
    // Sin errores
    return true;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación antes de enviar datos
    if (!validateForm()) return;
    
    // Activar el estado de carga
    setLoading(true);

    // Guardar datos en sessionStorage
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);

    // Enviar acción de solicitud de registro
    dispatch(registerRequest());

    try {
      // Aquí debería incluirse la lógica de registro (API o similar)
      // Simulación de registro exitoso
      dispatch(registerSuccess({ name, email, password }));
      
      // Mostrar mensaje de éxito
      // Considera usar un estado de éxito en lugar de alert
      alert("¡Usuario registrado exitosamente!"); 
      // Redirigir al login
      navigate("/login");
    } catch (err) {
      // Enviar acción de fallo de registro
      dispatch(registerFailure(err.message));
      // Mostrar mensaje de error
      // Se puede mostrar el error en el componente
      setError(err.message); 
    } finally {
      // Desactivar el estado de carga
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Mostrar mensaje de error si existe */}
      {error && <div className="error-message">{error}</div>}

      <input
        // Campo para el nombre
        type="text"
        placeholder="Nombre"
        value={name}
        // Actualiza el estado 'name' con el valor ingresado por el usuario
        onChange={(e) => setName(e.target.value)}
      />

      <input
        // Campo para el correo electrónico
        type="text"
        placeholder="Correo electrónico"
        value={email}
        // Actualiza el estado 'email' con el valor ingresado por el usuario
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ position: "relative" }}>
        {/* Contenedor relativo para el campo de contraseña */}
        <input
          // Cambia entre 'text' y 'password' según el estado de showPassword
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          // Actualiza el estado 'password' con el valor ingresado por el usuario
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          // Cambia el estado de showPassword
          onClick={() => setShowPassword(!showPassword)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          {/* Texto del botón cambia según el estado */}
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <div style={{ position: "relative" }}>
        {/* Contenedor relativo para el campo de confirmación de contraseña */}
        <input
          // Cambia entre 'text' y 'password' según el estado de showConfirmPassword
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          // Actualiza el estado 'confirmPassword' con el valor ingresado por el usuario
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          // Cambia el estado de showConfirmPassword
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          {/* Texto del botón cambia según el estado */}
          {showConfirmPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {/* Botón deshabilitado si está en carga */}
      <button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Registrarse"}
      </button>

      {/* Botón para regresar a la página de inicio de sesión */}
      <button type="button" onClick={() => navigate("/login")}>
        Principal
      </button>
    </form>
  );
}

// Exporta el componente Register para su uso en otras partes de la aplicación
export default Register;
