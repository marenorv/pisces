import type {FC} from "react";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import type {Fish} from "@type/facilities";
import {useIntl} from "react-intl";
import {LANGUAGE_LABEL} from "@constants/language.ts";
import {EditError} from "@components/common/EditErrors.tsx";

interface EditFishesProps {
    fishes: Fish[];
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export const EditFishes: FC<EditFishesProps> = ({fishes, registration, error}) => {
    const formatMessage = useIntl().formatMessage;

    return (
        <>
            <fieldset className='pisces-edit-options'>
                <h3 className={'pisces-facility-edit-header'}>
                    <label htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.fishes'})}</label>
                </h3>
                <ul className='pisces-edit-options-list'>
                    {fishes.map((fish) => (
                        <li key={fish.id}>
                            <label>
                                <input type='checkbox' value={fish.id} {...registration}/>
                                {fish[LANGUAGE_LABEL]}
                            </label>
                        </li>
                    ))}
                </ul>
            </fieldset>
            <EditError error={error}/>
        </>
    );
};