import React from 'react'
import DatePicker from 'react-datepicker'

interface DateInputProps {
    label: string
    value: Date
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const DateInput = (props) => { 
    return (
        <div style={{flexDirection: "row"}}>
            <label htmlFor={`${props.label}input`} className="form-label">
                {props.label}
            </label>
            <DatePicker 
                // selected={props.value}
                // onChange={props.handleChange}
            />
        </div>
    )
}

export default DateInput


