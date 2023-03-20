import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shipment from '../../model/Shipment/Shipment'
// import DateInput from '../DateInput'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import TextInput from '../input/TextInput'
import NumericInput from '../input/NumericInput'
import Constants from '../../data/constants'
import MvtSelect from '../select/select'


const CreateShipmentForm = () => {
    const navigate = useNavigate()
    const vehicleType = Constants.vehicleType
    const productType = Constants.productType

    const emptyShipment = {} as Shipment

    const [formState, setFormState] = useState<Shipment>(emptyShipment)
    const [selectedVehicleType, setSelectedVehicleType] = useState(vehicleType.truck)
    const [selectedProductType, setselectedProductType] = useState(productType.diversos)

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


        event.preventDefault()
        const vehicleType = selectedVehicleType
        const productType = selectedProductType
        const newShipment = { ...formState, vehicleType, productType }

        console.log('====================================');
        console.log(newShipment);
        console.log('====================================');

        // try {
        //     await editUser(editedDriver)
        //     navigate('/inicio', { replace: true })
        // } catch (error) {
        //     console.log(error)
        // }

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
                value={formState.product}
                handleChange={handleInputChange}
                fieldName='product'
                label='Produto a ser entregue'
                required={true}
            />

            <div>
                <label htmlFor="phoneNumberInput" className="form-label">
                    Espécie de produto
                </label>
                <MvtSelect
                    defaultValue=""
                    selected={selectedVehicleType}
                    setSelected={setSelectedVehicleType}
                    options={[
                        productType.animais,
                        productType.bigBag,
                        productType.caixas,
                        productType.diversos,
                        productType.paletes
                    ]}
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3 mb-5">
                Enviar
            </button>
        </form>
    )
}

export default CreateShipmentForm
