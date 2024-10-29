// Importar los hooks necesarios de React
import { useState } from "react";

// Importar este hook de react-router-dom que permite navegar entre las diferentes rutas de la aplicación.
import { useNavigate } from "react-router-dom";

// Importar el hook useDispatch que permite acceder a la función dispatch de Redux, que se utiliza para enviar acciones al stoer.
import { useDispatch } from "react-redux";

// Importar llas funciones de registerSlice para el registro de usuarios
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

  // Estado para almacenar el nombre, correo, la contraseña y la confirmación de la contraseña, datos ingresados por el usuario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado para almacenar mensajes de error posibles en el formulario
  const [error, setError] = useState("");

  // Estado para almacenar el estado de carga del formulario
  const [loading, setLoading] = useState(false);

  // Funciones de validación
  const validateForm = () => {
    // Verificación de campos vacíos
    if (!name || !email || !password || !confirmPassword) {
      return "Todos los campos son obligatorios.";
    }
    // Verificación básica de que el e-mail contenga '@' y '.com'
    if (!email.includes("@") || !email.includes(".com")) {
      return "Por favor, ingrese un correo electrónico válido.";
    }
    // Verificación de que las contraseñas coincidan
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    // Sin errores
    return null;
  };

  // Manejo del envío del formulario
  // Asíncrona para manejar la lógica de registro de usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    const validationError = validateForm();
    if (validationError) {
      // Mostrar mensaje de error
      setError(validationError);
      return;
    }
    // Limpiar errores
    setError("");
    // Activar el estado de carga
    setLoading(true);

    // Guardar datos en sessionStorage
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);

    dispatch(registerRequest());

    try {
      // Registro exitoso
      dispatch(registerSuccess({ name, email, password }));
      // Redirigir al login
      navigate("/login");
    } catch (err) {
      dispatch(registerFailure(err.message));
      // Mostrar mensaje de error
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
        required
      />

      <input
        // Campo tipo 'e-mail' para mejor validación del navegador
        type="email"
        placeholder="Correo electrónico"
        value={email}
        // Actualiza el estado 'e-mail' con el valor ingresado por el usuario
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        // Campo para la contraseña
        type="password"
        placeholder="Contraseña"
        value={password}
        // Actualiza el estado 'password' con el valor ingresado por el usuario
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        // Campo para la confirmación de la contraseña
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        // Actualiza el estado 'confirmPassword' con el avlor ingresado por el usuario
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {/* Botón deshabilitado si está en carga*/}
      <button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Registrarse"}
      </button>
    </form>
  );
}

// Exporta el componente Register para su uso en otras partes de la aplicación
export default Register;
