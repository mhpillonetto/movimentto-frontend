import React, { useEffect, useState } from 'react'

import ShipmentItem from '../../components/Shipment'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'

const Shipments = () => {
  const [shipmentsList, setShipmentsList] = useState([{
    title: "",
    deliveryLocation: "",
    deliveryDate: new Date(),
    retrievalLocation: "",
    retrievalDate: new Date(),
    owner: "",
    createdAt: new Date(),
    price: 0,
    requiredVehicle: "",
    observations: ""
  }])

  useEffect(() => {
    getAllShipments()
      .then(list => {
        setShipmentsList(list)
      })
  }, [])

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>
      <ul>
        {shipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.title}><ShipmentItem {...shipment} /></li>)}
      </ul>
    </div>
  )
}

export default Shipments
