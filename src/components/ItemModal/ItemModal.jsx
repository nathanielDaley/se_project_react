import "./ItemModal.css";
import closeImg from "../../assets/close.svg";

function ItemModal({ handleCloseClick, activeModal, card }) {
  return (
    <div className={`modal${activeModal === "preview" ? " modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_type_item"
        >
          <img src={closeImg} alt="close" className="modal__close-icon" />
        </button>
        <div className="modal__image-container">
          <img src={card.link} alt={card.name} className="modal__image" />
          <h2 className="modal__caption modal__caption_type_image">
            {card.name}
          </h2>
        </div>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
