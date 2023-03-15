import React from 'react'
import DriverProfileForm from '../../components/form/driverProfileForm';
import TransporterProfileForm from '../../components/form/transporterProfileForm'

const Profile = () => {
  console.log('====================================');
  console.log(localStorage.getItem("userType"));
  console.log('====================================');
  return (
    <div className='container mt-5'>
      <h1>Meu Perfil</h1>
      {(() => {
        switch (localStorage.getItem("userType")) {
          case 'Transportadora':
            return <TransporterProfileForm />
          case 'Motorista':
            return <DriverProfileForm />
          default:
            return null
        }
      })()}
        
    </div>
  )
}

export default Profile
