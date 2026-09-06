import {type FC, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import * as api from "@api";
import {FacilityForm} from "@components/facility-form/FacilityForm.tsx";
import {ReadOnlyFacHeader} from "@components/facility-form/modes/read-only/ReadOnlyFacHeader.tsx";
import {Loader} from "@components/common/Loader.tsx";
import {DeleteModal} from "@components/facility-details/DeleteModal.tsx";
import {useIntl} from "react-intl";

export const ReadOnlyFacilityDetails: FC = () => {
    const {id} = useParams<{ id: string }>();

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const formatMessage = useIntl().formatMessage;

    const {data: facility = null, isLoading, isError} = useQuery({
        queryKey: ["facility", id],
        queryFn: () => api.getFacilityById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <Loader/>
    }

    if (isError || !facility) {
        return <p>{formatMessage({id: 'facilityDetails.notFound'})}</p>
    }

    return (
        <div className='pisces-facility-container'>
            <FacilityForm
                mode='read-only'
                headerComponent={
                    <ReadOnlyFacHeader facility={facility} setModalOpen={setModalOpen}/>
                }
                data={facility}
                isError={isError}
                isLoading={isLoading}
            />
            {isModalOpen &&
                <DeleteModal facility={facility} onClose={() => setModalOpen(false)}/>
            }
        </div>
    )
}
