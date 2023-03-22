import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Transporter from '../../model/User/Transporter';
import { getUserByUsername } from '../../services/User/getUserByUsername';

const TransporterDetails = () => {
    const { state } = useLocation();
    console.log('====================================');
    console.log(state);
    console.log('====================================');
    return (
        <div className='container mt-5'>
            <h3>{state.username}</h3>
            <p>Telefone para contato: {state.contactPhoneNumber}</p>
            <p>Responsável: {state.contactName}</p>
            <p>{state.email}</p>
            <p>CEP: {state.cep}</p>
            <p>CNPJ: {state.cnpj}</p>
            <p>website: <a href={state.website} target="_blank">{state.website}</a></p>
        </div>
    )
}

export default TransporterDetails
