import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from 'components/Modal/Modal.module.css';

// const modalRoot = document.querySelector('#modalRoot');

export function Modal({ showModal, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={showModal.largeImageURL} alt={[showModal.tags]} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
