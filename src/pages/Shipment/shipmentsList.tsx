import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShipmentItem from '../../components/ShipmentListItem'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'
import Constants from '../../data/constants'
import RadioButtonGroup from '../../components/ui/radioButtonGroup'
import RadioButton from '../../components/ui/radioButton'
import TextInput from '../../components/input/TextInput'
import ShipmentsFilter from '../../components/ShipmentsFilter'
import Hidden from '../../components/Hidden'

interface Filter extends Shipment {
  pricing: boolean
}

const Shipments = () => {
  const emptyShipment = {} as Shipment

  const [shipmentsList, setShipmentsList] = useState([emptyShipment])
  const [filteredShipmentsList, setFilteredShipmentsList] = useState([emptyShipment])
  const emptyFilter = {} as Filter
  const [filter, setFilter] = useState(emptyFilter)

  //get shipmentsList from backend, order by createdAt
  useEffect(() => {
    getAllShipments()
      .then(list => {
        setShipmentsList(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        setFilteredShipmentsList(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      })
      .catch(error => console.log(error)
      )

  }, [])

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

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.userName) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>
      <Hidden label={"Filtro"} defaultHide={true}>
        <ShipmentsFilter filter={filter} setFilter={setFilter} />
      </Hidden>

      <ul>
        {filteredShipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.title}><ShipmentItem {...shipment} /></li>)}
      </ul>
    </div>
  )
}

export default Shipments
