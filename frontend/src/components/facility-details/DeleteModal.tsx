import {type FC, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import * as api from "@api";
import {useIntl} from "react-intl";
import type {Facility} from "@type/facilities.ts";

interface DeleteModalProps {
    facility: Facility;
    onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

export const DeleteModal: FC<DeleteModalProps> = (props) => {
    const {facility, onClose} = props;
    const dialogRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const formatMessage = useIntl().formatMessage;

    const {mutate: deleteFacility, isPending, isError} = useMutation({
        mutationFn: () => api.deleteFacility(facility.id),
        onSuccess: async () => {
            queryClient.removeQueries({queryKey: ["facility", facility.id]});
            await queryClient.invalidateQueries({queryKey: ["facilities"]});
            navigate("/");
        },
    });

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const dialog = dialogRef.current;
        const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        (focusable && focusable.length > 0 ? focusable[0] : dialog)?.focus();

        return () => previouslyFocused?.focus();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }
            if (event.key !== 'Tab') return;

            const dialog = dialogRef.current;
            if (!dialog) return;

            const focusable = Array.from(
                dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
            ).filter((el) => el.offsetParent !== null);

            if (focusable.length === 0) {
                event.preventDefault();
                dialog.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (!dialog.contains(active)) {
                event.preventDefault();
                first.focus();
            } else if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return createPortal(
        <div className='pisces-modal-overlay' onClick={onClose}>
            <div
                ref={dialogRef}
                className='pisces-modal'
                role='dialog'
                aria-modal='true'
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
            >
                <div className='pisces-modal__header'>
                    <h3>{formatMessage({id: 'facilityDelete.header'})}</h3>
                    <button onClick={onClose} disabled={isPending}>X</button>
                </div>
                <p>{formatMessage({id: "facilityDelete.confirm"}, {name: facility.name})}</p>
                {isError && (
                    <p className='pisces-modal-error' role='alert'>
                        {formatMessage({id: 'facilityDelete.failed'})}
                    </p>
                )}
                <div className='pisces-actions__buttons'>
                    <button
                        className='action-button--cancel'
                        onClick={onClose}
                        disabled={isPending}
                    >
                        {formatMessage({id: 'facilityDelete.button.cancel'})}
                    </button>
                    <button
                        className='action-button--delete'
                        onClick={() => deleteFacility()}
                        disabled={isPending}
                    >
                        {formatMessage({id: 'facilityDelete.button.delete'})}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};
