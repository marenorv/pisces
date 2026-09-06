import type {FC} from "react";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {useIntl} from "react-intl";
import {EditError} from "@components/common/EditErrors.tsx";
import type {SelectOptions} from "@type/options.ts";

interface EditOrganizationsProps {
    organizations: SelectOptions[]
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export const EditOrganizations: FC<EditOrganizationsProps> = ({organizations, registration, error}) => {
    const formatMessage = useIntl().formatMessage;

    return (
        <>
            <h3 className={'pisces-facility-edit-header'}>
                <label htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.organizations'})}</label>
            </h3>
            <fieldset className={`pisces-edit-options-item${error ? '-error' : ''}`}>
                <ul className='pisces-edit-options-list'>
                    {organizations.map((org) => (
                        <li key={org.value}>
                            <label>
                                <input type='checkbox' value={org.value} {...registration}/>
                                {org.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </fieldset>
            <EditError error={error}/>
        </>
    );
};
