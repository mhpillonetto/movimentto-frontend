import React from 'react'
import { useLocation } from 'react-router-dom';

const DriverDetails = () => {
    const { state } = useLocation();

    return (
        <div className='container mt-5'>
            <h3>{state.driver.displayName}</h3>
            <p>Veículo: {state.driver.vehicleType}</p>
            <p>{state.driver.phoneNumber}</p>
            <p>Localização: {state.driver.city} - {state.driver.state}</p>
            <p>Status do veículo: {state.driver.status}</p>
            <p>Check-in as: {new Date(state.driver.lastCheckIn).toLocaleTimeString('pt-br')}</p>
        </div>
    )
}

export default DriverDetails
