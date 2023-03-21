import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateShipmentForm from '../../components/form/createShipmentForm'

const CreateShipment = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.userName){
          navigate('/', { replace: true })
        }
      },[])

    return (
        <div className='container mt-5'>
            <h2>Anuncie sua Carga</h2>
            <CreateShipmentForm />
        </div>
    )
}

export default CreateShipment
