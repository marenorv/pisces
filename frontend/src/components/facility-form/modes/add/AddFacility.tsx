import type {FC} from "react";
import {FacilityForm} from "@components/facility-form/FacilityForm.tsx";
import {useIntl} from "react-intl";

export const AddFacility: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const headerComponent = <h2>
        {formatMessage({id: 'facilityDetails.new.header'})}
    </h2>;

    return (
        <FacilityForm
            mode='new'
            headerComponent={headerComponent}
            data={null}
            isError={false}
            isLoading={false}
        />
    )
}