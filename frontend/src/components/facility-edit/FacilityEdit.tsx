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
import type {Fish} from "@type/facilities.ts";
import type {FacilityFormValues} from "@type/form.ts";

export const FacilityEdit: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [submitFailed, setSubmitFailed] = useState(false);

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    // There is a bug with Norwegian locales in Chrome, so we use Swedish which uses the same YYYY-MM-DD format
    const today = new Date().toLocaleDateString('sv-SV');

    // TODO Replace with API endpoint
    const allFishes: Fish[] = [
        {id: '70fe52f0-b646-4b7f-9d38-564f29153797', nbLabel: 'Gullfisk', 'enLabel': 'Goldfish'},
        {id: '027133d9-94ab-4d70-8b59-cb0290d450a4', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: 'b28b8016-c1c3-40b6-baa7-6d46c82af390', nbLabel: 'Laks', 'enLabel': 'Salmon'},
        {id: '7c39419c-056b-4515-b15f-3cdd99b6c25f', nbLabel: 'Ørret', 'enLabel': 'Trout'},
    ]

    const allOrgs = [
        {id: '202f1bbb-15d1-46aa-bc83-1d14bfcc3639', name: 'Oppdrettsorganisasjon #1'},
        {id: '1ed9c333-dd05-44a8-ae57-1dc5eb585614', name: 'Oppdrettsorganisasjon #2'},
        {id: '62af5c96-3eb2-4aa3-81e1-ee9d014ad40f', name: 'Oppdrettsorganisasjon #3'},
    ];

    const {register, handleSubmit, trigger, formState: {isDirty, errors}} = useForm<FacilityFormValues>({
        // Prefill once the facility has loaded; `values` re-syncs the form when it arrives.
        values: facility ? {
            id: facility.id,
            name: facility.name,
            location: facility.location.id,
            registeredDate: facility.registeredDate.slice(0, 10),
            fishes: facility.fishes.map(fish => fish.id),
            // EditOrganizations checkboxes use the org name as their value
            organizations: facility.organizations.map(org => org.name),
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

    const selectOpts = [
        {label: 'Land', value: '4e6f9c21-3b7a-4d18-9f2e-5c8a1b0d7e34'},
        {label: 'Sjø', value: 'a1b2c3d4-e5f6-4789-8abc-def012345678'},
    ]
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
                    {selectOpts.map((opt) => <option value={opt.value}>{opt.label}</option>)}
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
                fishes={allFishes}
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
                organizations={allOrgs}
                registration={register('organizations', {
                    validate: (value) =>
                        (Array.isArray(value) && value.length > 0) || 'Velg minst én organisasjon',
                    // mode "onBlur" never validates a checkbox group on its own — revalidate on each toggle.
                    onChange: () => trigger('organizations'),
                })}
                error={errors.organizations as FieldError | undefined}
            />
        </div>

        <div className='pisces-facility-edit-actions'>
            <button type='button' onClick={() => navigate(`/facilities/${facility.id}`)}>
                {formatMessage({id: 'facilityEdit.cancel'})}
            </button>
            <button type='submit' disabled={!isDirty}>
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
