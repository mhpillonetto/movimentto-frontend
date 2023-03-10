import React from 'react'
import { Link } from 'react-router-dom'

import LoginForm from '../../components/form/loginForm'

const Login = () => {
  return (
    <div className='container mt-5'>
      <h2>Entre na plataforma</h2>

      <LoginForm />

      <div className='mt-5'>
        <ul>
          <li>
            <Link to="/cadastro" replace={true}>Novo Usuário</Link>
          </li>
          <li>
            <Link to="/" replace={true}>Início</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Login
