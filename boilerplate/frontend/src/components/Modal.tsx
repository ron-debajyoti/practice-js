import React from 'react';
import './Modal.css';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  showCloseIcon?: boolean;
  onRequestClose?: () => void;
  zIndex?: number;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  primaryAction,
  secondaryAction,
  showCloseIcon = true,
  onRequestClose,
  zIndex = 1000,
}) => {
  return (
    <div className="modal-overlay" style={{ zIndex }} onClick={onRequestClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {(title || showCloseIcon) && (
          <div className="modal-header">
            {title && <h3 className="modal-title">{title}</h3>}
            {showCloseIcon && (
              <button className="modal-close" aria-label="Close" onClick={onRequestClose}>
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
        {(primaryAction || secondaryAction) && (
          <div className="modal-footer">
            {secondaryAction && (
              <button className="btn secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button className="btn primary" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


