import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DriverProfileForm from '../../components/form/driverProfileForm';
import TransporterProfileForm from '../../components/form/transporterProfileForm'

const Profile = () => {
const navigate = useNavigate()

  useEffect(()=>{
    console.log('====================================');
    console.log(localStorage.userName);
    console.log('====================================');
    if(!localStorage.userName){
      console.log('====================================');
      console.log(localStorage.userName);
      console.log('====================================');
      navigate('/', { replace: true })
    }
  },[])

  return (
    <div className='container mt-5'>
      <h1>Meu Perfil</h1>
      {(() => {
        switch (localStorage.getItem("userType")) {
          case 'Transportadora':
            return <TransporterProfileForm />
          case 'Motorista':
            return <DriverProfileForm />
          case 'Operador':
            return <DriverProfileForm />
          default:
            return null
        }
      })()}
        
    </div>
  )
}

export default Profile
