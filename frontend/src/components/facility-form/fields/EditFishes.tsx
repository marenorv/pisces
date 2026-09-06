import type {FC} from "react";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {useIntl} from "react-intl";
import {EditError} from "@components/common/EditErrors.tsx";
import type {SelectOptions} from "@type/options.ts";
import {EditFieldSet} from "@components/facility-form/fields/EditFieldSet.tsx";

interface EditFishesProps {
    fishes: SelectOptions[];
    registration: UseFormRegisterReturn;
    error?: FieldError;
    disabled: boolean
}

export const EditFishes: FC<EditFishesProps> = ({fishes, registration, error, disabled}) => {
    const formatMessage = useIntl().formatMessage;

    return (
        <>
            <h3 className={'pisces-facility-edit-header'}>
                <label htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.fishes'})}</label>
            </h3>
            <EditFieldSet disabled={disabled} error={error} options={fishes} registration={registration}/>
            <EditError error={error}/>
        </>
    );
};