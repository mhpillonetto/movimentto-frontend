import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShipmentItem from '../../components/ShipmentListItem'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'
import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';

const Shipments = () => {
  const emptyShipment = {} as Shipment

  const [shipmentsList, setShipmentsList] = useState([emptyShipment])
  const [filteredShipmentsList, setFilteredShipmentsList] = useState([emptyShipment])
  const [deliveryCitiesList, setDeliveryCitiesList] = useState([''])
  const [retrievalCitiesList, setRetrievalCitiesList] = useState([''])
  const emptyFilter = {} as Shipment
  const [filter, setFilter] = useState(emptyFilter)

  const handleFilterChange = useCallback((name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    })
  }, [filter])

  //get from backend, order by createdAt
  useEffect(() => {
    getAllShipments()
      .then(list => {
        setShipmentsList(list)
        setFilteredShipmentsList(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
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

  //sets cities for selected states
  useEffect(() => {
    if (filter.deliveryState) {
      const filtered = citiesList.estados
        .filter(function (estado) {
          return estado.sigla === filter.deliveryState;
        })
      setDeliveryCitiesList(filtered[0].cidades)
    }

    if (filter.retrievalState) {
      const filtered = citiesList.estados
        .filter(function (estado) {
          return estado.sigla === filter.retrievalState;
        })
      setRetrievalCitiesList(filtered[0].cidades)
    }
  }, [filter])

  //applies filter
  useEffect(() => {
    console.log('====================================');
    console.log(filter);
    console.log('====================================');
    const filtered = shipmentsList
      .filter((shipment) => {
        return (
          (filter.deliveryCity ? shipment.deliveryCity === filter.deliveryCity : true) &&
          (filter.deliveryCity ? shipment.deliveryCity === filter.deliveryCity : true)
        )
      })

    setFilteredShipmentsList(filtered)
  }, [filter])

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>
      {/* Filtro */}
      <div>
        <div>
          <h5>Entrega</h5>
          <select onChange={event => handleFilterChange("deliveryState", event.target.value)}>
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
          <select onChange={event => handleFilterChange("retrievalState", event.target.value)}>
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
        <button type="reset" className="btn btn-primary mt-3 mb-5" onClick={()=>setFilter(emptyShipment)}>
                Limpar
        </button>
      </div>
      <ul>
        {filteredShipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.title}><ShipmentItem {...shipment} /></li>)}
      </ul>
    </div>
  )
}

export default Shipments
