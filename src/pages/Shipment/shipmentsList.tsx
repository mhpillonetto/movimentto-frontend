import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShipmentItem from '../../components/ShipmentListItem'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'
import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';

type Filter = {
  deliveryCity: string
  deliveryState: string
  retrievalCity: string
  retrievalState: string
  vehicleType: string
  carriageType: string
  tracking: boolean
  price: boolean
  complement: boolean
}

const Shipments = () => {
  const emptyShipment = {} as Shipment

  const [shipmentsList, setShipmentsList] = useState([emptyShipment])

  const [deliveryCitiesList, setDeliveryCitiesList] = useState([''])
  const [retrievalCitiesList, setRetrievalCitiesList] = useState([''])

  const emptyFilter = {} as Filter
  const [filter, setFilter] = useState(emptyFilter)

  const handleFilterChange = useCallback((name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    })

    console.log('====================================');
    console.log(filter);
    console.log('====================================');
  }, [filter])

  //seta as cidades no select quando seleciona o estado
  useEffect(() => {
    if(filter.deliveryState) {
      const filtered = citiesList.estados
        .filter(function (estado) {
          return estado.sigla === filter.deliveryState;
        })
      setDeliveryCitiesList(filtered[0].cidades)
    }

    if(filter.retrievalState) {
      const filtered = citiesList.estados
        .filter(function (estado) {
          return estado.sigla === filter.retrievalState;
        })
      setRetrievalCitiesList(filtered[0].cidades)
    }
  }, [filter])

  useEffect(() => {
    getAllShipments()
      .then(list => {
        setShipmentsList(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      })
      .catch(error => console.log(error)
      )
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.userName) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>

      <div>
        <h5>Entrega</h5>
        <select onChange={event => handleFilterChange("deliveryState",event.target.value)}>
          {statesList.UF.map(state => {
            return <option value={state.sigla}>{state.sigla}</option>
          })}
        </select>
        <select onChange={event => handleFilterChange("deliveryCity", event.target.value,)}>
          {
            deliveryCitiesList
            .map(city => {
              return <option value={city}>{city}</option>
            })
          }
        </select>
      </div>

      <div>
        <h5>Retirada</h5>
        <select onChange={event => handleFilterChange("retrievalState",event.target.value)}>
          {statesList.UF.map(state => {
            return <option value={state.sigla}>{state.sigla}</option>
          })}
        </select>
        
        <select onChange={event => handleFilterChange("retrievalCity", event.target.value,)}>
          {
            retrievalCitiesList
            .map(city => {
              return <option value={city}>{city}</option>
            })
          }
        </select>
      </div>

      <ul>
        {shipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.title}><ShipmentItem {...shipment} /></li>)}
      </ul>
    </div>
  )
}

export default Shipments
