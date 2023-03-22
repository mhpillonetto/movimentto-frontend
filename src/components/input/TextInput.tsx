import React from 'react'

interface TextInputProps {
    value: string
    fieldName: string
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    label: string
    required?: boolean
    disabled?: boolean 
}

const TextInput = (props: TextInputProps) => {
    return (
        <div>
            <label htmlFor={`${props.label}input`} className="form-label">
                {props.label}
            </label>
            <input
                type='text'
                className="form-control"
                id={`${props.fieldName}`}
                name={`${props.fieldName}`}
                required={props.required}
                disabled={props.disabled}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default TextInput
