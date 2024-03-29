import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Shipment from '../../model/Shipment/Shipment';
import Transporter from '../../model/User/Transporter';
import { getContactInfo } from '../../services/User/getContactInfo';
import { getUserByUsername } from '../../services/User/getUserByUsername';

const ShipmentDetail = () => {
    let { state } = useLocation();
    const shipment: Shipment = state;

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
            <h3>{shipment.title}</h3>
            <div className='mt-3'>
                <p>Origem {shipment.retrievalCity} - {shipment.retrievalState} </p>
                <p><>Data da retirada: {new Date(shipment.retrievalDate).toLocaleDateString('pt-br')}</></p>
                <p>Destino {shipment.deliveryCity} - {shipment.deliveryState} </p>
                <p><>Data da entrega: {new Date(shipment.deliveryDate).toLocaleDateString('pt-br')}</></p>
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
