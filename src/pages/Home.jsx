import React, { useEffect, useState } from 'react';
import './home.css';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Recuperar el nombre y el correo del sessionStorage
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");

    // Establecer los estados
    if (name) setUserName(name);
    if (email) setUserEmail(email);
  }, []);

  return (
    <div className='bienvenida'>
      <section>
        <h3>Bienvenido de vuelta, {userName}!</h3>
        <p>Estás conectado a tu cuenta {userEmail}</p>
        <p>Explora y disfruta de Disney Personajes</p>
      </section>
   </div>
  );
}
