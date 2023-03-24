import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShipmentItem from '../../components/Shipment'
import Shipment from '../../model/Shipment/Shipment'
import { getAllShipments } from '../../services/Shipment/getAllShipments'

const Shipments = () => {

  const emptyShipment = {} as Shipment

  const [shipmentsList, setShipmentsList] = useState([emptyShipment])

  useEffect(() => {
    getAllShipments()
      .then(list => {
        setShipmentsList(list)
      })
      .catch(error => console.log(error)
      )
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.userName) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <div className='container'>
      <h1>Cargas disponíveis</h1>
      <ul>
        {shipmentsList.map(shipment => <li className='container mt-5 border' key={shipment.title}><ShipmentItem {...shipment} /></li>)}
      </ul>
    </div>
  )
}

export default Shipments
