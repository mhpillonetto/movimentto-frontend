import React, { useEffect, useState } from 'react'

import ShipmentItem from '../../components/Shipment'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'

const Shipments = () => {
  const [shipmentsList, setShipmentsList] = useState([{
    name: "",
    deliveryLocation: "",
    retrievalLocation: "",
    owner: "",
    createdAt: new Date(),
    price: 0,
    requiredVehicle: "",
  }])

  useEffect(() => {
    getAllShipments()
      .then(list => {
        setShipmentsList(list)
      })
  },[])

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>
      <ul>
        {shipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.name}><ShipmentItem {...shipment} /></li>)}
      </ul>
    </div>
  )
}

export default Shipments
