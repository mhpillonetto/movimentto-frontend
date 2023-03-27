import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MvtSelect from '../../components/select/select';
import { checkin } from '../../services/Checkin';
import { reverseGeocoding } from '../../services/Geocoding/reverseGeocoding';

import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';
import { geocode } from '../../providers';
import { forwardGeocoding } from '../../services/Geocoding/forwardGeocoding';

const Checkin = () => {
  const navigate = useNavigate()

  const [location, setLocation] = useState({
    city: "",
    state: ""
  })

  const [filteredCitiesList,setFilteredCitiesList] = useState(['',''])

  const handleSelectState = (selectedState) => {
    setLocation({
      ...location,
      state: selectedState
    })
  }

  const handleSelectCity = (selectedCity) => {
    setLocation({
      ...location,
      city: selectedCity
    })
  }

  useEffect(()=>{
    if(location.state){
      const filtered = citiesList.estados
      .filter(function (estado){
        return estado.sigla === location.state;
      })
      setFilteredCitiesList(filtered[0].cidades)
    }
  },[location.state])

  const handleCheckin = async () => {
    try {
      const position = await forwardGeocoding(location.city, location.state)

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
      <div>
        <h5>Estado</h5>
        <select onChange={event => handleSelectState(event.target.value)}>
          {statesList.UF.map(state => {
            return <option value={state.sigla}>{state.sigla}</option>
          })}
        </select>
      </div>

      <div>
        <h5>Cidade</h5>
        <select onChange={event => handleSelectCity(event.target.value)}>
          {
            filteredCitiesList.map( city => {
              return <option value={city}>{city}</option>
            })
          }
        </select>
      </div>

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
