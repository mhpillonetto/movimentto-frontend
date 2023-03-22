import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkin } from '../../services/Checkin';

const Checkin = () => {
  const navigate = useNavigate()
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })
  useEffect(() => {    
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition(position.coords)
    });
  }, [])

  const handleCheckin = async () => {
    try {
      await checkin(position)
      window.alert('Check-in realizado com sucesso!')
      navigate('/cargas', {replace: true})
    }
    catch (error) {
      window.alert('erro ao realizar o checkin')
    }
  }
  return (
    <div className='container mt-5'>
      <h2>Confirme suas informações</h2><br />
      <h5>Latitude: {position.latitude}</h5>
      <h5>Longitude: {position.longitude}</h5><br />
      <button
        type="submit"
        className="btn btn-primary mt-3"
        onClick={handleCheckin}
      >
        Check In
      </button>
    </div>
  )
}

export default Checkin
