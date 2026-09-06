import type {FC} from "react";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {useIntl} from "react-intl";
import {EditError} from "@components/common/EditErrors.tsx";
import type {SelectOptions} from "@type/options.ts";

interface EditFishesProps {
    fishes: SelectOptions[];
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export const EditFishes: FC<EditFishesProps> = ({fishes, registration, error}) => {
    const formatMessage = useIntl().formatMessage;

    return (
        <>
            <h3 className={'pisces-facility-edit-header'}>
                <label htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.fishes'})}</label>
            </h3>
            <fieldset className={`pisces-edit-options-item${error ? '-error' : ''}`}>
                <ul className='pisces-edit-options-list'>
                    {fishes.map((fish) => (
                        <li key={fish.value}>
                            <label>
                                <input type='checkbox' value={fish.value} {...registration}/>
                                {fish.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </fieldset>
            <EditError error={error}/>
        </>
    );
};