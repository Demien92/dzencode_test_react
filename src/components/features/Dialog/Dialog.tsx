import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Dialog.scss';
import closeIcon from '../../assets/images/close-icon.png';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Dialog: React.FC<Props> = ({ onClose, children }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="dialog__overlay"
    >
      <div className="dialog__content">
        <button
          className="dialog__close-btn"
          type="button"
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt="close icon"
          />
        </button>
        {children}
      </div>
    </div>,
    document.querySelector('#root-modal') as Element,
  );
};
