import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/logoutSlice";
import imagen from "../../assets/disney.png";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    navigate("/login");
  };

  return (
    <header>
      <figure>
        <img src={imagen} alt="Logo" />
      </figure>
      <nav>
        <Link to="home">Principal</Link>
        <Link to="results">Personajes</Link>
        <button
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            marginRight: "1em",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#183739",
            fontSize: "calc(14px + 0.5vw)",
            background: "none",
            border: "none",
          }}
        >
          Salir
        </button>
      </nav>
    </header>
  );
}
