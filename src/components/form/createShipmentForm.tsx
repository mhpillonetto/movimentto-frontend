import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shipment from '../../model/Shipment/Shipment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import TextInput from '../input/TextInput'
import NumericInput from '../input/NumericInput'
import Constants from '../../data/constants'
import MvtSelect from '../select/select'
import { createShipment } from '../../services/Shipment/createShipment'
import RadioButtonGroup from '../ui/radioButtonGroup'
import statesList from '../../data/states.json';
import citiesList from '../../data/cities.json';

const CreateShipmentForm = () => {
    const navigate = useNavigate()
    const vehicleType = Constants.vehicleType
    const productType = Constants.productType

    const emptyShipment = {} as Shipment

    const [formState, setFormState] = useState<Shipment>(emptyShipment)
    const [selectedProductType, setselectedProductType] = useState(productType.diversos)
    const [location, setLocation] = useState({
        deliveryCity:"",
        deliveryState:"",
        retrievalCity:"",
        retrievalState:""
    })
    const [retrievalCitiesList, setRetrievalCitiesList] = useState([''])
    const [deliveryCitiesList, setDeliveryCitiesList] = useState([''])


    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const targetInput = event.currentTarget

        const { value, name } = targetInput

        setFormState({
            ...formState,
            [name]: value,
        })

    }, [formState])

    const handleSelectLocation = (name, value) => {
        setLocation({
          ...location,
          [name]: value,
        })
      }
    
    useEffect(()=>{
        if (location.deliveryState) {
            const filtered = citiesList.estados
              .filter(function (estado) {
                return estado.sigla === location.deliveryState;
              })
            setDeliveryCitiesList(filtered[0].cidades)
          }
      
          if (location.retrievalState) {
            const filtered = citiesList.estados
              .filter(function (estado) {
                return estado.sigla === location.retrievalState;
              })
            setRetrievalCitiesList(filtered[0].cidades)
          }
    },[location])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const productType = selectedProductType
        const ownerDisplayName = localStorage.getItem("displayName")
        const ownerUsername = localStorage.getItem("userName") || ""
        const createdAt = new Date()
        const newShipment = { ...formState,...location, productType, ownerDisplayName, ownerUsername, createdAt }

        console.log('====================================');
        console.log(newShipment);
        console.log('====================================');

        try {
            if (newShipment.ownerUsername) {
                await createShipment(newShipment)
                navigate('/motoristas', { replace: true })
            }
        } catch (error) {
            window.alert('Erro ao criar carga')
            console.log(error)
        }
    }, [formState]);

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                value={formState.title}
                handleChange={handleInputChange}
                fieldName='title'
                label='Título'
                required={true}
            />
            <div>
                <h5>Entrega</h5>
                <select onChange={event => handleSelectLocation("deliveryState", event.target.value)}>
                    {statesList.UF.map(state => {
                        return <option value={state.sigla}>{state.sigla}</option>
                    })}
                </select>
                <select onChange={event => handleSelectLocation("deliveryCity", event.target.value)}>
                    {
                        deliveryCitiesList
                            .map(city => {
                                return <option value={city}>{city}</option>
                            })
                    }
                </select>
            </div>

            <div>
                <h5>Retirada</h5>
                <select onChange={event => handleSelectLocation("retrievalState", event.target.value)}>
                    {statesList.UF.map(state => {
                        return <option value={state.sigla}>{state.sigla}</option>
                    })}
                </select>

                <select onChange={event => handleSelectLocation("retrievalCity", event.target.value,)}>
                    {
                        retrievalCitiesList
                            .map(city => {
                                return <option value={city}>{city}</option>
                            })
                    }
                </select>
            </div>
            <div>

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

            <h3 className='mt-3'>Tipo de veículo</h3>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <RadioButtonGroup
                    label="Leves"
                    options={[
                        { name: "requiredVehicle", label: vehicleType.tresQuartos, value: vehicleType.tresQuartos },
                        { name: "requiredVehicle", label: vehicleType.fiorino, value: vehicleType.fiorino },
                        { name: "requiredVehicle", label: vehicleType.toco, value: vehicleType.toco },
                        { name: "requiredVehicle", label: vehicleType.vlc, value: vehicleType.vlc }
                    ]}
                    onChange={handleInputChange}
                />
                <RadioButtonGroup
                    label="Médios"
                    options={[
                        { name: "requiredVehicle", label: vehicleType.bitruck, value: vehicleType.bitruck },
                        { name: "requiredVehicle", label: vehicleType.truck, value: vehicleType.truck }
                    ]}
                    onChange={handleInputChange}
                />
                <RadioButtonGroup
                    label="Pesados"
                    options={[
                        { name: "requiredVehicle", label: vehicleType.bitrem, value: vehicleType.bitrem },
                        { name: "requiredVehicle", label: vehicleType.carreta, value: vehicleType.carreta },
                        { name: "requiredVehicle", label: vehicleType.carretaLS, value: vehicleType.carretaLS },
                        { name: "requiredVehicle", label: vehicleType.rodotrem, value: vehicleType.rodotrem },
                        { name: "requiredVehicle", label: vehicleType.vanderleia, value: vehicleType.vanderleia }

                    ]}
                    onChange={handleInputChange}
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
                    selected={selectedProductType}
                    setSelected={setselectedProductType}
                    options={[
                        productType.animais,
                        productType.bigBag,
                        productType.caixas,
                        productType.diversos,
                        productType.paletes
                    ]}
                />
            </div>

            <div>
                <label htmlFor="complementArea">Tipo de Carga</label>

                <div className='ml-3'>
                    <input
                        type="radio"
                        value="Completa"
                        onChange={handleInputChange}
                        name="complement"
                    />
                    <label htmlFor="complement">Completa</label>

                </div>

                <input
                    type="radio"
                    value="Complemento"
                    onChange={handleInputChange}
                    name="complement"
                />
                <label htmlFor="complementInput">Complemento</label>
            </div>

            <div>
                <label htmlFor="trackingArea">Rastreador</label>
                <div>
                    <input
                        type="radio"
                        value="tracked"
                        onChange={handleInputChange}
                        name="tracking"
                    />
                    <label htmlFor="trackingInput">Sim</label>

                </div>

                <input
                    type="radio"
                    value="untracked"
                    onChange={handleInputChange}
                    name="tracking"
                />
                <label htmlFor="trackingInput">Não</label>
            </div>

            <NumericInput
                value={formState.weight}
                handleChange={handleInputChange}
                fieldName='weight'
                label='Peso em kg'
                required={false}
            />

            <TextInput
                value={formState.flooringType}
                handleChange={handleInputChange}
                fieldName='flooringType'
                label='Tipo do assoalho'
            />

            <TextInput
                value={formState.necessaryItems}
                handleChange={handleInputChange}
                fieldName='necessaryItems'
                label='Items necessários'
                required={false}
            />

            <button type="submit" className="btn btn-primary mt-3 mb-5">
                Enviar
            </button>
        </form>
    )
}

export default CreateShipmentForm
