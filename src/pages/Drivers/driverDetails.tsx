import React from 'react'
import { useLocation } from 'react-router-dom';

const DriverDetails = () => {
    const { state } = useLocation();

    return (
        <div className='container mt-5'>
            <h3>{state.driver.username}</h3>
            <p>{state.driver.vehicleType}</p>
            <p>{state.driver.phoneNumber}</p>
            <p>{state.driver.city} - {state.driver.state}</p>
            <p>{state.driver.lastCheckIn}</p>
        </div>
    )
}

export default DriverDetails
