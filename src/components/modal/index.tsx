import classnames from 'classnames';
import React from 'react';
import { IoClose } from "react-icons/io5"
import "./index.css"

interface PropTypes {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  className?: string;
}

const Modal: React.FC<PropTypes> = ({ children, isOpen, className, onClose, onOpen }) => {
  const ref = React.useRef<HTMLDialogElement>(null);

  const handleClose = React.useCallback(() => {
    ref.current?.close();
    if (onClose) onClose();
  }, [onClose]);

  const handleOpen = React.useCallback(() => {
    ref.current?.showModal();
    if (onOpen) onOpen();
  }, [onOpen])

  React.useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isOpen, handleOpen, handleClose]);

  return (
    <dialog ref={ref} onCancel={handleClose} className={classnames("", className)}>

      <button onClick={handleClose} className="modal__close-btn">
        <IoClose size="20" />
      </button>

      {children}
    </dialog>
  )
}
export default Modal;