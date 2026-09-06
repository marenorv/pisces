import type {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useIntl} from "react-intl";

export const NewFacilityActions: FC = () => {
    const formatMessage = useIntl().formatMessage;
    const navigate = useNavigate();

    return <div className='pisces-actions__buttons'>
        <button className='action-button--cancel' type='button'
                onClick={() => navigate('/facilities')}>
            {formatMessage({id: 'facilityEdit.cancel'})}
        </button>
        <button className='action-button--save' type='submit'>
            {formatMessage({id: 'facilityEdit.save'})}
        </button>
    </div>
}
