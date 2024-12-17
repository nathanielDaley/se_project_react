import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ closeActiveModal, activeModal }) {
  const [data, setData] = useState({
    username: "",
    avatar: "",
    email: "",
    password: "",
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
  };

  return (
    <ModalWithForm
      buttonText="Submit"
      title="Register"
      isOpen={activeModal === "register"}
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
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
export default RegisterModal;
