import { useEffect } from 'react';
import s from './Modal.module.scss';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const onEsc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button className={s.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
