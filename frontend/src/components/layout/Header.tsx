import type {FC} from 'react';
import {useIntl} from 'react-intl';
import {BreadCrumbs} from "@components/common/Breadcrumbs.tsx";

export const Header: FC = () => {
    const formatMessage = useIntl().formatMessage;

    return (
        <header className='pisces-header'>
            <h1>{formatMessage({id: 'app.name'})}</h1>
            <BreadCrumbs />
        </header>
    )
}
