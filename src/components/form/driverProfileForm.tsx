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
            
            <h3 className='mt-3'>Tipo de veículo</h3>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <RadioButtonGroup
                    label="Leves"
                    options={[
                        { name: "vehicleType", label: vehicleType.tresQuartos, value: vehicleType.tresQuartos },
                        { name: "vehicleType", label: vehicleType.fiorino, value: vehicleType.fiorino },
                        { name: "vehicleType", label: vehicleType.toco, value: vehicleType.toco },
                        { name: "vehicleType", label: vehicleType.vlc, value: vehicleType.vlc }
                    ]}
                    onChange={handleInputChange}
                />
                <RadioButtonGroup
                    label="Médios"
                    options={[
                        { name: "vehicleType", label: vehicleType.bitruck, value: vehicleType.bitruck },
                        { name: "vehicleType", label: vehicleType.truck, value: vehicleType.truck }
                    ]}
                    onChange={handleInputChange}
                />
                <RadioButtonGroup
                    label="Pesados"
                    options={[
                        { name: "vehicleType", label: vehicleType.bitrem, value: vehicleType.bitrem },
                        { name: "vehicleType", label: vehicleType.carreta, value: vehicleType.carreta },
                        { name: "vehicleType", label: vehicleType.carretaLS, value: vehicleType.carretaLS },
                        { name: "vehicleType", label: vehicleType.rodotrem, value: vehicleType.rodotrem },
                        { name: "vehicleType", label: vehicleType.vanderleia, value: vehicleType.vanderleia }

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
