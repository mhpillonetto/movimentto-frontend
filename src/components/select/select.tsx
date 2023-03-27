import React, { useCallback } from 'react'
import Constants from '../../data/constants'

const userType = Constants.userType

type selectProps = {
    selected: string,
    options: string[],
    defaultValue: string | "",
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const MvtSelect = (props: selectProps) => {
    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentSelected = event.currentTarget.value
        props.setSelected(currentSelected)
      }, [props.selected])
    

    return (
        <div>
            <select className="form-selec mt-3 mb-3" aria-label="Default select example" onChange={handleChange}>
                <option defaultValue={props.defaultValue}>Selecione uma opção</option>
                {props.options.map(opt => {
                    return <option value={opt}>{opt}</option>
                })}
            </select>
        </div>
    )
}

export default MvtSelect
