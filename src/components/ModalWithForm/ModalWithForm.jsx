import "./ModalWithForm.css";
import closeImg from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  cancelButtonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  onCancel,
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
            {cancelButtonText && (
              <button
                onClick={onCancel}
                className="modal__cancel"
                type="button"
              >
                {cancelButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
