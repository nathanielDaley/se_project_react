import "./ModalWithForm.css";
import closeImg from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  alternativeButtonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  onAlternative,
}) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""} modal_type_form`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeImg} alt="close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {alternativeButtonText && (
              <button
                onClick={onAlternative}
                className="modal__alternative"
                type="button"
              >
                {alternativeButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
