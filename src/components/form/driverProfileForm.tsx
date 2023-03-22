import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/User/editUser'
import Driver from '../../model/User/Driver'
import Constants from '../../data/constants'
import MvtSelect from '../select/select'
import { getUserByUsername } from '../../services/User/getUserByUsername'
import TextInput from '../input/TextInput'

const vehicleType = Constants.vehicleType

const DriverProfileForm = () => {
    const navigate = useNavigate()

    const emptyDriver = { username: localStorage.userName } as Driver

    const [formState, setFormState] = useState<Driver>(emptyDriver)

    const [selectedVehicleType, setSelectedVehicleType] = useState(vehicleType.truck)

    useEffect(() => {
        getUserByUsername(formState?.username)
            .then(currentUser => {
                setFormState(currentUser)
                setSelectedVehicleType(currentUser.vehicleType)
            })
            .catch(error => console.log(error)
            )
    }, [])

    useEffect(() => {
        setFormState({ ...formState, vehicleType: selectedVehicleType })
    }, [selectedVehicleType])

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const targetInput = event.currentTarget

        const { value, name } = targetInput

        setFormState({
            ...formState,
            [name]: value,
        })
    }, [formState])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const vehicleType = selectedVehicleType
        const editedDriver = { ...formState, vehicleType }
        try {
            await editUser(editedDriver)
            navigate('/inicio', { replace: true })
        } catch (error) {
            console.log(error)
        }

    }, [formState])

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                value={formState.username}
                handleChange={handleInputChange}
                fieldName='username'
                label='Nome de Usuário'
                required={true}
                disabled={true}
            />

            <TextInput
                value={formState.email}
                handleChange={handleInputChange}
                fieldName='email'
                label='E-mail'
                required={true}
            />

            <TextInput
                value={formState.cpf}
                handleChange={handleInputChange}
                fieldName='cpf'
                label='CPF'
                required={false}
            />

            <TextInput
                value={formState.phoneNumber}
                handleChange={handleInputChange}
                fieldName='phoneNumber'
                label='Telefone Celular (com DDD)'
                required={false}
            />

            <div>
                <label htmlFor="phoneNumberInput" className="form-label">
                    Tipo de veículo
                </label>
                <MvtSelect
                    defaultValue=""
                    selected={selectedVehicleType}
                    setSelected={setSelectedVehicleType}
                    options={[vehicleType.bitruck, vehicleType.carreta, vehicleType.truck]}
                />
            </div>

            <TextInput
                value={formState.licensePlate}
                handleChange={handleInputChange}
                fieldName='licensePlate'
                label='Placa do veículo'
                required={false}
            />

            <button type="submit" className="btn btn-primary mt-3">
                Salvar
            </button>
        </form>
    )
}

export default DriverProfileForm
