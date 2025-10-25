import React from 'react';
import { useModalManager } from './ModalProvider';

const ModalDemoPage: React.FC = () => {
  const { openModal, closeAll } = useModalManager();

  return (
    <div className="hello-page">
      <div className="container">
        <h1>Modal Demo</h1>
        <div style={{ marginTop: '16px', display: 'flex', gap: 8 }}>
          <button
            className="hi-button"
            onClick={() => {
              openModal({
                title: 'Low Priority',
                content: <p>This is a low priority modal (p=0).</p>,
                secondaryAction: { label: 'Cancel', onClick: () => closeAll() },
                primaryAction: { label: 'OK', onClick: () => closeAll() },
                priority: 0,
              });
            }}
          >
            Open Low Priority
          </button>
          <button
            className="hi-button"
            onClick={() => {
              openModal({
                title: 'Medium Priority',
                content: <p>Opening this will close lower priorities.</p>,
                secondaryAction: { label: 'Cancel', onClick: () => closeAll() },
                primaryAction: { label: 'Confirm', onClick: () => closeAll() },
                priority: 5,
              });
            }}
          >
            Open Medium Priority
          </button>
          <button
            className="hi-button"
            onClick={() => {
              openModal({
                title: 'High Priority',
                content: (
                  <div>
                    <p>High priority modal (p=10) closes all lower ones.</p>
                  </div>
                ),
                showCloseIcon: true,
                secondaryAction: { label: 'Dismiss', onClick: () => closeAll() },
                primaryAction: { label: 'Save', onClick: () => closeAll() },
                priority: 10,
              });
            }}
          >
            Open High Priority
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDemoPage;


