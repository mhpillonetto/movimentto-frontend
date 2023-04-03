import React, { useEffect, useState } from 'react'
import DriverListItem from '../../components/DriverListItem'
import { getCheckedInDrivers } from '../../services/Driver/getCheckedInDrivers'
import Driver from '../../model/User/Driver'
import { AxiosResponse } from 'axios'
import Hidden from '../../components/Hidden'
import DriversFilter from '../../components/DriversFilter'

const Drivers = () => {
    const emptyDriversList = [] as Driver[]
    const emptyDriver = {} as Driver

    const [driversList, setDriversList] = useState(emptyDriversList)
    const [filteredDriversList, setFilteredDriversList] = useState(emptyDriversList)
    const [filter, setFilter] = useState(emptyDriver)

    useEffect(() => {
        getCheckedInDrivers()
            .then(res => {
                setDriversList(res.data)
            })
            .catch(error => console.log(error)
            )
    }, [])

    //applies filter
    useEffect(() => {
        console.log('====================================');
        console.log(filter);
        console.log('====================================');

        const filtered = driversList
        setFilteredDriversList(filtered ? filtered.filter((driver) => {
            return (
                (filter.city ? driver.city?.toUpperCase().match(filter.city.toUpperCase()) : true) &&
                (filter.vehicleType ? driver.vehicleType === filter.vehicleType : true)
            )
        }) : [])
    }, [filter])

    return (
        <div className='container mt-5'>
            <h1>Motoristas Disponíveis</h1>
            <Hidden label='Filtro' defaultHide={true} >
                <DriversFilter filter={filter} setFilter={setFilter} />
            </Hidden>
            <ul>
                {
                    Array.isArray(filteredDriversList) ?
                        filteredDriversList.map(driver => <li className='container mt-5 border' key={driver.username}><DriverListItem {...driver} /></li>)
                        : null
                }
            </ul>
        </div>
    )
}

export default Drivers
