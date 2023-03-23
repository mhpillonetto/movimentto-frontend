import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/User/editUser'
import Driver from '../../model/User/Driver'
import Constants from '../../data/constants'
import MvtSelect from '../select/select'
import { getUserByUsername } from '../../services/User/getUserByUsername'
import TextInput from '../input/TextInput'
import RadioButtonGroup from '../ui/radioButtonGroup'

const vehicleType = Constants.vehicleType

const DriverProfileForm = () => {
    const navigate = useNavigate()

    const emptyDriver = { username: localStorage.userName } as Driver

    const [formState, setFormState] = useState<Driver>(emptyDriver)

    useEffect(() => {
        getUserByUsername(formState?.username)
            .then(currentUser => {
                setFormState(currentUser)
            })
            .catch(error => console.log(error)
            )
    }, [])

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
        const editedDriver = { ...formState }

        console.log('====================================');
        console.log(editedDriver);
        console.log('====================================');
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
                <RadioButtonGroup
                    label="Tipo de veículo"
                    options={[
                        { name: "vehicleType", label: vehicleType.bitruck, value: vehicleType.bitruck },
                        { name: "vehicleType", label: vehicleType.carreta, value: vehicleType.carreta },
                        { name: "vehicleType", label: vehicleType.truck, value: vehicleType.truck }
                    ]}
                    onChange={handleInputChange}
                />
            </div>

            <TextInput
                value={formState.licensePlate}
                handleChange={handleInputChange}
                fieldName='licensePlate'
                label='Placa do Cavalo'
                required={false}
            />

            {/* <TextInput
                value={formState.licensePlate}
                handleChange={handleInputChange}
                fieldName='licensePlate'
                label='Placa do Complemento 1'
                required={false}
            />

            <TextInput
                value={formState.licensePlate}
                handleChange={handleInputChange}
                fieldName='licensePlate'
                label='Placa do Complemento 2'
                required={false}
            /> */}

            <button type="submit" className="btn btn-primary mt-3">
                Salvar
            </button>
        </form>
    )
}

export default DriverProfileForm
