import type {FC} from "react";
import {Link, useLocation} from "react-router-dom";
import {useIntl} from "react-intl";
import {useQuery} from "@tanstack/react-query";
import * as api from "@api";

export const BreadCrumbs: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const {pathname} = useLocation();

    // ['facilities'] | ['facilities', id] | ['facilities', id, ...rest]
    const segments = pathname.split('/').filter(Boolean);
    const facilityId = segments[1];
    const showFacilityName = segments.length > 2;

    // Shares the ["facility", id] key with FacilityDetails / EditFacility,
    // so this reads from cache rather than firing its own request in practice.
    const {data: facility} = useQuery({
        queryKey: ["facility", facilityId],
        queryFn: () => api.getFacilityById(facilityId),
        enabled: showFacilityName,
    });

    if (segments.length <= 1) {
        return null;
    }

    return (
        <nav className='pisces-breadcrumbs' aria-label='Breadcrumb'>
            <Link className='pisces-back-link' to='/facilities'>
                {formatMessage({id: 'facilityDetails.back'})}
            </Link>

            {showFacilityName && facility && (
                <>
                    <span aria-hidden='true'> / </span>
                    <Link className='pisces-back-link' to={`/facilities/${facilityId}`}>
                        {facility.name}
                    </Link>
                </>
            )}
        </nav>
    );
};
