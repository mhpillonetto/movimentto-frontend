import React from 'react'

const DriverListItem = (props) => {
  return (
    <div>
      <p>{props.username}</p>
      <p>{props.vehicleType ? props.vehicleType : "veículo nao listado"}</p>
      <p>{props.phoneNumber ? props.phoneNumber : "telefone nao listado"}</p>
      <p>{props.city} - {props.state}</p>
    </div>
  )
}

export default DriverListItem
