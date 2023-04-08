import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
const Backdrop: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75"
    ></div>
  );
};
const ModalOverlay: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className={`${classes.animate} fixed left-1/4 top-32 w-3/6 bg-zinc-700 p-1 rounded-xl z-30 shadow-lg `}
    >
      <div>{children}</div>
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
