import React, { useCallback, useState } from 'react'
import Constants from '../data/constants'
import Shipment from '../model/Shipment/Shipment'
import TextInput from './input/TextInput'
import RadioButton from './ui/radioButton'
import RadioButtonGroup from './ui/radioButtonGroup'

interface Filter extends Shipment {
    pricing: boolean
}

type ShipmentsFilterProps = {
    filter: Filter
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}


const ShipmentsFilter = (props: ShipmentsFilterProps) => {
    const emptyFilter = {} as Filter

    const {filter, setFilter} = props
    
    const handleFilterChange = useCallback((name, value) => {
        setFilter({
          ...filter,
          [name]: value,
        })
      }, [filter])
    
    return (
        <div>
            <TextInput
                value={filter.deliveryCity ? filter.deliveryCity : ''}
                handleChange={event => handleFilterChange("deliveryCity", event.target.value)}
                fieldName='deliveryCity'
                label='Destino'
            />

            <TextInput
                value={filter.retrievalCity ? filter.retrievalCity : ''}
                handleChange={event => handleFilterChange("retrievalCity", event.target.value)}
                fieldName='retrievalCity'
                label='Origem'
            />
            <div>
                <h5 className='mt-3'>Tipo de veículo</h5>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <RadioButtonGroup
                        label="Leves"
                        options={[
                            { name: "requiredVehicle", label: Constants.vehicleType.tresQuartos, value: Constants.vehicleType.tresQuartos, checked: filter.requiredVehicle === Constants.vehicleType.tresQuartos },
                            { name: "requiredVehicle", label: Constants.vehicleType.fiorino, value: Constants.vehicleType.fiorino, checked: filter.requiredVehicle === Constants.vehicleType.fiorino },
                            { name: "requiredVehicle", label: Constants.vehicleType.toco, value: Constants.vehicleType.toco, checked: filter.requiredVehicle === Constants.vehicleType.toco },
                            { name: "requiredVehicle", label: Constants.vehicleType.vlc, value: Constants.vehicleType.vlc, checked: filter.requiredVehicle === Constants.vehicleType.vlc }
                        ]}
                        onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
                    />
                    <RadioButtonGroup
                        label="Médios"
                        options={[
                            { name: "requiredVehicle", label: Constants.vehicleType.bitruck, value: Constants.vehicleType.bitruck, checked: filter.requiredVehicle === Constants.vehicleType.bitruck },
                            { name: "requiredVehicle", label: Constants.vehicleType.truck, value: Constants.vehicleType.truck, checked: filter.requiredVehicle === Constants.vehicleType.truck }
                        ]}
                        onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
                    />
                    <RadioButtonGroup
                        label="Pesados"
                        options={[
                            { name: "requiredVehicle", label: Constants.vehicleType.bitrem, value: Constants.vehicleType.bitrem, checked: filter.requiredVehicle === Constants.vehicleType.bitrem },
                            { name: "requiredVehicle", label: Constants.vehicleType.carreta, value: Constants.vehicleType.carreta, checked: filter.requiredVehicle === Constants.vehicleType.carreta },
                            { name: "requiredVehicle", label: Constants.vehicleType.carretaLS, value: Constants.vehicleType.carretaLS, checked: filter.requiredVehicle === Constants.vehicleType.carretaLS },
                            { name: "requiredVehicle", label: Constants.vehicleType.rodotrem, value: Constants.vehicleType.rodotrem, checked: filter.requiredVehicle === Constants.vehicleType.rodotrem },
                            { name: "requiredVehicle", label: Constants.vehicleType.vanderleia, value: Constants.vehicleType.vanderleia, checked: filter.requiredVehicle === Constants.vehicleType.vanderleia }
                        ]}
                        onChange={event => handleFilterChange("requiredVehicle", event.target.value)}
                    />
                </div>

            </div>

            <div>
                <h5>Rastreador</h5>
                <div>
                    <RadioButton
                        value={filter.tracking}
                        label="Sim"
                        name="tracking"
                        id={"tracked"}
                        onChange={e => handleFilterChange("tracking", "tracked")}
                        checked={filter.tracking === "tracked"}
                    />
                </div>

                <div>
                    <RadioButton
                        value={filter.tracking}
                        label="Não"
                        name="tracking"
                        id={"untracked"}
                        onChange={e => handleFilterChange("tracking", "untracked")}
                        checked={filter.tracking === "untracked"}
                    />
                </div>
            </div>

            <div className='mt-3'>
                <h5>Tipo de carga</h5>
                <RadioButton
                    value={filter.complement}
                    label="Compĺeta"
                    name="complement"
                    id={"complement"}
                    onChange={e => handleFilterChange("complement", "Completa")}
                    checked={filter.complement === "Completa"}
                />

                <RadioButton
                    value={filter.complement}
                    label="Compĺemento"
                    name="complement"
                    id={"complement"}
                    onChange={e => handleFilterChange("complement", "Complemento")}
                    checked={filter.complement === "Complemento"}
                />
            </div>

            <div className='mt-3'>
                <h5>Preço definido?</h5>
                <RadioButton
                    value={filter.price}
                    label="Sim"
                    name="pricing"
                    id={"pricing"}
                    onChange={e => handleFilterChange("pricing", true)}
                    checked={filter.pricing === true}
                />

                <RadioButton
                    value={filter.price}
                    label="Não"
                    name="pricing"
                    id={"pricing"}
                    onChange={e => handleFilterChange("pricing", false)}
                    checked={filter.pricing === false}
                />
            </div>

            <button type="reset" className="btn btn-primary mt-3 mb-5" onClick={() => setFilter(emptyFilter)}>
                Limpar
            </button>
        </div>

    )
}

export default ShipmentsFilter
