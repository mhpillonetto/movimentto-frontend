import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShipmentItem from '../../components/ShipmentListItem'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'
import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';
import Constants from '../../data/constants'
import RadioButtonGroup from '../../components/ui/radioButtonGroup'

interface Filter extends Shipment {
  pricing: boolean
}

const Shipments = () => {
  const emptyShipment = {} as Shipment

  const [shipmentsList, setShipmentsList] = useState([emptyShipment])
  const [filteredShipmentsList, setFilteredShipmentsList] = useState([emptyShipment])
  const [deliveryCitiesList, setDeliveryCitiesList] = useState([''])
  const [retrievalCitiesList, setRetrievalCitiesList] = useState([''])
  const emptyFilter = {} as Filter
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
        setShipmentsList(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
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
    const filtered = shipmentsList
    setFilteredShipmentsList(filtered.filter((shipment) => {
      return (
        (filter.deliveryCity ? shipment.deliveryCity === filter.deliveryCity : true) &&
        (filter.deliveryCity ? shipment.deliveryCity === filter.deliveryCity : true) &&
        (filter.requiredVehicle ? shipment.requiredVehicle === filter.requiredVehicle : true) &&
        (filter.hasOwnProperty('tracking') ? (filter.tracking === 'tracked' ? shipment.tracking === 'tracked' : shipment.tracking != 'tracked') : true) &&
        (filter.hasOwnProperty('pricing') ? (filter.pricing ? shipment.hasOwnProperty('price') : !shipment.hasOwnProperty('price')) : true) &&
        (filter.hasOwnProperty('complement') ? (filter.complement === 'Completa' ? shipment.complement === 'Completa' : shipment.complement === 'Complemento') : true)
      )
    }))
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

        <div>
          <h3 className='mt-3'>Tipo de veículo</h3>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <RadioButtonGroup
              label="Leves"
              options={[
                { name: "requiredVehicle", label: Constants.vehicleType.tresQuartos, value: Constants.vehicleType.tresQuartos },
                { name: "requiredVehicle", label: Constants.vehicleType.fiorino, value: Constants.vehicleType.fiorino },
                { name: "requiredVehicle", label: Constants.vehicleType.toco, value: Constants.vehicleType.toco },
                { name: "requiredVehicle", label: Constants.vehicleType.vlc, value: Constants.vehicleType.vlc }
              ]}
              onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
            />
            <RadioButtonGroup
              label="Médios"
              options={[
                { name: "requiredVehicle", label: Constants.vehicleType.bitruck, value: Constants.vehicleType.bitruck },
                { name: "requiredVehicle", label: Constants.vehicleType.truck, value: Constants.vehicleType.truck }
              ]}
              onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
            />
            <RadioButtonGroup
              label="Pesados"
              options={[
                { name: "requiredVehicle", label: Constants.vehicleType.bitrem, value: Constants.vehicleType.bitrem },
                { name: "requiredVehicle", label: Constants.vehicleType.carreta, value: Constants.vehicleType.carreta },
                { name: "requiredVehicle", label: Constants.vehicleType.carretaLS, value: Constants.vehicleType.carretaLS },
                { name: "requiredVehicle", label: Constants.vehicleType.rodotrem, value: Constants.vehicleType.rodotrem },
                { name: "requiredVehicle", label: Constants.vehicleType.vanderleia, value: Constants.vehicleType.vanderleia }

              ]}
              onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
            />
          </div>

        </div>

        <div>
          <label htmlFor="trackingArea">Rastreador</label>
          <div>
            <input
              type="radio"
              value="tracked"
              onChange={e => handleFilterChange("tracking", e.target.value)}
              name="tracking"
            />
            <label htmlFor="trackingInput">Sim</label>

          </div>

          <input
            type="radio"
            value="untracked"
            onChange={e => handleFilterChange("tracking", e.target.value)}
            name="tracking"
          />
          <label htmlFor="trackingInput">Não</label>
        </div>

        <div className='mt-3'>
          <label htmlFor="complementArea">Tipo de carga</label>
          <div>
            <input
              type="radio"
              value="Completa"
              onChange={e => handleFilterChange("complement", e.target.value)}
              name="complement"
            />
            <label htmlFor="complementInput">Completa</label>

          </div>

          <input
            type="radio"
            value="Complemento"
            onChange={e => handleFilterChange("complement", e.target.value)}
            name="complement"
          />
          <label htmlFor="complementInput">Complemento</label>
        </div>

        <div className='mt-3'>
          <label htmlFor="pricingArea">Preço definido?</label>
          <div>
            <input
              type="radio"
              value="true"
              onChange={e => handleFilterChange("pricing", true)}
              name="pricing"
            />
            <label htmlFor="pricingInput">Sim</label>

          </div>

          <input
            type="radio"
            value="false"
            onChange={e => handleFilterChange("pricing", false)}
            name="pricing"
          />
          <label htmlFor="pricingInput">Não</label>


        </div>

        <button type="reset" className="btn btn-primary mt-3 mb-5" onClick={() => setFilter(emptyFilter)}>
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
