import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  closeActiveModal,
  activeModal,
  onSubmit,
  onAlternative,
}) {
  const [data, setData] = useState({
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
    onSubmit(data);
  };

  return (
    <ModalWithForm
      buttonText="Log In"
      alternativeButtonText="or Sign Up"
      title="Log In"
      isOpen={activeModal === "login"}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      onAlternative={onAlternative}
    >
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
export default LoginModal;
