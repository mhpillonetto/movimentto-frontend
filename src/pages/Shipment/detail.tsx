import React from 'react'
import { useLocation } from 'react-router-dom';

const ShipmentDetail = () => {
    let { state } = useLocation();
    const shipment = state;

    console.log('====================================');
    console.log(new Date(shipment.createdAt).toLocaleTimeString());
    console.log('====================================');

    return (
        <div className='container mt-5'>
            <h1>{shipment.name}</h1>
            <div className='mt-3'>
                <h3>De {state.retrievalLocation} para {shipment.deliveryLocation}</h3>
                <h4>Postado por {shipment.owner}</h4>
                <h4>Criado as {new Date(shipment.createdAt).toLocaleTimeString()} de {new Date(shipment.createdAt).toLocaleDateString()}</h4>
            </div>

            <h2 className='mt-3'>Preço: {shipment.price}</h2>
        </div>
    )
}

export default ShipmentDetail
