import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ShowInfo.module.css';

const ShowInfo: React.FC<{ message: string }> = ({ message }) => {
  const portalElement = document.getElementById('overlays')!;

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-28 left-1/2 z-50 rounded-xl bg-blue-500 px-5 py-2 text-white shadow-lg ${classes.animateIn}`}
      style={{ transform: 'translateX(-50%)' }}
    >
      <div className="flex h-full w-full items-center justify-center text-lg font-semibold">
        {message}
      </div>
    </div>,
    portalElement
  );
};

export default ShowInfo;
