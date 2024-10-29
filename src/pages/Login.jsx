// Importar los hooks necesarios de React
import { useState, useEffect } from "react";

// Importar este hook de react-router-dom que permite navegar entre las diferentes rutas de la aplicación.
import { useNavigate, Link} from "react-router-dom";

// Importar el hook useDispatch que permite acceder a la función dispatch de Redux, que se utiliza para enviar acciones al stoer.
import { useDispatch } from "react-redux";

// Importar las funciones del loginSlice para autenticación.
import { 
  loginRequest, 
  loginSuccess, 
  loginFailure 
} from "../redux/loginSlice";

function Login() {
  // Hook para acceder al dispatch de Redux
  const dispatch = useDispatch();
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Estado para almacenar el correo y la contraseña ingresados por el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para almacenar mensajes de error posibles en el formulario
  const [error, setError] = useState("");

  // useEffect para almacenar los datos en sessionStorage
  useEffect(() => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
  }, [email, password]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    // Previene la recarga de la página al enviar el formulario
    e.preventDefault();

    // Verificación básica de que el e-mail contenga '@' y '.com'
    if (!email.includes("@") || !email.includes(".com")) {
      // Mensaje de error si el e-mail es inválido
      alert("Por favor, ingresa un correo electrónico válido.");
      // Detiene la ejecución de la función si el e-mail es inválido
      return;
    }

    setError("");

    dispatch(loginRequest());

    try {
      // Registro exitoso
      dispatch(loginSuccess({ email, password }));
      // Redirigir al login
      navigate("/home");
    } catch (err) {
      dispatch(loginFailure(err.message));
      // Mostrar mensaje de error
      setError(err.message);
    } finally {
      // Desactivar el estado de carga
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Muestra el mensaje de error si existe */}
      {error && <div className="error-message">{error}</div>}

      <input
        // Cambiado a tipo 'e-mail' para mejor validación del navegador
        type="email"
        // Texto del placeholder actualizado
        placeholder="Correo electrónico"
        // Establece el valor del input como el estado del correo
        value={email}
        // Actualiza el estado con el valor ingresado
        onChange={(e) => setEmail(e.target.value)}
        // Hace que el campo sea obligatorio
        required
      />

      <input
        // Campo para la contraseña
        type="password"
        // Texto del placeholder para la contraseña
        placeholder="Contraseña"
        // Establece el valor del input como el estado de la contraseña
        value={password}
        // Actualiza el estado con el valor ingresado
        onChange={(e) => setPassword(e.target.value)}
        // Hace que el campo sea obligatorio
        required
      />

      {/* Botón para enviar el formulario */}
      <button type="submit">Iniciar sesión</button>

      {/* Botón para recuperar la contraseña, usando Link */}
      <Link to="/recovery">
        <button type="button">Recuperar contraseña</button>
      </Link>

      {/* Botón para registrar un usuario, usando Link */}
      <Link to="/register">
        <button type="button">Registrar Usuario</button>
      </Link>
    </form>
  );
}

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login;
