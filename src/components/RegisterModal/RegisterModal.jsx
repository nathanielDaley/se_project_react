import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  closeActiveModal,
  activeModal,
  onSubmit,
  handleCancel,
}) {
  const [data, setData] = useState({
    username: "",
    avatar: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  return (
    <ModalWithForm
      buttonText="Sign Up"
      cancelButtonText="or Log In"
      title="Sign Up"
      isOpen={activeModal === "register"}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <label htmlFor="register-username" className="modal__label">
        Username
        <input
          id="register-username"
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
      <label htmlFor="register-avatar" className="modal__label">
        Avatar
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-confirmPassword" className="modal__label">
        Confirm Password
        <input
          type="password"
          className="modal__input"
          id="register-confirmPassword"
          name="confirmPassword"
          placeholder="Password"
          value={data.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
export default RegisterModal;
