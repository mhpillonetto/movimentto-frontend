import React from 'react'

interface TextInputProps {
    value: string
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    label: string
    required: boolean | null
}

const TextInput = (props: TextInputProps) => {
    return (
        <div>
            <label htmlFor={`${props.label}input`} className="form-label">
                {props.label}
            </label>
            <input
                type={`${props.label}`}
                className="form-control"
                id={`${props.label}`}
                name={`${props.label}`}
                required
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default TextInput
