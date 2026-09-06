import type {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import * as api from "@api";
import {FacilityForm} from "@components/facility-form/FacilityForm.tsx";
import {useIntl} from "react-intl";

export const EditFacility: FC = () => {
    const {id} = useParams<{ id: string }>();
    const formatMessage = useIntl().formatMessage;

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    const headerComponent = <h2>
        {formatMessage({id: 'facilityDetails.edit.header'}, {name: <i>{facility?.name}</i>})}
    </h2>;

    return (
        <FacilityForm
            mode='existing'
            headerComponent={headerComponent}
            data={facility}
            isError={isError}
            isLoading={isLoading}
        />
    )
}
