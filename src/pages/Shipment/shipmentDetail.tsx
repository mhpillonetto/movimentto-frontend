import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Transporter from '../../model/User/Transporter';
import { getContactInfo } from '../../services/User/getContactInfo';
import { getUserByUsername } from '../../services/User/getUserByUsername';

const ShipmentDetail = () => {
    let { state } = useLocation();
    const shipment = state;

    const emptyTransporter = {} as Transporter
    const [contactInfo, setContactInfo] = useState(emptyTransporter)

    useEffect(() => {
        getUserByUsername(shipment.ownerUsername)
            .then(contact => {
                setContactInfo(contact)
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
        <div className='container mt-5'>
            <h1>{shipment.name}</h1>
            <div className='mt-3'>
                <h2>{shipment.title}</h2>
                <p>Origem {shipment.retrievalLocation} </p>
                <p>Data da retirada: {shipment.retrievalDate}</p>
                <p>Destino {shipment.deliveryLocation} </p>
                <p>Data da entrega: {shipment.deliveryDate}</p>
                <p>Postado por {shipment.ownerDisplayName}</p>
                <p>Veículo requisitado: {shipment.requiredVehicle}</p>
                <p>Espécie: {shipment.productType}</p>
                {shipment.weight ? <p>Peso total: {shipment.weight}</p> : null}
                {shipment.complement ? <p>Tipo de Carga: {shipment.complement}</p> : null}
                {shipment.flooringType ? <p>Peso total: {shipment.flooringType}</p> : null}
                {shipment.necessaryItems ? <p>Peso total: {shipment.necessaryItems}</p> : null}
                <h5 className='mt-3'>Preço: {shipment.price}</h5>

            </div>
            <div>
                <h3 className='mt-3'>Contato</h3>
                <p>{contactInfo.contactName}</p>
                <p>{contactInfo.phoneNumber}</p>
                <Link to='/transportadora' state={ contactInfo }>Mais informações</Link>
            </div>

        </div>
    )
}

export default ShipmentDetail
