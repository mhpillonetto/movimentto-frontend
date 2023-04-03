import { IOption, IOptionGroup } from "../../data/types/RadioButtonGroup"
import RadioButton from "./radioButton";

const RadioButtonGroup = ({ label, options, onChange }: IOptionGroup) => {
   function renderOptions() {
      return options.map(({ label, value, name, disabled, checked }: IOption, index) => {
         const shortenedOptionLabel = label.replace(/\s+/g, "");
         const optionId = `radio-option-${shortenedOptionLabel}`;

         return (
            <RadioButton
               value={value}
               label={label}
               key={optionId}
               id={optionId}
               name={name}
               disabled={disabled}
               defaultChecked={index === 0}
               onChange={onChange}
               checked={checked}
            />
         );
      });
   }

   return (
      <fieldset>
         <h5>{label}</h5>
         <div>
            {renderOptions()}
         </div>
      </fieldset>
   )
}

export default RadioButtonGroup
