import type {FC} from 'react';
import {useIntl} from 'react-intl';
import * as api from '@api';
import {FacilityCard} from "@components/facility-list/FacilityCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {Loader} from "@components/common/Loader.tsx";

export const FacilityList: FC = () => {
    const formatMessage = useIntl().formatMessage;

    const {data: facilities = [], isLoading} = useQuery({
        queryKey: ["facilities"],
        queryFn: api.getAllFacilities,
    });

    return <div className='pisces-facility-container'>
        <h2>{formatMessage({id: 'facilityList.header'})}</h2>
        <div className='pisces-facility-list'>
            {
                isLoading
                    ? <Loader/>
                    : facilities.map(
                        (facility) => <FacilityCard facility={facility}/>
                    )
            }
        </div>
    </div>
}
