import React, { useCallback } from 'react'
import Constants from '../../data/constants'

const userType = Constants.userType

type userTypeSelectProps = {
    selectedUserType: string,
    setSelectedUserType: React.Dispatch<React.SetStateAction<string>>
}

const UserTypeSelect = ({selectedUserType, setSelectedUserType}: userTypeSelectProps) => {
    
    const handleSelectUserType = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentSelected = event.currentTarget.value
    
        setSelectedUserType(currentSelected)
      }, [selectedUserType])
    

    return (
        <div>
            <select className="form-selec mt-3 mb-3" aria-label="Default select example" onChange={handleSelectUserType}>
                <option selected>Selecione o tipo de usuário</option>
                <option value={userType.transportadora}>Transportadora</option>
                <option value={userType.operador}>Operador</option>
                <option value={userType.motorista}>Motorista</option>
            </select>
        </div>
    )
}

export default UserTypeSelect
