import "./MobileModal.css";
import avatar from "../../assets/avatar-default.png";
import closeImg from "../../assets/close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

export default function MobileModal({
  handleAddGarmentClick,
  handleCloseClick,
  activeModal,
}) {
  window.addEventListener("resize", handleCloseClick);

  return (
    <div
      className={`modal${
        activeModal === "mobile" ? " modal_opened" : ""
      } modal_type_mobile`}
    >
      <div className="modal__content modal__content_type_mobile">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_type_item"
        >
          <img src={closeImg} alt="close" className="modal__close-icon" />
        </button>
        <Link to="/profile" className="header__profile-link">
          <div className="modal__user-container">
            <p className="modal__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="modal__avatar"
            />
          </div>
        </Link>
        <button
          onClick={handleAddGarmentClick}
          className="modal__add-clothes-button"
          type="button"
        >
          + Add clothes
        </button>
        <ToggleSwitch leftLabel={"F"} rightLabel={"C"} />
      </div>
    </div>
  );
}
