import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading'

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get<JSON>("http://localhost:3500/logout", {
    })
      .then(function (response) {
        navigate('/', { replace: true })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className='container mt-5'>
      <Heading title={"Essa é sua página inicial"} />
      <div>
        <button className="btn btn-primary mt-5" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  )
}

export default Home
