import type {FC} from "react";
import {useIntl} from "react-intl";
import {useQuery} from "@tanstack/react-query";
import {Link, useParams} from "react-router-dom";
import * as api from "@api";
import {Loader} from "@components/common/Loader.tsx";
import {OrganizationsList} from "@components/facility-details/OrganizationsList.tsx";

export const FacilityDetails: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const {id} = useParams<{ id: string }>();

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <Loader/>
    }

    if (isError || !facility) {
        return <p>{formatMessage({id: 'facilityDetails.notFound'})}</p>
    }

    return <div>
        <Link className='pisces-back-link' to='/'>{formatMessage({id: 'facilityDetails.back'})}</Link>
        <h2>{facility.name}</h2>
        <OrganizationsList organizations={facility.organizations}/>
    </div>
}