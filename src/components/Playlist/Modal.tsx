import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
const Backdrop: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 z-20 h-screen w-full bg-black opacity-75"
    ></div>
  );
};
const ModalOverlay: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className={`${classes.animate} fixed left-1/4 top-24 z-30 h-auto w-3/6 rounded-xl bg-zinc-900 p-2 shadow-lg `}
    >
      {children}
    </div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  const portalElement = document.getElementById('overlays')!;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
