import type {FC} from 'react';
import type {Facility} from "@type/facilities.ts";
import {useIntl} from "react-intl";
import {Link} from "react-router-dom";

interface FacilityCardProps {
    facility: Facility;
}

const parseDate = (candidate: string): Date => {
    return new Date(candidate);
}

const LOCATION_ICONS: Record<string, string> = {
    sea: 'sailing',
    land: 'landscape',
};

const locationIcon = (enLabel: string): string => LOCATION_ICONS[enLabel.toLowerCase()] ?? 'place';

export const FacilityCard: FC<FacilityCardProps> = (props) => {
    const intl = useIntl();
    const date = parseDate(props.facility.registeredDate);
    const location = props.facility.location;

    return (
        <Link className='pisces-facility-card' to={`/facilities/${props.facility.id}`}>
            <div>
                <span
                    className='material-icons pisces-facility-card__location-icon'
                    role='img'
                    aria-label={location.nbLabel}
                    title={location.nbLabel}
                >
                    {locationIcon(location.enLabel)}
                </span>
                <span>{props.facility.name}</span>
            </div>
            <span>{intl.formatDate(date)}</span>
        </Link>
    );
}
