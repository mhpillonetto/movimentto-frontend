import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MvtSelect from '../../components/select/select';
import { checkin } from '../../services/Checkin';
import { reverseGeocoding } from '../../services/Geocoding/reverseGeocoding';

import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';
import { geocode } from '../../providers';
import { forwardGeocoding } from '../../services/Geocoding/forwardGeocoding';
import RadioButtonGroup from '../../components/ui/radioButtonGroup';

const Checkin = () => {
  const navigate = useNavigate()

  const [location, setLocation] = useState({
    city: "",
    state: ""
  })
  const [filteredCitiesList, setFilteredCitiesList] = useState(['', ''])
  const [status, setStatus] = useState('')


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

  const handleSelectStatus = (selectedStatus) => {
    setStatus(selectedStatus.target.value)
  }

  useEffect(() => {
    if (location.state) {
      const filtered = citiesList.estados
        .filter(function (estado) {
          return estado.sigla === location.state;
        })
      setFilteredCitiesList(filtered[0].cidades)
    }
  }, [location.state])

  const handleCheckin = async () => {
    try {
      // const position = await forwardGeocoding(location.city, location.state)
      const position = {
        lat: -25.459935,
        long: -49.280018
      }
      await checkin(position, location, status)
    
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
      {/* <p>Permita que o navegador acesse sua localização</p> */}
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
            filteredCitiesList.map(city => {
              return <option value={city}>{city}</option>
            })
          }
        </select>
      </div>

      <div className='mt-3'>
        <RadioButtonGroup
          label="Status de carregamento"
          options={[
            { name: "vehicleType", label: "Carregado", value: "Carregado" },
            { name: "vehicleType", label: "Parcialmente Carregado", value: "Parcialmente Carregado" },
            { name: "vehicleType", label: "Vazio", value: "Vazio" }
          ]}
          onChange={handleSelectStatus}
        />
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
