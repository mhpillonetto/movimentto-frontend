import React from 'react'

const DriverListItem = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.vehicleType ? props.vehicleType : "veículo nao listado"}</p>
      <p>{props.phoneNumber ? props.phoneNumber : "telefone nao listado"}</p>
    </div>
  )
}

export default DriverListItem
