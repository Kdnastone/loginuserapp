// Importar los hooks necesarios de React
import { useState } from "react";

// Importar el hook de react-router-dom para la navegación
import { useNavigate, Link } from "react-router-dom";

// Importar el hook useDispatch para acceder a Redux
import { useDispatch, useSelector } from "react-redux";

// Importar las funciones del loginSlice para el manejo de autenticación
import { loginRequest, loginSuccess, loginFailure } from "../redux/loginSlice";

function Login() {
  // Hook para acceder al dispatch de Redux
  const dispatch = useDispatch();
  // Hook para navegar entre rutas de la aplicación
  const navigate = useNavigate();

  // Estado para almacenar el correo y la contraseña ingresados por el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estado para almacenar mensajes de error en el formulario
  const [error, setError] = useState("");

  // Obtener el estado de autenticación desde el Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    // Previene la recarga de la página al enviar el formulario
    e.preventDefault();

    // Validación básica para comprobar que los campos no estén vacíos
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      // Termina la ejecución si hay campos vacíos
      return;
    }

    // Restablecer el mensaje de error antes de la validación
    setError("");

    // Recuperar datos del sessionStorage para la verificación
    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("password");

    // Iniciar el proceso de inicio de sesión
    dispatch(loginRequest());

    // Verificar si los datos ingresados coinciden con los almacenados
    if (email === storedEmail && password === storedPassword) {
      // Marcar el inicio de sesión como exitoso
      dispatch(loginSuccess({ email, password }));
      // Mostrar un mensaje de éxito
      alert("¡Inicio de sesión exitoso!");

      // Redirigir solo si el usuario no está autenticado
      if (!isAuthenticated) {
        navigate("/home"); // Redirigir al usuario a la página principal
      }
    } else {
      // Si las credenciales no coinciden, establecer el mensaje de error
      setError("Credenciales incorrectas.");
      // Marcar el inicio de sesión como fallido
      dispatch(loginFailure("Credenciales incorrectas."));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Mostrar mensaje de error si existe */}
      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        // Placeholder para el campo de correo
        placeholder="Correo electrónico"
        // Valor controlado para el estado 'email'
        value={email}
        // Actualiza el estado 'email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ position: "relative" }}>
        {/* Contenedor relativo para el campo de contraseña */}
        <input
          // Cambia entre 'text' y 'password'
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
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

      {/* Botón para enviar el formulario */}
      <button type="submit">Iniciar Sesión</button>

      {/* Botón para recuperar la contraseña, utilizando Link para la navegación */}
      <Link to="/recovery">
        <button type="button">Recuperar contraseña</button>
      </Link>

      {/* Botón para registrar un nuevo usuario, utilizando Link para la navegación */}
      <Link to="/register">
        <button type="button">Registrar Usuario</button>
      </Link>
    </form>
  );
}

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login;
