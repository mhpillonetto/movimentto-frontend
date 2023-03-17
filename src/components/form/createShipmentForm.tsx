import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shipment from '../../model/Shipment/Shipment'
import { login } from '../../services/Auth/login'


const CreateShipmentForm = () => {

    const [formState, setFormState] = useState<Shipment>({
        name: "",
        deliveryLocation: "",
        retrievalLocation: "",
        owner: "",
        createdAt: new Date(),
        price: 0,
        requiredVehicle: "",
    })

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const targetInput = event.currentTarget

        const { value, name } = targetInput

        setFormState({
            ...formState,
            [name]: value,
        })
    }, [formState])


    const navigate = useNavigate();

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // const { username, password } = formState;

        // if (!username || !password) {
        //     window.alert("Fill all the required fields")
        //     return
        // }

        // try {
        //     await login(formState)
        //     navigate('/inicio', { replace: true })

        // } catch (error) {
        //     console.log(error);
        //     window.alert("Usuário ou senha incorretos")
        // }

    }, [formState]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputUsername" className="form-label">
                    Título
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="retrievalInput" className="form-label">
                    Local de Retirada
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    value={formState.requiredVehicle}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Enviar
            </button>
        </form>
    )
}

export default CreateShipmentForm
