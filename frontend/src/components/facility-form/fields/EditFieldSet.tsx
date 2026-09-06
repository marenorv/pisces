import type {FC} from "react";
import type {SelectOptions} from "@type/options.ts";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";

interface EditFieldSetProps {
    disabled: boolean;
    error: FieldError | undefined;
    options: SelectOptions[];
    registration: UseFormRegisterReturn;
}


export const EditFieldSet: FC<EditFieldSetProps> = (props) => {
    const {disabled, options, error, registration} = props;

    const getClassnameModifier = () => {
        if (error) return '--error'
        if (disabled) return '--disabled'
        return '';
    }

    return (
        <fieldset disabled={disabled} className={`pisces-edit-options-item${getClassnameModifier()}`}>
            <ul className='pisces-edit-options-list'>
                {options.map((fish) => (
                    <li key={fish.value}>
                        <label>
                            <input type='checkbox' value={fish.value} {...registration}/>
                            {fish.label}
                        </label>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}