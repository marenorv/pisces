import type {FC} from 'react';
import {useIntl} from 'react-intl';
import type {Facility} from "@type/facilities.ts";
import {FacilityCard} from "@components/facility-list/FacilityCard.tsx";

interface FacilityListProps {
    facilities: Facility[]
}

export const FacilityList: FC<FacilityListProps> = (props) => {
    const formatMessage = useIntl().formatMessage;

    return <div className='pisces-facility-container'>
        <h2>{formatMessage({id: 'facilityList.header'})}</h2>
        <div className='pisces-facility-list'>
            {
                props.facilities.map(
                    (facility) => <FacilityCard facility={facility}/>
                )
            }
        </div>
    </div>
}
