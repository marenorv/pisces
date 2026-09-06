import type {FC} from "react";
import {useState} from "react";
import type {FieldError} from "react-hook-form";
import {useForm} from "react-hook-form";
import {useIntl} from "react-intl";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import * as api from "@api";
import {Loader} from "@components/common/Loader.tsx";
import {EditError} from "@components/common/EditErrors.tsx";
import {EditFishes} from "@components/facility-edit/EditFishes.tsx";
import {EditOrganizations} from "@components/facility-edit/EditOrganizations.tsx";
import type {FacilityFormValues} from "@type/form.ts";
import {useOptions} from "@hooks/useOptions.ts";

export const FacilityEdit: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [submitFailed, setSubmitFailed] = useState(false);

    const { locationsOpts,
        fishesOpts,
        organizationsOpts } = useOptions();

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    // There is a bug with Norwegian locales in Chrome, so we use Swedish which uses the same YYYY-MM-DD format
    const today = new Date().toLocaleDateString('sv-SV');

    const {register, handleSubmit, trigger, formState: {isDirty, errors}} = useForm<FacilityFormValues>({
        // Prefill once the facility has loaded; `values` re-syncs the form when it arrives.
        values: facility ? {
            id: facility.id,
            name: facility.name,
            location: facility.location.id,
            registeredDate: facility.registeredDate.slice(0, 10),
            fishes: facility.fishes.map(fish => fish.id),
            // EditOrganizations checkboxes use the org name as their value
            organizations: facility.organizations.map(org => org.id),
        } : undefined,
        mode: "onBlur"
    });

    if (isLoading) {
        return <Loader/>
    }

    if (isError || !facility) {
        return <p>{formatMessage({id: 'facilityDetails.notFound'})}</p>
    }

    const onSubmit = async (values: FacilityFormValues) => {
        if (!id) throw new Error('Can\'t submit without an ID');
        try {
            setSubmitFailed(false);
            await api.updateFacility(id, values);
            navigate(`/facilities/${facility.id}`);
        } catch {
            setSubmitFailed(true);
        }
    };

    return <>
    <form className='pisces-facility-edit' onSubmit={handleSubmit(onSubmit)}>
        <div className={'pisces-facility-edit-fields'}>
            {/* Name */}
            <div className='pisces-facility-edit-field'>
                <h3 className={'pisces-facility-edit-header'}>
                    <label htmlFor='facility-name'>{formatMessage({id: 'facilityDetails.name'})}</label>
                </h3>
                <input id='facility-name' type='text' {...register('name', {required: 'Navn må være satt'})}/>
                <EditError error={errors.name}/>
            </div>

            {/* Location */}
            <div className='pisces-facility-edit-field'>
                <h3 className={'pisces-facility-edit-header'}>
                    <label htmlFor='facility-name'>{formatMessage({id: 'facilityDetails.location'})}</label>
                </h3>
                <select id='facility-name' {...register('location', {required: 'Plassering må være satt'})}>
                    {locationsOpts.map((opt) => <option value={opt.value}>{opt.label}</option>)}
                </select>
                <EditError error={errors.location}/>
            </div>

            {/* Registered date */}
            <div className='pisces-facility-edit-field'>
                <h3 className={'pisces-facility-edit-header'}>
                    <label
                        htmlFor='facility-registered-date'>{formatMessage({id: 'facilityDetails.registeredDate'})}</label>
                </h3>
                <input
                    id='facility-registered-date'
                    type='date'
                    max={today}
                    {...register('registeredDate', {
                        required: 'Dato må være satt',
                        validate: (date) => !date || date <= today || 'Dato må være i dag eller tidligere'
                    })}
                />
                <EditError error={errors.registeredDate}/>
            </div>

            {/* Fishes */}
            <EditFishes
                fishes={fishesOpts}
                registration={register('fishes', {
                    validate: (value) =>
                        (Array.isArray(value) && value.length > 0) || 'Velg minst én fiskeart',
                    // mode "onBlur" never validates a checkbox group on its own — revalidate on each toggle.
                    onChange: () => trigger('fishes'),
                })}
                error={errors.fishes as FieldError | undefined}
            />

            {/* Organizations */}
            <EditOrganizations
                organizations={organizationsOpts}
                registration={register('organizations', {
                    validate: (value) =>
                        (Array.isArray(value) && value.length > 0) || 'Velg minst én organisasjon',
                    // mode "onBlur" never validates a checkbox group on its own — revalidate on each toggle.
                    onChange: () => trigger('organizations'),
                })}
                error={errors.organizations as FieldError | undefined}
            />
        </div>

        <div className='pisces-actions__buttons'>
            <button className='action-button--cancel' type='button' onClick={() => navigate(`/facilities/${facility.id}`)}>
                {formatMessage({id: 'facilityEdit.cancel'})}
            </button>
            <button className='action-button--save' type='submit' disabled={!isDirty}>
                {formatMessage({id: 'facilityEdit.save'})}
            </button>
        </div>
    </form>
    {submitFailed && (
        <p className='pisces-facility-edit-submit-error' role='alert'>
            {formatMessage({id: 'facilityEdit.saveFailed'})}
        </p>
    )}
    </>
}
