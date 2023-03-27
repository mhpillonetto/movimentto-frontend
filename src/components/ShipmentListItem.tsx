import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Shipment from '../model/Shipment/Shipment'

const ShipmentItem = (shipment: Shipment) => {
  const navigate = useNavigate()
  const handleClick = () => navigate('/cargas/detalhes', { replace: true, state: shipment })

  return (
    <div style={{ cursor: "pointer" }} onClick={handleClick} className='d-flex flex-column'>
      <h4>{shipment.title}</h4>
      <div className='d-flex flex-row justify-content-between'>
        <div className='d-flex flex-column justify-content-between'>
          <p>Destino: {shipment.deliveryLocation}</p>
          <p><>{new Date(shipment.deliveryDate).toLocaleDateString('pt-br')}</></p>
        </div>
        <div className='d-flex flex-column justify-content-between'>
          <p>Origem: {shipment.retrievalLocation}</p>
          <p><>{new Date(shipment.deliveryDate).toLocaleDateString('pt-br')}</></p>
        </div>

        <div className='d-flex flex-column justify-content-between'>
          {shipment.ownerDisplayName ? <p>Postado por: {shipment.ownerDisplayName}</p> : <p>Nome não informado</p>}
          <p>{shipment.requiredVehicle}</p>
        </div>

        <div>
          <p>Produto: {shipment.product}</p>
          <p>Espécie: {shipment.productType}</p>
        </div>
        <div>
          {shipment.price && <p>Preço: {shipment.price}</p>}
          {shipment.weight && <p>Peso: {shipment.weight} kg</p>}
        </div>
      </div>

    </div>
  )
}

export default ShipmentItem
