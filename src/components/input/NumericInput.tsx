import React from 'react'

interface NumericInputProps {
    value: number
    fieldName: string
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    label: string
    required: boolean | undefined
}

const NumericInput = (props: NumericInputProps) => {
    return (
        <div>
            <label htmlFor={`${props.label}input`} className="form-label">
                {props.label}
            </label>
            <input
                type='number'
                className="form-control"
                id={`${props.fieldName}`}
                name={`${props.fieldName}`}
                required={props.required}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default NumericInput
