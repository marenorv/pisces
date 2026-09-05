import type {FC} from "react";
import {useIntl} from "react-intl";

export const Loader: FC = () => {
    const formatMessage = useIntl().formatMessage;

    return <p>{formatMessage({id: 'component.loader.loading'})}</p>
}