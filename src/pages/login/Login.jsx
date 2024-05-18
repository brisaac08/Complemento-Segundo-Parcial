import React, { useState } from 'react';
import './Login.css';
import { FooterLogin } from '../../components/login/FooterLogin';
import logo from '../../assets/logo without background.png';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== '' && input.password !== '') {
      try {
        await auth.loginAction(input);
      } catch (error) {
        setMensaje(error.message);
      }
      return;
    }
    alert('Todos los campos son obligatorios');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='body-login'>
      <header className='header-login'>
        <img onClick={() => navigate('/')} src={logo} alt='logo' className='login-logo' />
        <p className='name'>By: Brayan Caro</p>
      </header>
      <form className='main-login' onSubmit={handleSubmitEvent}>
        <div className='login-container'>
          <h2>INICIAR SESIÓN</h2>
          <div className='login-inputs'>
            <input
              type='text'
              placeholder='Email'
              id='username'
              name='username'
              onChange={handleInput}
              aria-describedby='username'
              aria-invalid='false'
              required
            />
            <input
              type='password'
              placeholder='Contraseña'
              id='password'
              name='password'
              aria-describedby='password'
              aria-invalid='false'
              onChange={handleInput}
              required
            />
            <button className='btn-iniciar-sesion'>LOGIN</button>
            <a href='#'>¿Olvidaste la contraseña?</a>
          </div>
          <div className='recuerdame'>
            <input type='checkbox' name='remember-me' id='remember-me' />
            <p>Recuérdame</p>
          </div>
        </div>
      </form>
      <FooterLogin />
    </div>
  );
}
