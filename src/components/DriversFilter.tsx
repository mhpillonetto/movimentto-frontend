import React, { useCallback } from 'react'
import Constants from '../data/constants'
import Driver from '../model/User/Driver'
import TextInput from './input/TextInput'
import RadioButtonGroup from './ui/radioButtonGroup'

type DriversFilterProps = {
    filter: Driver
    setFilter: React.Dispatch<React.SetStateAction<Driver>>
}


const DriversFilter = (props: DriversFilterProps) => {
    const { filter, setFilter } = props

    const handleFilterChange = useCallback((name, value) => {
        setFilter({
          ...filter,
          [name]: value,
        })
      }, [filter])

    return (
        <div>
            <TextInput
                value={filter.city ? filter.city : ''}
                handleChange={event => handleFilterChange('city', event.target.value)}
                fieldName='city'
                label='Localização'
            />
            
            <div>
                <h5 className='mt-3'>Tipo de veículo</h5>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <RadioButtonGroup
                        label="Leves"
                        options={[
                            { name: "vehicleType", label: Constants.vehicleType.tresQuartos, value: Constants.vehicleType.tresQuartos, checked: filter.vehicleType === Constants.vehicleType.tresQuartos },
                            { name: "vehicleType", label: Constants.vehicleType.fiorino, value: Constants.vehicleType.fiorino, checked: filter.vehicleType === Constants.vehicleType.fiorino },
                            { name: "vehicleType", label: Constants.vehicleType.toco, value: Constants.vehicleType.toco, checked: filter.vehicleType === Constants.vehicleType.toco },
                            { name: "vehicleType", label: Constants.vehicleType.vlc, value: Constants.vehicleType.vlc, checked: filter.vehicleType === Constants.vehicleType.vlc }
                        ]}
                        onChange={event => handleFilterChange("vehicleType", event.target.value)}
                    />
                    <RadioButtonGroup
                        label="Médios"
                        options={[
                            { name: "vehicleType", label: Constants.vehicleType.bitruck, value: Constants.vehicleType.bitruck, checked: filter.vehicleType === Constants.vehicleType.bitruck },
                            { name: "vehicleType", label: Constants.vehicleType.truck, value: Constants.vehicleType.truck, checked: filter.vehicleType === Constants.vehicleType.truck }
                        ]}
                        onChange={event => handleFilterChange("vehicleType", event.target.value)}
                    />
                    <RadioButtonGroup
                        label="Pesados"
                        options={[
                            { name: "vehicleType", label: Constants.vehicleType.bitrem, value: Constants.vehicleType.bitrem, checked: filter.vehicleType === Constants.vehicleType.bitrem },
                            { name: "vehicleType", label: Constants.vehicleType.carreta, value: Constants.vehicleType.carreta, checked: filter.vehicleType === Constants.vehicleType.carreta },
                            { name: "vehicleType", label: Constants.vehicleType.carretaLS, value: Constants.vehicleType.carretaLS, checked: filter.vehicleType === Constants.vehicleType.carretaLS },
                            { name: "vehicleType", label: Constants.vehicleType.rodotrem, value: Constants.vehicleType.rodotrem, checked: filter.vehicleType === Constants.vehicleType.rodotrem },
                            { name: "vehicleType", label: Constants.vehicleType.vanderleia, value: Constants.vehicleType.vanderleia, checked: filter.vehicleType === Constants.vehicleType.vanderleia }
                        ]}
                        onChange={event => handleFilterChange("vehicleType", event.target.value)}
                    />
                </div>
            </div>

            <button type="reset" className="btn btn-primary mt-3 mb-5" onClick={() => setFilter({} as Driver)}>
                Limpar
            </button>
        </div>
    )
}

export default DriversFilter
