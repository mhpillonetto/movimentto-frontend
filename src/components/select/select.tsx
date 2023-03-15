import React, { useCallback } from 'react'
import Constants from '../../data/constants'

const userType = Constants.userType

type selectProps = {
    selected: string,
    options: string[],
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const MvtSelect = ({selected, options, setSelected}: selectProps) => {
    
    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentSelected = event.currentTarget.value
    
        setSelected(currentSelected)
      }, [selected])
    

    return (
        <div>
            <select className="form-selec mt-3 mb-3" aria-label="Default select example" onChange={handleChange}>
                <option defaultValue={userType.transportadora}>Selecione uma opção</option>
                {options.map(opt => {
                    return <option value={opt}>{opt}</option>
                })}
            </select>
        </div>
    )
}

export default MvtSelect
