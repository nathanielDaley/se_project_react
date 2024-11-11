import "./DeleteItemModal.css";
import closeImg from "../../assets/close.svg";

function DeleteItemModal({ onCloseClick, activeModal, onDeleteGarmentSubmit }) {
  return (
    <div className={`modal${activeModal === "delete" ? " modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={onCloseClick}
          type="button"
          className="modal__close modal__close_type_item"
        >
          <img src={closeImg} alt="close" className="modal__close-icon" />
        </button>
        <div className="modal__delete-warning-container">
          <p className="modal__delete-warning-beginning">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__delete-warning-end">
            This action is irreversible.
          </p>
        </div>
        <button
          type="button"
          onClick={onDeleteGarmentSubmit}
          className="modal__delete-confirm-button"
        >
          Yes, delete item
        </button>
        <button
          type="button"
          onClick={onCloseClick}
          className="modal__delete-cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteItemModal;
