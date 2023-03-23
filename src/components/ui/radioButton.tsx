import styled from 'styled-components'
import { InputElementProps } from '../../data/types/InputInterface';

const Wrapper = styled.div`
   display: flex;
   gap: 0.5rem;
   align-items: center;
`;

const RadioButton = ({
    label,
    disabled=false,
    key='',
    id='radio-button',
    onChange,
    name,
    value
}: InputElementProps) => {
    return (
        <Wrapper key={key}>
            <div>
                <input
                    type="radio" 
                    id={id}
                    disabled={disabled}
                    onChange={onChange}
                    name={name}
                    value={value}
                />
                <label htmlFor={id}>{label}</label>
            </div>
        </Wrapper>
    );
};

export default RadioButton
