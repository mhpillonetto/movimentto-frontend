import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/User/editUser'
import Constants from '../../data/constants'
import MvtSelect from '../select/select'
import { getUserByUsername } from '../../services/User/getUserByUsername'
import TextInput from '../input/TextInput'
import Operator from '../../model/User/Operator'
import RadioButtonGroup from '../ui/radioButtonGroup'

const vehicleType = Constants.vehicleType

const DriverProfileForm = () => {
    const navigate = useNavigate()

    const emptyOperator = { username: localStorage.userName } as Operator

    const [formState, setFormState] = useState<Operator>(emptyOperator)

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
        const editedOperator = { ...formState, vehicleType }
        try {
            await editUser(editedOperator)
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
                value={formState.displayName}
                handleChange={handleInputChange}
                fieldName='displayName'
                label='Nome da Empresa'
                required={false}
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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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

            <TextInput
                value={formState.firstComplementLicensePlate}
                handleChange={handleInputChange}
                fieldName='firstComplementLicensePlate'
                label='Placa do Complemento 1'
                required={false}
            />

            <TextInput
                value={formState.secondComplementLicensePlate}
                handleChange={handleInputChange}
                fieldName='secondComplementLicensePlate'
                label='Placa do Complemento 2'
                required={false}
            />

            <div className="mb-3">
                <TextInput
                    value={formState.cep}
                    handleChange={handleInputChange}
                    fieldName='cep'
                    label='CEP'
                />
            </div>

            <div className="mb-3">
                <TextInput
                    value={formState.address}
                    handleChange={handleInputChange}
                    fieldName='address'
                    label='Endereço'
                />
            </div>

            <div className="mb-3">
                <TextInput
                    value={formState.antt}
                    handleChange={handleInputChange}
                    fieldName='antt'
                    label='Registro ANTT'
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
                Salvar
            </button>
        </form>
    )
}

export default DriverProfileForm
