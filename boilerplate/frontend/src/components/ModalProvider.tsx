import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type ModalPriority = number; // higher means more important

export type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
};

export type ModalOptions = {
  id?: string;
  title?: string;
  content: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  showCloseIcon?: boolean;
  priority?: ModalPriority; // default 0
  onClose?: () => void;
};

export type OpenedModal = Required<Pick<ModalOptions, 'id'>> & Omit<ModalOptions, 'id'>;

type ModalContextValue = {
  modals: OpenedModal[];
  openModal: (options: ModalOptions) => string; // returns id
  closeModal: (id: string) => void;
  closeAll: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModalManager = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalManager must be used within ModalProvider');
  return ctx;
};

function generateId(prefix: string = 'modal'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<OpenedModal[]>([]);
  const byIdRef = useRef<Map<string, OpenedModal>>(new Map());

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
    const modal = byIdRef.current.get(id);
    if (modal && modal.onClose) modal.onClose();
    byIdRef.current.delete(id);
  }, []);

  const closeAll = useCallback(() => {
    setModals((prev) => {
      prev.forEach((m) => m.onClose && m.onClose());
      return [];
    });
    byIdRef.current.clear();
  }, []);

  const openModal = useCallback((options: ModalOptions): string => {
    const id = options.id ?? generateId();
    const priority = options.priority ?? 0;

    setModals((prev) => {
      // If the new modal's priority is strictly higher than all existing modals,
      // close all currently open modals per requirement.
      const maxExisting = prev.reduce((max, m) => Math.max(max, m.priority ?? 0), -Infinity);
      const shouldCloseAll = prev.length > 0 && priority > maxExisting;
      const next = shouldCloseAll ? [] : [...prev];

      const opened: OpenedModal = {
        id,
        title: options.title,
        content: options.content,
        primaryAction: options.primaryAction,
        secondaryAction: options.secondaryAction,
        showCloseIcon: options.showCloseIcon ?? true,
        priority,
        onClose: options.onClose,
      };

      // replace if same id exists, else append
      const existingIndex = next.findIndex((m) => m.id === id);
      if (existingIndex >= 0) {
        next[existingIndex] = opened;
      } else {
        next.push(opened);
      }
      byIdRef.current.set(id, opened);
      // sort by priority then insertion order preserved
      next.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
      return next;
    });

    return id;
  }, []);

  const value = useMemo<ModalContextValue>(() => ({ modals, openModal, closeModal, closeAll }), [modals, openModal, closeModal, closeAll]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};


