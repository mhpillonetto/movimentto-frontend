import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading'
import { logout } from '../../services/logout';

const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='container mt-5'>
      <Heading title={"Essa é sua página inicial"} />
      <div className='mb-5'>Bem vindo ao perfil de {localStorage.userType}</div>
      <p><Link to='/perfil'>Editar Perfil</Link></p>
      <p><Link to='/cargas'>Cargas Disponíveis</Link></p>
      <div>
        <button className="btn btn-primary mt-5" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  )
}

export default Home
