import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkin } from '../../services/Checkin';
import { reverseGeocoding } from '../../services/Geocoding/forwardGeocoding';

const Checkin = () => {
  const navigate = useNavigate()
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })
  const [location, setLocation] = useState({
    city: "",
    state: ""
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition(position.coords)
    })
  }, [])

  useEffect(() => {
    if (position.latitude !== 0 && position.latitude !== 0) {
      reverseGeocoding(position.latitude, position.longitude)
        .then(result => setLocation(result)
        )
    }
  }, [position])


  const handleCheckin = async () => {
    try {
      await checkin(position, location)
      window.alert('Check-in realizado com sucesso!')
      navigate('/cargas', { replace: true })
    }
    catch (error) {
      window.alert('erro ao realizar o checkin')
    }
  }
  return (
    <div className='container mt-5'>
      <h2>Confirme sua Localização</h2><br />
      <p>Permita que o navegador acesse sua localização</p>
      <h5>Cidade: {location.city}</h5>
      <h5>Estado: {location.state}</h5><br />
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
