import type {FC} from "react";
import type {Organization} from '@type/facilities'
import {useIntl} from "react-intl";

interface OrganizationsListProps {
    organizations: Organization[];
}

export const OrganizationsList: FC<OrganizationsListProps> = (props) => {
    const formatMessage = useIntl().formatMessage;

    const getOrgList = () => {
        if (props.organizations.length === 0) {
            return <p>{formatMessage({id: 'facilityDetails.org.noOrgs'})}</p>
        }
        return <ul>
            {props.organizations.map((org, i) => (
                <li key={i}>{org.name}</li>
            ))}
        </ul>
    }

    return (
        <details className="pisces-organizations" open>
            <summary>{formatMessage({id: 'facilityDetails.org.header'})}</summary>
            {getOrgList()}
        </details>
    )
}