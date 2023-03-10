import React from 'react'
import { Link } from 'react-router-dom'

import RegisterForm from '../../components/form/registerForm'

const Register = () => {
  return (
    <div className='container mt-5'>
      <h2>Register here</h2>

      <RegisterForm />

      <div className='mt-5'>
        <ul>
          <li>
            <Link to="/login" replace={true}>Log in</Link>
          </li>
          <li>
            <Link to="/" replace={true}>Home</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Register
