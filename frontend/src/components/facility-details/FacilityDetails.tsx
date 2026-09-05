import type {FC} from "react";
import {useIntl} from "react-intl";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import * as api from "@api";
import {Loader} from "@components/common/Loader.tsx";

export const FacilityDetails: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {data: facility = null} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    if (!facility) {
        return <Loader />
    }

    return <div>
        <button onClick={() => navigate('/')}>{formatMessage({id: 'facilityDetails.back'})}</button>
        <div>{facility.name}</div>
    </div>
}