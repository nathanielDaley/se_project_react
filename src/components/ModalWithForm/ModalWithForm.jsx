import "./ModalWithForm.css";
import closeImg from "../../assets/close.svg";

function ModalWithForm({ children, buttonText, title }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close">
          <img src={closeImg} alt="close" className="modal__close-icon" />
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
