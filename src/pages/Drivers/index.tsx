import React, { useEffect, useState } from 'react'
import DriverListItem from '../../components/DriverListItem'
import { getCheckedInDrivers } from '../../services/Driver/getCheckedInDrivers'
import Driver from '../../model/User/Driver'
import { AxiosResponse } from 'axios'

const Drivers = () => {
    const emptyDriversList = [] as Driver[]

    const [driversList, setDriversList] = useState<AxiosResponse | null | void | Driver[]>(emptyDriversList)

    useEffect(() => {
        getCheckedInDrivers()
            .then(res => {
                setDriversList(res.data)
            })
            .catch(error => console.log(error)
            )
    }, [])
    return (
        <div className='container mt-5'>
            <h1>Motoristas Disponíveis</h1>
            <ul>
                {
                    Array.isArray(driversList) ? 
                    driversList.map(driver => <li className='container mt-5 border' key={driver.username}><DriverListItem {...driver} /></li>)
                        : null
                }
            </ul>
        </div>
    )
}

export default Drivers
