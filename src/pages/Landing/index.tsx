import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../components/Heading'

const Landing = () => {
  return (
    <div className='container mt-5'>
      <Heading title={"Bem-vindo!"} />
      <div>
        <ul>
          <li>
            <Link to="/login" replace={true}>Login</Link>
          </li>
          <li>
            <Link to="/cadastro" replace={true}>Novo Usuário</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Landing
