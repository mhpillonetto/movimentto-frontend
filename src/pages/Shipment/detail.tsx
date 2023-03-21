import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getContactInfo } from '../../services/User/getContactInfo';

const ShipmentDetail = () => {
    let { state } = useLocation();
    const shipment = state;
    
    const [contactInfo, setContactInfo] = useState({name: "", phoneNumber: ""})

    useEffect(() => {
        getContactInfo(shipment.owner)
            .then(contact => {
                setContactInfo(contact)
            })
            .catch(error=>console.log(error)
            )
    }, [])


    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.userName){
          navigate('/', { replace: true })
        }
      },[])

    return (
        <div className='container mt-5'>
            <h1>{shipment.name}</h1>
            <div className='mt-3'>
                <h2>{shipment.title}</h2>
                <p>Origem {shipment.retrievalLocation} </p>
                <p>Data da retirada: {shipment.retrievalDate}</p>
                <p>Destino {shipment.deliveryLocation} </p>
                <p>Data da entrega: {shipment.deliveryDate}</p>
                <p>Postado por {shipment.owner}</p>
                <p>Veículo requisitado: {shipment.requiredVehicle}</p>
                <p>Espécie: {shipment.productType}</p>
                {shipment.weight ? <p>Peso total: {shipment.weight}</p>: null}
                {shipment.shipmentType ? <p>Tipo de Carga: {shipment.shipmentType}</p> : null}
                <h5 className='mt-3'>Preço: {shipment.price}</h5>
            </div>
            <div>
                <h3 className='mt-3'>Contato</h3>
                <p>{contactInfo.name}</p>
                <p>{contactInfo.phoneNumber}</p>
            </div>

        </div>
    )
}

export default ShipmentDetail
