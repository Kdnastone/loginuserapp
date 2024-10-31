// Importar librería React
import React from "react";
import imagen from "../../assets/disney.png";

const Header = () => {
  return (
    <header>
      <figure>
        <img src={imagen} alt="Logo" />
      </figure>
      <h1>Ingreso de Usuarios</h1>
    </header>
  );
};

export default Header;
