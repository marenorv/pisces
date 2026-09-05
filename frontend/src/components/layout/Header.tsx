import type {FC} from 'react';
import {useIntl} from 'react-intl';

export const Header: FC = () => {
    const formatMessage = useIntl().formatMessage;

    return (
        <header className='pisces-header'>
            <h1>{formatMessage({id: 'app.name'})}</h1>
            <p>{formatMessage({id: 'app.header.subheader'})}</p>
        </header>
    )
}
