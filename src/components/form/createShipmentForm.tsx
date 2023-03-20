import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shipment from '../../model/Shipment/Shipment'
// import DateInput from '../DateInput'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import TextInput from '../TextInput'


const CreateShipmentForm = () => {

    const [formState, setFormState] = useState<Shipment>({
        title: "",
        deliveryLocation: "",
        deliveryDate: new Date(),
        retrievalLocation: "",
        retrievalDate: new Date(),
        owner: "",
        createdAt: new Date(),
        price: 0,
        requiredVehicle: "",
        observations: ""
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

        console.log('====================================');
        console.log(formState);
        console.log('====================================');
    }, [formState]);

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                value={formState.title}
                handleChange={handleInputChange}
                fieldName='title'
                label='Título da carga'
                required={true}
            />

            <TextInput
                value={formState.deliveryLocation}
                handleChange={handleInputChange}
                fieldName='deliveryLocation'
                label='Local de Entrega'
                required={true}
            />

            <div style={{ flexDirection: "row" }}>
                <label htmlFor='deliveryDateInput' className="form-label">
                    Data da Entrega
                </label>
                <DatePicker
                    selected={formState.deliveryDate}
                    onChange={(date) => setFormState({ ...formState, deliveryDate: date })}
                />
            </div>
            <TextInput
                value={formState.retrievalLocation}
                handleChange={handleInputChange}
                fieldName='retrievalLocation'
                label='Local de Retirada'
                required={true}
            />

            <div style={{ flexDirection: "row" }}>
                <label htmlFor='retrievalDateInput' className="form-label">
                    Data da Retirada
                </label>
                <DatePicker
                    selected={formState.retrievalDate}
                    onChange={(date) => setFormState({ ...formState, retrievalDate: date })}
                />
            </div>



            <button type="submit" className="btn btn-primary mt-3">
                Enviar
            </button>
        </form>
    )
}

export default CreateShipmentForm
