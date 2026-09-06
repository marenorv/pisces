import type {FC} from "react";
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

interface FacilityFormValues {
    name: string;
    location: string;
    registeredDate: string;
    fishes: string[];
    organizations: string[];
}

export const FacilityEdit: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    // There is a bug with Norwegian locales in Chrome, so we use Swedish which uses the same YYYY-MM-DD format
    const today = new Date().toLocaleDateString('sv-SV');

    // TODO Replace with API endpoint
    const allFishes: Fish[] = [
        {id: '1', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '2', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '3', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '4', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
        {id: '5', nbLabel: 'Torsk', 'enLabel': 'Cod'},
    ]

    const allOrgs= [
        'Org 1',
        'Org 2',
        'Org 3',
        'Org 4',
        'Org 5',
        'Org 6',
        'Org 7',
        'Org 8',
        'Org 9',
        'Org 10',
        'Org 10',
        'Org 10',
        'Org 10',
        'Org 10',
        'Org 10',
        'Org 10',
    ];

    const {register, handleSubmit, trigger, formState: {isDirty, errors}} = useForm<FacilityFormValues>({
        // Prefill once the facility has loaded; `values` re-syncs the form when it arrives.
        values: facility ? {
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

    const onSubmit = (values: FacilityFormValues) => {
        // TODO: no update endpoint on the backend yet — wire to api.updateFacility once it exists.
        console.log('submit facility', facility.id, values);
        navigate(`/facilities/${facility.id}`);
    };

    const selectOpts = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
    ]
    return <form className='pisces-facility-edit' onSubmit={handleSubmit(onSubmit)}>
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
}
