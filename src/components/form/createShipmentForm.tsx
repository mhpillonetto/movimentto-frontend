import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shipment from '../../model/Shipment/Shipment'
// import DateInput from '../DateInput'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import TextInput from '../input/TextInput'
import NumericInput from '../input/NumericInput'


const CreateShipmentForm = () => {
    const navigate = useNavigate();

    const emptyShipment = {} as Shipment

    const [formState, setFormState] = useState<Shipment>(emptyShipment)

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

            <div>
                <TextInput
                    value={formState.deliveryLocation}
                    handleChange={handleInputChange}
                    fieldName='deliveryLocation'
                    label='Local de Entrega'
                    required={true}
                />
                <div>
                    <label htmlFor='deliveryDateInput' className="form-label">
                        Data da Entrega
                    </label>
                    <DatePicker
                        selected={formState.deliveryDate}
                        onChange={(date) => setFormState({ ...formState, deliveryDate: date })}
                    />
                </div>
            </div>

            <div>
                <TextInput
                    value={formState.retrievalLocation}
                    handleChange={handleInputChange}
                    fieldName='retrievalLocation'
                    label='Local de Retirada'
                    required={true}
                />
                <div>
                    <label htmlFor='retrievalDateInput' className="form-label">
                        Data da Retirada
                    </label>
                    <DatePicker
                        selected={formState.retrievalDate}
                        onChange={(date) => setFormState({ ...formState, retrievalDate: date })}
                    />
                </div>

            </div>

            <NumericInput 
                value={formState.price}
                handleChange={handleInputChange}
                fieldName='price'
                label='Preço com frete'
                required={false}
            />

            <button type="submit" className="btn btn-primary mt-3">
                Enviar
            </button>
        </form>
    )
}

export default CreateShipmentForm
