import React from 'react'

const ShipmentDetail = () => {
    const shipment = {
        name: "Entrega de Tampas",
        deliveryLocation: "Rio de Janeiro - RJ",
        retrievalLocation: "Curitiba - PR",
        owner: "operator",
        createdAt: "15/03/2023 18:00",
        price: "5000"
    }
    return (
        <div className='container mt-5'>
            <h1>{shipment.name}</h1>
            <div className='mt-3'>
                <h3>De {shipment.retrievalLocation} para {shipment.deliveryLocation}</h3>
                <h4>Postado por {shipment.owner}</h4>
                <h4>Criado em {shipment.createdAt}</h4>
            </div>

            <h2 className='mt-3'>Preço: {shipment.price}</h2>
        </div>
    )
}

export default ShipmentDetail
