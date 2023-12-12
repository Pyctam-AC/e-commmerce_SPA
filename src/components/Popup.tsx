import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, nextImage, prevImage } from "../store/popup.slice";
import { RootState } from "../store";

const Popup:FC = () => {

  const dispatch = useDispatch();
  const  { isOpen, images, currentImageIndex } = useSelector((state: RootState) => state.popup)

  const onClose = () => {
    dispatch(closePopup());
  }

  const handleNextImage = () => {
    dispatch(nextImage());
  };

  const handlePrevImage = () => {
    dispatch(prevImage());
  };

  if (!isOpen || !images.length) {
    return null;
  }

  return (
    <div
    className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-all duration-500 ${
      isOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}

    >
      <div className="w-430 mx-auto bg-white shadow-md rounded-10 flex flex-col items-center">
        <button
          type="button"
          className="w-32 h-8 bg-slate-400 border-none font-bold text-24 text-black"
          onClick={onClose}
        >
          Закрыть &times;
        </button>
        <img
          className='w-80 bg-contain'
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`} />
        <div className="flex justify-between w-full items-start p-3">
          <button
            className="w-32 h-8 bg-slate-400 font-bold text-24 text-black"
            onClick={handlePrevImage}>&lt; Предыдущая
          </button>
          <button
            className="w-32 h-8 bg-slate-400 font-bold text-24 text-black"
            onClick={handleNextImage}>Следующая &gt;
          </button>
        </div>

      </div>
    </div>
  );
};

export default Popup;
