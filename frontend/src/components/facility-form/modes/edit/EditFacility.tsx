import type {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import * as api from "@api";
import {FacilityForm} from "@components/facility-form/FacilityForm.tsx";

export const EditFacility: FC = () => {
    const {id} = useParams<{ id: string }>();

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    return <FacilityForm mode='existing' data={facility} isError={isError} isLoading={isLoading} />
}
