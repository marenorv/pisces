import type {FC} from "react";
import type {Fish} from '@type/facilities'
import {useIntl} from "react-intl";

interface FishListProps {
    fishes: Fish[];
}

const LANGUAGE_LABEL: 'nbLabel' | 'enLabel' = 'nbLabel';

export const FishList: FC<FishListProps> = (props) => {
    const formatMessage = useIntl().formatMessage;

    const getOrgList = () => {
        if (props.fishes.length === 0) {
            return <p>{formatMessage({id: 'facilityDetails.fishList.noFish'})}</p>
        }
        return <ul>
            {props.fishes.map((org, i) => (
                <li key={i}>{org[LANGUAGE_LABEL]}</li>
            ))}
        </ul>
    }

    return (
        <details className="pisces-fish-list" open>
            <summary>{formatMessage({id: 'facilityDetails.fishList.header'})}</summary>
            {getOrgList()}
        </details>
    )
}