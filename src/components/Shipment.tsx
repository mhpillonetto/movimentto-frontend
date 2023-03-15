import React from 'react'
import { Link } from 'react-router-dom'
import Shipment from '../model/Shipment/Shipment'


const ShipmentItem = (shipment: Shipment) => {
  return (
    <div>
      <h4>{shipment.name}</h4>
      <p>Entrega: {shipment.deliveryLocation}</p>
      <p>Retirada: {shipment.retrievalLocation}</p>
      <p>Postado por: {shipment.owner}</p>
      <p>Postado em: {shipment.createdAt}</p>
      <Link to='/cargas/detalhes'>Mais Informações</Link>
    </div>
  )
}

export default ShipmentItem
