import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Shipment from '../model/Shipment/Shipment'


const ShipmentItem = (shipment: Shipment) => {
  const navigate = useNavigate()
  const handleClick = () => navigate('/cargas/detalhes', { replace: true, state: shipment })
return (
  <div style={{ cursor: "pointer" }} onClick={handleClick}>
    <h4>{shipment.title}</h4>
    <p>Origem: {shipment.retrievalLocation}</p>
    <p>Destino: {shipment.deliveryLocation}</p>
    <p>Postado por: {shipment.owner}</p>
    <p>Produto: {shipment.product}</p>
    <p>Espécie: {shipment.productType}</p>
    <p>Veículo: {shipment.requiredVehicle}</p>
    <p>Preço: {shipment.price}</p>
  </div>
)
}

export default ShipmentItem
