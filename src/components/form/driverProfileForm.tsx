import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/User/editUser'
import Driver from '../../model/Driver'
import Constants from '../../data/constants'
import MvtSelect from '../select/select'
import { getUserByUsername } from '../../services/User/getUserByUsername'

const vehicleType = Constants.vehicleType

const DriverProfileForm = () => {
    const navigate = useNavigate()

    //getUser assincrono para setar o objeto com os valores ja existentes
    const [formState, setFormState] = useState<Driver>({
        username: localStorage?.getItem("userName") || "",
        email: "",
        cpf: "",
        phoneNumber: "",
        licensePlate: "",
        vehicleType: ""
    })

    const [selectedVehicleType, setSelectedVehicleType] = useState(vehicleType.truck)

    useEffect(() => {
        getUserByUsername(formState?.username)
            .then(currentUser => {
                setFormState(currentUser)
                setSelectedVehicleType(currentUser.vehicleType)
            })
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
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">
                    Nome de usuário
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    required
                    disabled
                    value={formState.username}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                    E-mail
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cpfInput" className="form-label">
                    CPF
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    name="cpf"
                    value={formState.cpf}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="phoneNumberInput" className="form-label">
                    Telefone Celular
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="phoneNumberInput" className="form-label">
                    Tipo de veículo
                </label>
                <MvtSelect selected={selectedVehicleType} setSelected={setSelectedVehicleType} options={[vehicleType.bitruck, vehicleType.carreta, vehicleType.truck]} />
            </div>

            <div className="mb-3">
                <label htmlFor="licensePlateInput" className="form-label">
                    Placa
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="licensePlate"
                    name="licensePlate"
                    value={formState.licensePlate}
                    onChange={handleInputChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    )
}

export default DriverProfileForm
