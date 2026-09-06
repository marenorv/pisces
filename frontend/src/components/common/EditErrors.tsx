import type {FC} from "react";
import type {FieldError} from "react-hook-form";

export const EditError: FC<{ error?: FieldError }> = ({error}) => {
    return (
        <p className='pisces-facility-edit-error' role='alert'>
            {error ? (error.message || 'Feil i feltet') : ''}
        </p>
    )
}
