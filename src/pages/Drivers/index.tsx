import React from 'react'
import DriverListItem from '../../components/Driver'

const Drivers = () => {
    const driversList = [
        {
            name: "Jose da Silva",
            vehicleType: "Carreta",
            phoneNumber: "(41)912345678"
        },
        {
            name: "Joao Pereira",
            vehicleType: "Carreta",
            phoneNumber: "(55)912345678"
        },
        {
            name: "Fulano de Tal",
            vehicleType: "Truck",
            phoneNumber: "(42)912345678"
        }
    ]
    return (
        <div className='container mt-5'>
            <h1>Motoristas Disponíveis</h1>
            <ul>
                {driversList.map(driver => <li className='container mt-5 border' key={driver.name}><DriverListItem {...driver} /></li>)}
            </ul>
        </div>
    )
}

export default Drivers
