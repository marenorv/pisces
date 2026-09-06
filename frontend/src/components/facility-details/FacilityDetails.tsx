import {type FC, useState} from "react";
import {useIntl} from "react-intl";
import {useQuery} from "@tanstack/react-query";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as api from "@api";
import {Loader} from "@components/common/Loader.tsx";
import {OrganizationsList} from "@components/facility-details/OrganizationsList.tsx";
import {FishList} from "@components/facility-details/FishList.tsx";
import {LANGUAGE_LABEL} from "@constants/language.ts";
import {DeleteModal} from "@components/facility-details/DeleteModal.tsx";

export const FacilityDetails: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const formatDate = useIntl().formatDate;
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

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

    return <div className='pisces-facility-details'>
        <Link className='pisces-back-link' to='/'>{formatMessage({id: 'facilityDetails.back'})}</Link>
        <div className='pisces-details-header'>
            <h2>{facility.name}</h2>
            <div className='pisces-actions__buttons'>
                <button className='action-button--edit' onClick={() => navigate(`/facilities/${facility.id}/edit`)}>
                    {formatMessage({id: 'facilityDetails.edit'})}
                </button>
                <button className='action-button--delete' onClick={() => setModalOpen(true)}>
                    {formatMessage({id: 'facilityDetails.delete'})}
                </button>
            </div>
        </div>
        {isModalOpen && <DeleteModal facility={facility} onClose={() => setModalOpen(false)}/>}

        <p>{formatMessage({id: 'facilityDetails.location'})}: {facility.location[LANGUAGE_LABEL]}</p>
        <p>{formatMessage({id: 'facilityDetails.registeredDate'})}: {formatDate(facility.registeredDate)}</p>
        <FishList fishes={facility.fishes}/>
        <OrganizationsList organizations={facility.organizations}/>
    </div>
}