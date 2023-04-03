import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShipmentItem from '../../components/ShipmentListItem'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'
import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';
import Constants from '../../data/constants'
import RadioButtonGroup from '../../components/ui/radioButtonGroup'
import RadioButton from '../../components/ui/radioButton'
import TextInput from '../../components/input/TextInput'

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
    console.log('====================================');
    console.log(filter);
    console.log('====================================');

    const filtered = shipmentsList
    setFilteredShipmentsList(filtered.filter((shipment) => {
      return (
        (filter.deliveryCity ? shipment.deliveryCity?.toUpperCase().match(filter.deliveryCity.toUpperCase()) : true) &&
        (filter.retrievalCity ? shipment.retrievalCity?.toUpperCase().match(filter.retrievalCity.toUpperCase()) : true) &&
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
        <TextInput
          value={filter.deliveryCity ? filter.deliveryCity : ''}
          handleChange={event => handleFilterChange("deliveryCity", event.target.value)}
          fieldName='deliveryCity'
          label='Destino'
        />

        <TextInput
          value={filter.retrievalCity ? filter.retrievalCity : ''}
          handleChange={event => handleFilterChange("retrievalCity", event.target.value)}
          fieldName='retrievalCity'
          label='Origem'
        />
        <div>
          <h5 className='mt-3'>Tipo de veículo</h5>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <RadioButtonGroup
              label="Leves"
              options={[
                { name: "requiredVehicle", label: Constants.vehicleType.tresQuartos, value: Constants.vehicleType.tresQuartos, checked: filter.requiredVehicle === Constants.vehicleType.tresQuartos },
                { name: "requiredVehicle", label: Constants.vehicleType.fiorino, value: Constants.vehicleType.fiorino, checked: filter.requiredVehicle === Constants.vehicleType.fiorino },
                { name: "requiredVehicle", label: Constants.vehicleType.toco, value: Constants.vehicleType.toco, checked: filter.requiredVehicle === Constants.vehicleType.toco },
                { name: "requiredVehicle", label: Constants.vehicleType.vlc, value: Constants.vehicleType.vlc, checked: filter.requiredVehicle === Constants.vehicleType.vlc }
              ]}
              onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
            />
            <RadioButtonGroup
              label="Médios"
              options={[
                { name: "requiredVehicle", label: Constants.vehicleType.bitruck, value: Constants.vehicleType.bitruck, checked: filter.requiredVehicle === Constants.vehicleType.bitruck },
                { name: "requiredVehicle", label: Constants.vehicleType.truck, value: Constants.vehicleType.truck, checked: filter.requiredVehicle === Constants.vehicleType.truck }
              ]}
              onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
            />
            <RadioButtonGroup
              label="Pesados"
              options={[
                { name: "requiredVehicle", label: Constants.vehicleType.bitrem, value: Constants.vehicleType.bitrem, checked: filter.requiredVehicle === Constants.vehicleType.bitrem },
                { name: "requiredVehicle", label: Constants.vehicleType.carreta, value: Constants.vehicleType.carreta, checked: filter.requiredVehicle === Constants.vehicleType.carreta },
                { name: "requiredVehicle", label: Constants.vehicleType.carretaLS, value: Constants.vehicleType.carretaLS, checked: filter.requiredVehicle === Constants.vehicleType.carretaLS },
                { name: "requiredVehicle", label: Constants.vehicleType.rodotrem, value: Constants.vehicleType.rodotrem, checked: filter.requiredVehicle === Constants.vehicleType.rodotrem },
                { name: "requiredVehicle", label: Constants.vehicleType.vanderleia, value: Constants.vehicleType.vanderleia, checked: filter.requiredVehicle === Constants.vehicleType.vanderleia }
              ]}
              onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
            />
          </div>

        </div>

        <div>
          <h5>Rastreador</h5>
          <div>
            <RadioButton
              value={filter.tracking}
              label="Sim"
              name="tracking"
              id={"tracked"}
              onChange={e => handleFilterChange("tracking", "tracked")}
              checked={filter.tracking === "tracked"}
            />
          </div>

          <div>
            <RadioButton
              value={filter.tracking}
              label="Não"
              name="tracking"
              id={"untracked"}
              onChange={e => handleFilterChange("tracking", "untracked")}
              checked={filter.tracking === "untracked"}
            />
          </div>
        </div>

        <div className='mt-3'>
          <h5>Tipo de carga</h5>
          <RadioButton
            value={filter.complement}
            label="Compĺeta"
            name="complement"
            id={"complement"}
            onChange={e => handleFilterChange("complement", "Completa")}
            checked={filter.complement === "Completa"}
          />

          <RadioButton
            value={filter.complement}
            label="Compĺemento"
            name="complement"
            id={"complement"}
            onChange={e => handleFilterChange("complement", "Complemento")}
            checked={filter.complement === "Complemento"}
          />
        </div>

        <div className='mt-3'>
          <h5>Preço definido?</h5>
          <RadioButton
            value={filter.price}
            label="Sim"
            name="pricing"
            id={"pricing"}
            onChange={e => handleFilterChange("pricing", true)}
            checked={filter.pricing === true}
          />

          <RadioButton
            value={filter.price}
            label="Não"
            name="pricing"
            id={"pricing"}
            onChange={e => handleFilterChange("pricing", false)}
            checked={filter.pricing === false}
          />
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
