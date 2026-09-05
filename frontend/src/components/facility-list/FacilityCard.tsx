import type {FC} from 'react';
import type {Facility} from "@type/facilities.ts";

interface FacilityCardProps {
    facility: Facility;
}

export const FacilityCard: FC<FacilityCardProps> = (props) => {
    return <div className='pisces-facility-card'>
        <p>{props.facility.name}</p>
    </div>
}