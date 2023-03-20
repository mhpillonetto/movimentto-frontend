import React from 'react'
import { Link } from 'react-router-dom'
import Shipment from '../model/Shipment/Shipment'


const ShipmentItem = (shipment: Shipment) => {
  return (
    <div>
      <h4>{shipment.title}</h4>
      <p>Origem: {shipment.retrievalLocation}</p>
      <p>Destino: {shipment.deliveryLocation}</p>
      <p>Postado por: {shipment.owner}</p>
      <p>Produto: {shipment.product}</p>
      <p>Espécie: {shipment.productType}</p>
      <p>Veículo: {shipment.requiredVehicle}</p>
      <p>Preço: {shipment.price}</p>
      <Link to='/cargas/detalhes' state={shipment}>Mais Informações</Link>
    </div>
  )
}

export default ShipmentItem
