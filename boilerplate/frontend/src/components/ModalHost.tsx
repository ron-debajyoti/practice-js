import React from 'react';
import { useModalManager } from './ModalProvider';
import { Modal } from './Modal';

export const ModalHost: React.FC = () => {
  const { modals, closeModal } = useModalManager();

  return (
    <>
      {modals.map((m, idx) => (
        <Modal
          key={m.id}
          title={m.title}
          showCloseIcon={m.showCloseIcon}
          primaryAction={m.primaryAction}
          secondaryAction={m.secondaryAction}
          onRequestClose={() => closeModal(m.id)}
          zIndex={1000 + idx}
        >
          {m.content}
        </Modal>
      ))}
    </>
  );
};


