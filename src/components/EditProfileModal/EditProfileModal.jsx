import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ closeActiveModal, activeModal, onSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    username: "",
    avatar: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  useEffect(() => {
    setData({ username: currentUser.name, avatar: currentUser.avatar });
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      isOpen={activeModal === "edit-profile"}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="username" className="modal__label">
        Username
        <input
          id="username"
          name="username"
          required
          placeholder="Name"
          minLength="2"
          maxLength="30"
          type="text"
          value={data.username}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
export default EditProfileModal;
