import type {FC} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useIntl} from "react-intl";

interface ExistingFacilityActionsProps {
    isDirty: boolean;
}

export const ExistingFacilityActions: FC<ExistingFacilityActionsProps> = ({isDirty}) => {
    const formatMessage = useIntl().formatMessage;
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    return <div className='pisces-actions__buttons'>
        <button className='action-button--cancel' type='button'
                onClick={() => navigate(`/facilities/${id}`)}>
            {formatMessage({id: 'facilityEdit.cancel'})}
        </button>
        <button className='action-button--save' type='submit' disabled={!isDirty}>
            {formatMessage({id: 'facilityEdit.save'})}
        </button>
    </div>
}
