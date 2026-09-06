import type {FC} from "react";
import type {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {useIntl} from "react-intl";
import {EditError} from "@components/common/EditErrors.tsx";

interface EditOrganizationsProps {
    organizations: { id: string, name: string }[];
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export const EditOrganizations: FC<EditOrganizationsProps> = ({organizations, registration, error}) => {
    const formatMessage = useIntl().formatMessage;

    return (
        <>
            <fieldset className={`pisces-edit-options-item${error ? '-error' : ''}`}>
                <h3 className={'pisces-facility-edit-header'}>
                    <label htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.organizations'})}</label>
                </h3>
                <ul className='pisces-edit-options-list'>
                    {organizations.map((org) => (
                        <li key={org.id}>
                            <label>
                                <input type='checkbox' value={org.id} {...registration}/>
                                {org.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </fieldset>
            <EditError error={error}/>
        </>
    );
};
