import type {FC} from "react";
import {useIntl} from "react-intl";
import type {Facility} from "@type/facilities.ts";
import {useNavigate} from "react-router-dom";

interface ReadOnlyFacHeaderProps {
    facility: Facility;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReadOnlyFacHeader: FC<ReadOnlyFacHeaderProps> = (props) => {
    const {facility, setModalOpen} = props;
    const formatMessage = useIntl().formatMessage;
    const navigate = useNavigate();

    return (
        <div className='pisces-details-header'>
            <h2>
                {formatMessage({id: 'facilityDetails.readOnly.header'}, {name: <i>{facility?.name}</i>})}
            </h2>
            <div className='pisces-actions__buttons'>
                <button className='action-button--edit'
                        onClick={() => navigate(`/facilities/${facility.id}/edit`)}>
                    {formatMessage({id: 'facilityDetails.edit'})}
                </button>
                <button className='action-button--delete' onClick={() => setModalOpen(true)}>
                    {formatMessage({id: 'facilityDetails.delete'})}
                </button>
            </div>
        </div>)
}