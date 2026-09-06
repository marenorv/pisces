import type {FC} from 'react';
import {useIntl} from 'react-intl';
import * as api from '@api';
import {FacilityCard} from "@components/facility-list/FacilityCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {Loader} from "@components/common/Loader.tsx";
import {useNavigate} from "react-router-dom";

export const FacilityList: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const navigate = useNavigate();

    const {data: facilities = [], isLoading} = useQuery({
        queryKey: ["facilities"],
        queryFn: api.getAllFacilities,
    });

    return <div className='pisces-facility-list-container'>
        <div className='pisces-facility-list-header'>
            <h2>{formatMessage({id: 'facilityList.header'})}</h2>
            <button onClick={() => navigate(`/facilities/new`)}>
                {formatMessage({id: 'facilityList.add'})}
            </button>
        </div>
        <div className='pisces-facility-list'>
            {
                isLoading
                    ? <Loader/>
                    : facilities.map(
                        (facility) => <FacilityCard key={facility.id} facility={facility}/>
                    )
            }
        </div>
    </div>
}
