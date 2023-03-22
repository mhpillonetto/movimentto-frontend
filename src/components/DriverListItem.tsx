import React from 'react'
import { useNavigate } from 'react-router-dom'

const DriverListItem = (props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/motoristas/perfil', { replace: true, state: { driver: props } })
    }

    return (
        <div onClick={handleClick}>
            <p>{props.username}</p>
            <p>{props.vehicleType ? props.vehicleType : "veículo nao listado"}</p>
            <p>{props.phoneNumber ? props.phoneNumber : "telefone nao listado"}</p>
            <p>{props.city} - {props.state}</p>
        </div>
    )
}

export default DriverListItem
