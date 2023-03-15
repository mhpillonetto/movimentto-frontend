import React, { useEffect } from 'react'
import ShipmentItem from '../../components/Shipment'
import Shipment from '../../model/Shipment/Shipment'

const Shipments = () => {
  const shipmentsList: Shipment[] = [
    { 
      name: "Entrega de Tampas",
      deliveryLocation: "Rio de Janeiro - RJ",
      retrievalLocation: "Curitiba - PR" ,
      owner: "operator",
      createdAt: "15/03/2023 18:00" ,
    },
    { 
      name: "Entrega de Tampas",
      deliveryLocation: "Rio de Janeiro - RJ",
      retrievalLocation: "Curitiba - PR" ,
      owner: "operator",
      createdAt: "15/03/2023 18:00" ,
    },
    { 
      name: "Entrega de Tampas",
      deliveryLocation: "Rio de Janeiro - RJ",
      retrievalLocation: "Curitiba - PR" ,
      owner: "operator",
      createdAt: "15/03/2023 18:00" ,
    }
  ]

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>
      <ul>
        {shipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.name}><ShipmentItem {...shipment}/></li>)}
      </ul>
    </div>
  )
}

export default Shipments
