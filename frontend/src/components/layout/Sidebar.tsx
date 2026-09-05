import type {FC} from 'react';
import {useIntl} from 'react-intl';

export const Sidebar: FC = () => {
    const formatMessage = useIntl().formatMessage;

    return (
        <div className='pisces-sidebar'>
            <p>{formatMessage({id: 'sidebar.header'})}</p>
        </div>
    )
}