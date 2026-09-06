import type {FC} from "react";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {useIntl} from "react-intl";
import {EditError} from "@components/common/EditErrors.tsx";
import type {SelectOptions} from "@type/options.ts";
import {EditFieldSet} from "@components/facility-form/fields/EditFieldSet.tsx";

interface EditOrganizationsProps {
    organizations: SelectOptions[]
    registration: UseFormRegisterReturn;
    error?: FieldError;
    disabled: boolean;
}

export const EditOrganizations: FC<EditOrganizationsProps> = ({organizations, registration, error, disabled}) => {
    const formatMessage = useIntl().formatMessage;

    return (
        <>
            <h3 className={'pisces-facility-edit-header'}>
                <label htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.organizations'})}</label>
            </h3>
            <EditFieldSet disabled={disabled} error={error} options={organizations} registration={registration} />
            <EditError error={error}/>
        </>
    );
};
