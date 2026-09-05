import type {FC} from 'react';
import type {Facility} from "@type/facilities.ts";
import {useIntl} from "react-intl";

interface FacilityCardProps {
    facility: Facility;
}

const parseDate = (candidate: string): Date => {
    return new Date(candidate);
}

export const FacilityCard: FC<FacilityCardProps> = (props) => {
    const intl = useIntl();
    const date = parseDate(props.facility.registeredDate);

    return <div className='pisces-facility-card'>
        <span>{props.facility.name}</span>
        <span>{intl.formatDate(date)}</span>
    </div>
}