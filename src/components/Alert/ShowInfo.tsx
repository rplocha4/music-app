import React from 'react';
import ReactDOM from 'react-dom';

const ShowInfo: React.FC<{ message: string }> = ({ message }) => {
  const portalElement = document.getElementById('overlays')!;


  

  return ReactDOM.createPortal(
    <div
      className="fixed bottom-28 left-1/2 bg-blue-500 px-5 py-2 rounded-xl text-white z-50 shadow-lg "
      style={{
        transform: 'translate(-50%)',
      }}
    >
      <div className="flex justify-center items-center font-semibold text-lg w-full h-full">
        {message}
      </div>
    </div>,
    portalElement
  );
};

export default ShowInfo;
