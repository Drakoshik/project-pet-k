import './modal.css';
import React from 'react';

interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    children: React.ReactNode;
}

const Modal = (modalProps: ModalProps) => {
    return (
        <div
            className={modalProps.active ? 'modal active' : 'modal'}
            onClick={() => modalProps.setActive(false)}
        >
            <div
                className={
                    modalProps.active ? 'modal-content active' : 'modal-content'
                }
                onClick={(e) => e.stopPropagation()}
            >
                {modalProps.children}
            </div>
        </div>
    );
};
export default Modal;
